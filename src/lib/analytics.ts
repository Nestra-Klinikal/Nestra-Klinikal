"use client";

/**
 * Analytics events.
 *
 * Events are pushed to a dataLayer array and, when Vercel Analytics is present,
 * to its custom-event API. Nothing here throws if no analytics provider is
 * installed — the site must work with tracking absent or blocked, which is
 * common on the mobile networks this audience uses.
 */

export type AnalyticsEvent =
  | "whatsapp_click"
  | "lead_submitted"
  | "application_started"
  | "programme_viewed"
  | "form_submitted";

type EventPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    va?: (event: string, name: string, data?: EventPayload) => void;
  }
}

export function track(event: AnalyticsEvent, payload: EventPayload = {}): void {
  if (typeof window === "undefined") return;

  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event, ...payload });
    window.va?.("event", event, payload);
  } catch {
    // Analytics must never break a user flow.
  }
}

/** Reads UTM parameters from the current URL so they can be stored with a lead. */
export function readUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

  return keys.reduce<Record<string, string>>((acc, key) => {
    const value = params.get(key);
    if (value) acc[key] = value;
    return acc;
  }, {});
}
