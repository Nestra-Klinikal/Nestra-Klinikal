import * as React from "react";

import { cn } from "@/lib/utils";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  tone?: "default" | "surface" | "deep";
};

/**
 * Vertical rhythm lives here rather than on individual elements, so sibling
 * sections cannot collapse or double their spacing against each other.
 */
export function Section({ tone = "default", className, children, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "py-16 sm:py-20 lg:py-28",
        tone === "surface" && "bg-surface",
        tone === "deep" && "bg-brand text-brand-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

type SectionHeadProps = {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  tone?: "default" | "inverted";
  className?: string;
};

export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "default",
  className,
}: SectionHeadProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "text-eyebrow font-bold uppercase",
            tone === "inverted" ? "text-accent" : "text-signal",
          )}
        >
          {eyebrow}
        </p>
      ) : null}

      <h2
        className={cn(
          "text-display-md",
          tone === "inverted" ? "text-brand-foreground" : "text-foreground",
        )}
      >
        {title}
      </h2>

      {lede ? (
        <p
          className={cn(
            "max-w-[58ch] text-[1.0625rem] leading-relaxed",
            align === "center" && "mx-auto",
            tone === "inverted" ? "text-brand-foreground/75" : "text-muted-foreground",
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
