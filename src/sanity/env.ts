/**
 * Sanity connection settings.
 *
 * The site is designed to build and render before a Sanity project exists, so a
 * missing project id is not fatal: `isSanityConfigured` is false, and the data
 * layer falls back to the seed content in `src/lib/seed-content.ts`. The moment
 * real credentials are supplied the same queries start returning live content
 * with no code change.
 */

/**
 * Environment values pasted from a dashboard often arrive wrapped in quotes or
 * padded with whitespace. Sanity's client throws on a malformed project id, and
 * because the client is created at module scope that throw would fail the whole
 * build rather than degrade. Clean the value first, then validate it.
 */
function clean(value: string | undefined): string {
  return (value ?? "").trim().replace(/^['"]|['"]$/g, "");
}

/** Sanity project ids are lowercase alphanumeric with dashes. */
const PROJECT_ID_PATTERN = /^[a-z0-9-]+$/;

export const apiVersion = clean(process.env.NEXT_PUBLIC_SANITY_API_VERSION) || "2024-10-01";

const rawProjectId = clean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);

const projectIdIsValid = rawProjectId.length > 0 && PROJECT_ID_PATTERN.test(rawProjectId);

if (rawProjectId.length > 0 && !projectIdIsValid) {
  console.warn(
    `[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is not a valid project id ` +
      `(received "${rawProjectId}"). It should contain only lowercase letters, ` +
      `numbers and dashes. Falling back to seed content.`,
  );
}

export const projectId = projectIdIsValid ? rawProjectId : "";

export const dataset = clean(process.env.NEXT_PUBLIC_SANITY_DATASET) || "production";

/** True only when a usable Sanity project id has been supplied. */
export const isSanityConfigured = projectId.length > 0;
