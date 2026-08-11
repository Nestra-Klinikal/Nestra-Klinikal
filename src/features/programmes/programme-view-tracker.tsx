"use client";

import { useEffect } from "react";

import { track } from "@/lib/analytics";

/** Fires the programme view event once per mount. */
export function ProgrammeViewTracker({
  title,
  category,
}: {
  title: string;
  category?: string;
}) {
  useEffect(() => {
    track("programme_viewed", { programme: title, category });
  }, [title, category]);

  return null;
}
