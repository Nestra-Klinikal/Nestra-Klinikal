/**
 * Sanity connection settings.
 *
 * The site is designed to build and render before a Sanity project exists, so a
 * missing project id is not fatal: `isSanityConfigured` is false, and the data
 * layer falls back to the seed content in `src/lib/seed-content.ts`. The moment
 * real credentials are supplied the same queries start returning live content
 * with no code change.
 */
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

/** True only when a real Sanity project id has been supplied. */
export const isSanityConfigured = projectId.trim().length > 0;
