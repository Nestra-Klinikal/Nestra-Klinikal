import Image from "next/image";
import { Quote } from "lucide-react";

import type { Testimonial } from "@/types/content";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6 sm:p-7">
      <Quote className="size-7 shrink-0 text-accent/30" aria-hidden="true" />

      <blockquote className="text-[0.9375rem] leading-relaxed text-muted-foreground">
        {testimonial.quote}
      </blockquote>

      <figcaption className="mt-auto flex items-center gap-3 border-t border-border pt-5">
        {testimonial.imageUrl ? (
          <Image
            src={testimonial.imageUrl}
            alt=""
            width={44}
            height={44}
            className="size-11 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand font-display text-sm font-bold text-brand-foreground"
          >
            {initials(testimonial.name)}
          </span>
        )}
        <div>
          <p className="font-semibold">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">
            {[testimonial.role, testimonial.cohort].filter(Boolean).join(" · ")}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
