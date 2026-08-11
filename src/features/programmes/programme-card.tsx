import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MonitorSmartphone } from "lucide-react";

import { categoryLabel, cn, deliveryModeLabel, formatNaira, levelLabel } from "@/lib/utils";
import type { Programme } from "@/types/content";

export function ProgrammeCard({
  programme,
  className,
}: {
  programme: Programme;
  className?: string;
}) {
  const fee = formatNaira(programme.feeNaira);
  const mode = deliveryModeLabel(programme.deliveryMode);
  const level = levelLabel(programme.level);

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all",
        "hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-primary/5",
        className,
      )}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
        {programme.imageUrl ? (
          <Image
            src={programme.imageUrl}
            alt={programme.imageAlt ?? ""}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            aria-hidden="true"
            className="size-full bg-[radial-gradient(circle_at_30%_20%,hsl(var(--accent)/0.28),transparent_60%),linear-gradient(135deg,hsl(var(--primary)),hsl(var(--primary)/0.75))]"
          />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-wider text-foreground backdrop-blur">
          {categoryLabel(programme.category)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        {level ? (
          <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-signal">{level}</p>
        ) : null}

        <h3 className="text-lg font-bold leading-snug">
          <Link href={`/programmes/${programme.slug}`} className="after:absolute after:inset-0">
            {programme.title}
          </Link>
        </h3>

        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {programme.summary}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-3 text-xs text-muted-foreground">
          {programme.duration && !programme.duration.startsWith("PLACEHOLDER") ? (
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" aria-hidden="true" />
              {programme.duration}
            </span>
          ) : null}
          {mode ? (
            <span className="flex items-center gap-1.5">
              <MonitorSmartphone className="size-3.5" aria-hidden="true" />
              {mode}
            </span>
          ) : null}
        </div>

        <div className="flex items-center justify-between border-t border-border pt-3">
          <span className="text-sm font-semibold tabular">
            {fee ?? <span className="text-muted-foreground">Fee on request</span>}
          </span>
          <span className="flex items-center gap-1 text-sm font-semibold text-accent">
            Details
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </article>
  );
}
