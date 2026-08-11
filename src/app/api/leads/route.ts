import { NextResponse } from "next/server";

import { getWriteClient } from "@/sanity/lib/client";
import { syncLeadToEmailPlatform } from "@/lib/email-sync";
import { CONSENT_TEXT, leadSubmissionSchema } from "@/lib/validations/lead";

export const runtime = "nodejs";

/**
 * Lead capture.
 *
 * Deduplicates on email so a returning visitor updates their existing record
 * rather than creating a second one. Responds with success even when Sanity is
 * not yet configured, but says so in `stored` so the caller can tell the
 * difference between a captured lead and a discarded one.
 */
export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "We could not read that request. Please try again." },
      { status: 400 },
    );
  }

  const parsed = leadSubmissionSchema.safeParse(payload);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      {
        ok: false,
        error: firstIssue?.message ?? "Please check the details you entered.",
        field: firstIssue?.path?.[0],
      },
      { status: 400 },
    );
  }

  const lead = parsed.data;

  // Honeypot: a filled hidden field means a bot. Return success so the bot
  // learns nothing, but store nothing.
  if (lead.company_website) {
    return NextResponse.json({ ok: true, stored: false });
  }

  const client = getWriteClient();

  if (!client) {
    console.warn(
      "[leads] Sanity write client unavailable — lead not stored. " +
        "Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN.",
      { email: lead.email, leadType: lead.leadType },
    );
    return NextResponse.json({ ok: true, stored: false });
  }

  const now = new Date().toISOString();

  try {
    const existingId = await client.fetch<string | null>(
      `*[_type == "lead" && email == $email][0]._id`,
      { email: lead.email },
    );

    const doc = {
      _type: "lead" as const,
      email: lead.email,
      name: lead.name,
      phone: lead.phone,
      organisation: lead.organisation,
      organisationSize: lead.organisationSize,
      message: lead.message,
      leadType: lead.leadType,
      sourcePage: lead.sourcePage,
      consentGiven: lead.consentGiven,
      consentText: lead.consentGiven ? CONSENT_TEXT : undefined,
      consentTimestamp: lead.consentGiven ? now : undefined,
      utmSource: lead.utm?.utm_source,
      utmMedium: lead.utm?.utm_medium,
      utmCampaign: lead.utm?.utm_campaign,
      utmTerm: lead.utm?.utm_term,
      utmContent: lead.utm?.utm_content,
      createdAt: now,
      ...(lead.programmeId
        ? {
            programmeOfInterest: {
              _type: "reference" as const,
              _ref: lead.programmeId,
            },
          }
        : {}),
    };

    // Strip undefined so an update never blanks a field it has no value for.
    const clean = Object.fromEntries(
      Object.entries(doc).filter(([, value]) => value !== undefined),
    );

    if (existingId) {
      await client.patch(existingId).set(clean).commit();
    } else {
      await client.create(clean as typeof doc);
    }

    const sync = await syncLeadToEmailPlatform(lead);
    if (sync.synced && existingId) {
      await client.patch(existingId).set({ syncedToEmailPlatform: true }).commit();
    }

    return NextResponse.json({ ok: true, stored: true });
  } catch (error) {
    console.error("[leads] Failed to store lead:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "We could not save your details just now. Please try again, or message us on WhatsApp.",
      },
      { status: 500 },
    );
  }
}
