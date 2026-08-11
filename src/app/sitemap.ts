import type { MetadataRoute } from "next";

import { getPostSlugs, getProgrammeSlugs } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

const STATIC_ROUTES = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/programmes", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/corporate", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/partnerships", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/resources", priority: 0.6, changeFrequency: "weekly" as const },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/refund-policy", priority: 0.2, changeFrequency: "yearly" as const },
];

/** Programme and article pages enter the sitemap automatically on publish. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [programmeSlugs, postSlugs] = await Promise.all([getProgrammeSlugs(), getPostSlugs()]);
  const now = new Date();

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: `${SITE_URL}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...programmeSlugs.map((slug) => ({
      url: `${SITE_URL}/programmes/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...postSlugs.map((slug) => ({
      url: `${SITE_URL}/resources/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
