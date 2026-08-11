import "server-only";

import { sanityClient } from "@/sanity/lib/client";
import {
  FAQS_QUERY,
  INTAKES_FOR_PROGRAMME_QUERY,
  INTAKES_QUERY,
  PARTNERS_QUERY,
  POSTS_QUERY,
  POST_BY_SLUG_QUERY,
  POST_SLUGS_QUERY,
  PROGRAMMES_QUERY,
  PROGRAMME_BY_SLUG_QUERY,
  PROGRAMME_SLUGS_QUERY,
  SETTINGS_QUERY,
  TEAM_QUERY,
  TESTIMONIALS_QUERY,
} from "@/sanity/lib/queries";
import {
  SEED_FAQS,
  SEED_INTAKES,
  SEED_PARTNERS,
  SEED_POSTS,
  SEED_PROGRAMMES,
  SEED_SETTINGS,
  SEED_TEAM,
  SEED_TESTIMONIALS,
} from "@/lib/seed-content";
import type {
  Faq,
  Intake,
  Partner,
  Post,
  Programme,
  SiteSettings,
  TeamMember,
  Testimonial,
} from "@/types/content";

/** Revalidate content hourly; Studio publishes take effect without a redeploy. */
export const CONTENT_REVALIDATE_SECONDS = 3600;

/**
 * Runs a GROQ query, falling back to seed content when Sanity is not configured
 * or the request fails. The site must never fail to render because the CMS is
 * unreachable — a marketing site that 500s costs enquiries.
 */
async function fetchOrSeed<T>(
  query: string,
  params: Record<string, unknown>,
  seed: T,
  { isEmpty }: { isEmpty?: (value: T) => boolean } = {},
): Promise<T> {
  if (!sanityClient) return seed;

  try {
    const result = await sanityClient.fetch<T>(query, params, {
      next: { revalidate: CONTENT_REVALIDATE_SECONDS },
    });

    if (result === null || result === undefined) return seed;
    if (isEmpty?.(result)) return seed;

    return result;
  } catch (error) {
    console.error(`[content] Sanity query failed, using seed content:`, error);
    return seed;
  }
}

const emptyArray = (value: unknown[]) => value.length === 0;

export function getProgrammes(): Promise<Programme[]> {
  return fetchOrSeed(PROGRAMMES_QUERY, {}, SEED_PROGRAMMES, { isEmpty: emptyArray });
}

export async function getProgrammeBySlug(slug: string): Promise<Programme | null> {
  const seed = SEED_PROGRAMMES.find((p) => p.slug === slug) ?? null;
  return fetchOrSeed<Programme | null>(PROGRAMME_BY_SLUG_QUERY, { slug }, seed);
}

export async function getProgrammeSlugs(): Promise<string[]> {
  return fetchOrSeed(
    PROGRAMME_SLUGS_QUERY,
    {},
    SEED_PROGRAMMES.map((p) => p.slug),
    { isEmpty: emptyArray },
  );
}

export function getIntakes(): Promise<Intake[]> {
  // An empty intake list is a real state, not a failure, so it is not replaced.
  return fetchOrSeed(INTAKES_QUERY, {}, SEED_INTAKES);
}

export function getIntakesForProgramme(slug: string): Promise<Intake[]> {
  return fetchOrSeed(INTAKES_FOR_PROGRAMME_QUERY, { slug }, []);
}

export function getTestimonials(): Promise<Testimonial[]> {
  return fetchOrSeed(TESTIMONIALS_QUERY, {}, SEED_TESTIMONIALS, { isEmpty: emptyArray });
}

export function getTeam(): Promise<TeamMember[]> {
  return fetchOrSeed(TEAM_QUERY, {}, SEED_TEAM);
}

export function getPartners(): Promise<Partner[]> {
  return fetchOrSeed(PARTNERS_QUERY, {}, SEED_PARTNERS, { isEmpty: emptyArray });
}

export function getFaqs(): Promise<Faq[]> {
  return fetchOrSeed(FAQS_QUERY, {}, SEED_FAQS, { isEmpty: emptyArray });
}

export function getPosts(): Promise<Post[]> {
  return fetchOrSeed(POSTS_QUERY, {}, SEED_POSTS);
}

export function getPostBySlug(slug: string): Promise<Post | null> {
  return fetchOrSeed<Post | null>(POST_BY_SLUG_QUERY, { slug }, null);
}

export function getPostSlugs(): Promise<string[]> {
  return fetchOrSeed(POST_SLUGS_QUERY, {}, []);
}

export async function getSettings(): Promise<SiteSettings> {
  const settings = await fetchOrSeed<SiteSettings | null>(SETTINGS_QUERY, {}, null);
  if (!settings?.whatsappNumber) return SEED_SETTINGS;
  return { ...SEED_SETTINGS, ...settings };
}
