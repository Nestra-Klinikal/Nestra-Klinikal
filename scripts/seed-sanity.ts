/**
 * Populates a freshly created Sanity dataset with the site's starting content.
 *
 * Run once after creating your Sanity project:
 *
 *   npm run seed
 *
 * It is safe to run more than once. Every document is written with a fixed id
 * using createOrReplace, so a second run overwrites the same documents rather
 * than creating duplicates.
 *
 * WARNING: because it overwrites, running this again AFTER you have edited
 * content in Studio will discard those edits for the seeded documents. It will
 * ask before doing that unless you pass --force.
 */
import { createClient } from "@sanity/client";

import {
  SEED_FAQS,
  SEED_PARTNERS,
  SEED_PROGRAMMES,
  SEED_SETTINGS,
  SEED_TESTIMONIALS,
} from "../src/lib/seed-content";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim().replace(/^['"]|['"]$/g, "");
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
const token = process.env.SANITY_API_WRITE_TOKEN?.trim().replace(/^['"]|['"]$/g, "");
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2024-10-01";

const force = process.argv.includes("--force");
/** Builds and validates the documents without connecting to Sanity. */
const dryRun = process.argv.includes("--dry-run");

function fail(message: string): never {
  console.error(`\n✗ ${message}\n`);
  process.exit(1);
}

if (!projectId && !dryRun) {
  fail(
    "NEXT_PUBLIC_SANITY_PROJECT_ID is not set.\n" +
      "  Create a project at sanity.io/manage, then put the project id in .env.local.\n" +
      "  See ADMIN-GUIDE.md section 1 for step-by-step instructions.",
  );
}

if (!token && !dryRun) {
  fail(
    "SANITY_API_WRITE_TOKEN is not set.\n" +
      "  In sanity.io/manage open your project, go to API → Tokens, and create a\n" +
      "  token with Editor permission. Put it in .env.local as SANITY_API_WRITE_TOKEN.",
  );
}

const client = dryRun
  ? null
  : createClient({ projectId, dataset, token, apiVersion, useCdn: false });

/** Sanity requires a stable _key on every object inside an array. */
function keyed<T extends Record<string, unknown>>(items: T[], prefix: string) {
  return items.map((item, index) => ({ ...item, _key: `${prefix}-${index}` }));
}

/** Strips undefined so we never write empty keys into the dataset. */
function clean<T extends Record<string, unknown>>(doc: T): T {
  return Object.fromEntries(Object.entries(doc).filter(([, v]) => v !== undefined)) as T;
}

function buildDocuments() {
  const programmes = SEED_PROGRAMMES.map((p) =>
    clean({
      _id: `programme.${p.slug}`,
      _type: "programme",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      category: p.category,
      level: p.level,
      summary: p.summary,
      whoItIsFor: p.whoItIsFor,
      outcomes: p.outcomes,
      curriculum: p.curriculum
        ? keyed(
            p.curriculum.map((m) => ({ _type: "module", title: m.title, description: m.description })),
            `${p.slug}-module`,
          )
        : undefined,
      duration: p.duration,
      deliveryMode: p.deliveryMode,
      entryRequirements: p.entryRequirements,
      certification: p.certification,
      requiresSupervisedHours: p.requiresSupervisedHours ?? false,
      feeNaira: p.feeNaira ?? undefined,
      feeUsd: p.feeUsd ?? undefined,
      feeNote: p.feeNote,
      featured: p.featured ?? false,
      order: p.order ?? 100,
    }),
  );

  const testimonials = SEED_TESTIMONIALS.map((t, index) =>
    clean({
      _id: `testimonial.${t._id.replace(/^seed-testimonial-/, "")}`,
      _type: "testimonial",
      name: t.name,
      role: t.role,
      cohort: t.cohort,
      quote: t.quote,
      featured: t.featured ?? false,
      // These two quotes are reproduced from the existing public site, so
      // permission is assumed to be on file. Verify before relying on it.
      consentOnFile: false,
      order: (index + 1) * 10,
    }),
  );

  const partners = SEED_PARTNERS.map((p, index) =>
    clean({
      _id: `partner.${p._id.replace(/^seed-partner-/, "")}`,
      _type: "partner",
      name: p.name,
      kind: p.kind,
      location: p.location,
      description: p.description,
      order: (index + 1) * 10,
    }),
  );

  const faqs = SEED_FAQS.map((f, index) =>
    clean({
      _id: `faq.${f._id.replace(/^seed-faq-/, "")}`,
      _type: "faq",
      question: f.question,
      answer: f.answer,
      topic: f.topic,
      order: (index + 1) * 10,
    }),
  );

  const settings = clean({
    _id: "siteSettings",
    _type: "siteSettings",
    whatsappNumber: SEED_SETTINGS.whatsappNumber,
    phoneDisplay: SEED_SETTINGS.phoneDisplay,
    email: SEED_SETTINGS.email,
    address: SEED_SETTINGS.address,
    announcementEnabled: false,
    legalName: SEED_SETTINGS.legalName,
    rcNumber: SEED_SETTINGS.rcNumber,
    completionsCount: SEED_SETTINGS.completionsCount ?? undefined,
  });

  return [...programmes, ...testimonials, ...partners, ...faqs, settings];
}

async function main() {
  const documents = buildDocuments();

  console.log(`\nSeeding Sanity project ${projectId ?? "(dry run)"}, dataset "${dataset}"`);
  console.log(
    `  ${SEED_PROGRAMMES.length} programmes, ${SEED_TESTIMONIALS.length} testimonials, ` +
      `${SEED_PARTNERS.length} partners, ${SEED_FAQS.length} FAQs, 1 site settings\n`,
  );

  if (dryRun) {
    // Catch the mistakes that only surface at write time: duplicate ids, missing
    // array keys, and documents with no type.
    const ids = documents.map((d) => d._id);
    const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
    if (duplicates.length) fail(`Duplicate document ids: ${duplicates.join(", ")}`);

    for (const doc of documents) {
      if (!doc._type) fail(`Document ${doc._id} has no _type`);
      for (const [field, value] of Object.entries(doc)) {
        if (!Array.isArray(value)) continue;
        const objects = value.filter((v) => v && typeof v === "object");
        const missing = objects.filter((v) => !(v as { _key?: string })._key);
        if (missing.length) {
          fail(`${doc._id}: ${missing.length} item(s) in "${field}" are missing a _key`);
        }
      }
    }

    for (const doc of documents) console.log(`  ${doc._type.padEnd(13)} ${doc._id}`);
    console.log(`\n✓ Dry run passed: ${documents.length} documents are well-formed.\n`);
    return;
  }

  if (!client) fail("No Sanity client available.");

  if (!force) {
    const existing = await client.fetch<number>(
      `count(*[_type in ["programme","testimonial","partner","faq","siteSettings"]])`,
    );

    if (existing > 0) {
      fail(
        `This dataset already contains ${existing} document(s).\n` +
          "  Running the seeder would overwrite them and discard any edits made in Studio.\n" +
          "  If that is what you want, run: npm run seed -- --force",
      );
    }
  }

  const transaction = documents.reduce(
    (tx, doc) => tx.createOrReplace(doc as never),
    client.transaction(),
  );

  await transaction.commit();

  console.log(`✓ Wrote ${documents.length} documents.\n`);
  console.log("Open /studio on your site to review and publish them.");
  console.log("Then work through PLACEHOLDERS.md — fees, durations and intake dates.\n");
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);

  if (message.includes("Unauthorized") || message.includes("401")) {
    fail(
      "Sanity rejected the token.\n" +
        "  Check SANITY_API_WRITE_TOKEN is correct and has Editor permission.",
    );
  }

  fail(`Seeding failed: ${message}`);
});
