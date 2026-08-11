import "server-only";

import type { LeadSubmission } from "@/lib/validations/lead";

/**
 * Optional mirror of the lead list to an external email platform.
 *
 * The list of record lives in Sanity. This is a mirror, enabled by setting
 * EMAIL_SYNC_PROVIDER and the matching credentials, so a mail tool can be added
 * later without a rebuild. When no provider is set this is a no-op and lead
 * capture still succeeds.
 */

export type EmailSyncResult = { synced: boolean; reason?: string };

type Provider = "mailchimp" | "brevo" | "convertkit";

function getProvider(): Provider | null {
  const value = process.env.EMAIL_SYNC_PROVIDER?.trim().toLowerCase();
  if (value === "mailchimp" || value === "brevo" || value === "convertkit") return value;
  return null;
}

export async function syncLeadToEmailPlatform(lead: LeadSubmission): Promise<EmailSyncResult> {
  const provider = getProvider();
  if (!provider) return { synced: false, reason: "No email platform configured" };

  // Never mirror an address to a marketing tool without recorded consent.
  if (!lead.consentGiven) {
    return { synced: false, reason: "No marketing consent given" };
  }

  try {
    switch (provider) {
      case "mailchimp":
        return await syncToMailchimp(lead);
      case "brevo":
        return await syncToBrevo(lead);
      case "convertkit":
        return await syncToConvertKit(lead);
    }
  } catch (error) {
    console.error("[email-sync] Sync failed:", error);
    return {
      synced: false,
      reason: error instanceof Error ? error.message : "Unknown sync error",
    };
  }
}

function splitName(name?: string): { first: string; last: string } {
  if (!name) return { first: "", last: "" };
  const parts = name.trim().split(/\s+/);
  return { first: parts[0] ?? "", last: parts.slice(1).join(" ") };
}

async function syncToMailchimp(lead: LeadSubmission): Promise<EmailSyncResult> {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  if (!apiKey || !audienceId) {
    return { synced: false, reason: "Mailchimp credentials missing" };
  }

  // Mailchimp encodes the data centre after a dash in the API key.
  const dc = apiKey.split("-")[1];
  if (!dc) return { synced: false, reason: "Mailchimp API key is malformed" };

  const { first, last } = splitName(lead.name);
  const response = await fetch(
    `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: lead.email,
        status: "subscribed",
        merge_fields: { FNAME: first, LNAME: last },
        tags: [lead.leadType],
      }),
    },
  );

  // 400 with "Member Exists" is a success for our purposes.
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { title?: string } | null;
    if (body?.title === "Member Exists") return { synced: true };
    return { synced: false, reason: body?.title ?? `HTTP ${response.status}` };
  }

  return { synced: true };
}

async function syncToBrevo(lead: LeadSubmission): Promise<EmailSyncResult> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return { synced: false, reason: "Brevo API key missing" };

  const listId = process.env.BREVO_LIST_ID;
  const { first, last } = splitName(lead.name);

  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: { "api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({
      email: lead.email,
      attributes: { FIRSTNAME: first, LASTNAME: last },
      listIds: listId ? [Number(listId)] : undefined,
      updateEnabled: true,
    }),
  });

  if (!response.ok) return { synced: false, reason: `HTTP ${response.status}` };
  return { synced: true };
}

async function syncToConvertKit(lead: LeadSubmission): Promise<EmailSyncResult> {
  const apiKey = process.env.CONVERTKIT_API_KEY;
  const formId = process.env.CONVERTKIT_FORM_ID;
  if (!apiKey || !formId) {
    return { synced: false, reason: "ConvertKit credentials missing" };
  }

  const response = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: apiKey,
      email: lead.email,
      first_name: splitName(lead.name).first || undefined,
    }),
  });

  if (!response.ok) return { synced: false, reason: `HTTP ${response.status}` };
  return { synced: true };
}
