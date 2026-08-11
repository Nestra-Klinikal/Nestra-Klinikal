import { cn } from "@/lib/utils";

/**
 * The NK monogram, drawn as inline SVG so it is crisp at any size, needs no
 * network request, and inherits the current theme.
 *
 * It is decorative: the accessible name of the link it sits in comes from the
 * wordmark text beside it, so the mark itself is hidden from assistive
 * technology to avoid announcing the company name twice.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false" className={cn("size-10", className)}>
      <rect width="120" height="120" rx="24" className="fill-brand" />
      <path d="M28 32v56h12V54l26 34h14V32H68v34L42 32Z" className="fill-signal" />
      <rect x="88" y="32" width="9" height="56" rx="2" className="fill-accent" />
      <path d="M97 60 113 32h-13L88 57l13 31h13Z" className="fill-accent" />
    </svg>
  );
}

/**
 * The company name. The tagline is hidden on small screens, but the name itself
 * is always present in the accessibility tree so the logo link always has a
 * name that matches what a sighted user reads.
 */
export function Wordmark({
  className,
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "inverted";
}) {
  return (
    <span className={cn("flex flex-col leading-none", className)}>
      <span
        className={cn(
          "font-display text-[0.9375rem] font-extrabold tracking-tight",
          tone === "inverted" ? "text-brand-foreground" : "text-foreground",
        )}
      >
        NESTRA KLINIKAL
      </span>
      <span
        className={cn(
          "mt-0.5 hidden text-[0.625rem] font-medium uppercase tracking-[0.14em] sm:block",
          tone === "inverted" ? "text-brand-foreground/60" : "text-muted-foreground",
        )}
      >
        Clinical Research &amp; QMS
      </span>
    </span>
  );
}
