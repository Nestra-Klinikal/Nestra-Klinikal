import type { Metadata, Viewport } from "next";
import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";

/** Studio is a private admin surface and must never appear in search results. */
export const metadata: Metadata = {
  title: "Content Studio",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <div className="container flex min-h-dvh flex-col items-center justify-center py-20 text-center">
        <h1 className="text-display-md">Content Studio is not connected yet</h1>
        <p className="mt-4 max-w-[52ch] text-muted-foreground">
          To switch the Studio on, create a free project at sanity.io, then set{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-sm">
            NEXT_PUBLIC_SANITY_PROJECT_ID
          </code>{" "}
          and{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-sm">
            SANITY_API_WRITE_TOKEN
          </code>{" "}
          in your environment settings. Step-by-step instructions are in ADMIN-GUIDE.md.
        </p>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
