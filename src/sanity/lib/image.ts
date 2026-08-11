import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, isSanityConfigured, projectId } from "../env";

const builder = isSanityConfigured
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

/** Returns a CDN URL for a Sanity image, or null when unavailable. */
export function urlForImage(source: Image | undefined | null, width = 1200) {
  if (!builder || !source) return null;
  try {
    return builder.image(source).width(width).auto("format").fit("max").url();
  } catch {
    return null;
  }
}
