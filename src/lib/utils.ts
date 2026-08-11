import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NAIRA = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/** Formats a fee, or returns null when no figure has been confirmed. */
export function formatNaira(amount?: number | null): string | null {
  if (typeof amount !== "number" || Number.isNaN(amount)) return null;
  return NAIRA.format(amount);
}

export function formatUsd(amount?: number | null): string | null {
  if (typeof amount !== "number" || Number.isNaN(amount)) return null;
  return USD.format(amount);
}

export function formatDate(value?: string | null): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const DELIVERY_MODE_LABELS: Record<string, string> = {
  "online-live": "Online (live)",
  "online-self": "Online (self-paced)",
  "in-person": "In person",
  blended: "Blended (online + in person)",
};

export function deliveryModeLabel(mode?: string | null): string | null {
  if (!mode) return null;
  return DELIVERY_MODE_LABELS[mode] ?? mode;
}

const CATEGORY_LABELS: Record<string, string> = {
  qms: "Quality Management Systems",
  "clinical-research": "Clinical Research",
  laboratory: "Laboratory Quality",
  specialist: "Specialist / Practical",
  corporate: "Corporate & Consulting",
};

export function categoryLabel(category?: string | null): string {
  if (!category) return "Programme";
  return CATEGORY_LABELS[category] ?? category;
}

export const PROGRAMME_CATEGORIES = Object.entries(CATEGORY_LABELS).map(([value, label]) => ({
  value,
  label,
}));

const LEVEL_LABELS: Record<string, string> = {
  foundation: "Foundation",
  core: "Core",
  advanced: "Advanced / Diploma",
  specialist: "Specialist",
};

export function levelLabel(level?: string | null): string | null {
  if (!level) return null;
  return LEVEL_LABELS[level] ?? level;
}

export const PROGRAMME_LEVELS = Object.entries(LEVEL_LABELS).map(([value, label]) => ({
  value,
  label,
}));
