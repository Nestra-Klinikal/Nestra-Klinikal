import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { href?: string; label: string };

export function PageHero({
  breadcrumb,
  eyebrow,
  title,
  lede,
}: {
  breadcrumb?: Crumb[];
  eyebrow?: string;
  title: string;
  lede?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-brand text-brand-foreground">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--accent)/0.25),transparent_55%)]"
      />
      <div className="container relative py-14 lg:py-20">
        {breadcrumb ? (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-brand-foreground/60">
              {breadcrumb.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-1">
                  {index > 0 ? (
                    <ChevronRight className="size-3.5 shrink-0" aria-hidden="true" />
                  ) : null}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-brand-foreground"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        {eyebrow ? (
          <p className="text-eyebrow font-bold uppercase text-accent">{eyebrow}</p>
        ) : null}

        <h1 className="mt-3 max-w-[20ch] text-display-lg">{title}</h1>

        {lede ? (
          <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-brand-foreground/75">
            {lede}
          </p>
        ) : null}
      </div>
    </section>
  );
}
