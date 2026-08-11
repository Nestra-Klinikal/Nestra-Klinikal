import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { AlertTriangle, BadgeCheck, CalendarDays, Clock, MonitorSmartphone, Target } from "lucide-react";

import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/shared/section";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { ProgrammeEnquiryForm } from "@/features/programmes/programme-enquiry-form";
import { ProgrammeViewTracker } from "@/features/programmes/programme-view-tracker";
import {
  getIntakesForProgramme,
  getProgrammeBySlug,
  getProgrammeSlugs,
  getSettings,
} from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import {
  categoryLabel,
  deliveryModeLabel,
  formatDate,
  formatNaira,
  formatUsd,
  levelLabel,
} from "@/lib/utils";
import { programmeEnquiryMessage } from "@/lib/whatsapp";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getProgrammeSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const programme = await getProgrammeBySlug(slug);

  if (!programme) return { title: "Programme not found" };

  const title = programme.seoTitle ?? programme.title;
  const description = programme.seoDescription ?? programme.summary;

  return {
    title,
    description,
    alternates: { canonical: `/programmes/${programme.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/programmes/${programme.slug}`,
      type: "article",
      images: programme.imageUrl ? [{ url: programme.imageUrl }] : undefined,
    },
  };
}

/** A placeholder value should never reach a visitor as if it were a real fact. */
function isPlaceholder(value?: string | null): boolean {
  return Boolean(value?.startsWith("PLACEHOLDER"));
}

export default async function ProgrammeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [programme, settings] = await Promise.all([getProgrammeBySlug(slug), getSettings()]);

  if (!programme) notFound();

  const intakes = await getIntakesForProgramme(slug);

  const naira = formatNaira(programme.feeNaira);
  const usd = formatUsd(programme.feeUsd);
  const mode = deliveryModeLabel(programme.deliveryMode);
  const level = levelLabel(programme.level);
  const duration = isPlaceholder(programme.duration) ? null : programme.duration;

  // Course structured data. Only fields we can state truthfully are included.
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: programme.title,
    description: programme.summary,
    url: `${SITE_URL}/programmes/${programme.slug}`,
    provider: {
      "@type": "Organization",
      name: "Nestra Klinikal",
      url: SITE_URL,
    },
    ...(programme.imageUrl ? { image: programme.imageUrl } : {}),
    ...(intakes.length > 0
      ? {
          hasCourseInstance: intakes.map((intake) => ({
            "@type": "CourseInstance",
            courseMode:
              intake.mode === "in-person"
                ? "Onsite"
                : intake.mode === "blended"
                  ? "Blended"
                  : "Online",
            startDate: intake.startDate,
            ...(intake.location ? { location: intake.location } : {}),
          })),
        }
      : {}),
    ...(typeof programme.feeNaira === "number"
      ? {
          offers: {
            "@type": "Offer",
            price: programme.feeNaira,
            priceCurrency: "NGN",
            category: "Paid",
            url: `${SITE_URL}/programmes/${programme.slug}`,
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <ProgrammeViewTracker title={programme.title} category={programme.category} />

      <PageHero
        breadcrumb={[
          { href: "/", label: "Home" },
          { href: "/programmes", label: "Programmes" },
          { label: programme.title },
        ]}
        eyebrow={categoryLabel(programme.category)}
        title={programme.title}
        lede={programme.summary}
      />

      <Section className="py-12 lg:py-16">
        <div className="container grid gap-12 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-12">
            {programme.imageUrl ? (
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border">
                <Image
                  src={programme.imageUrl}
                  alt={programme.imageAlt ?? ""}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
            ) : null}

            {/* Facts at a glance */}
            <dl className="grid gap-4 sm:grid-cols-2">
              {level ? <Fact icon={Target} label="Level" value={level} /> : null}
              {duration ? <Fact icon={Clock} label="Duration" value={duration} /> : null}
              {mode ? <Fact icon={MonitorSmartphone} label="Delivery" value={mode} /> : null}
              {programme.certification ? (
                <Fact icon={BadgeCheck} label="Certification" value={programme.certification} />
              ) : null}
            </dl>

            {programme.requiresSupervisedHours ? (
              <div className="flex items-start gap-3 rounded-lg border border-signal/30 bg-signal/5 p-4">
                <AlertTriangle className="mt-0.5 size-5 shrink-0 text-signal" aria-hidden="true" />
                <p className="text-sm leading-relaxed">
                  <strong className="font-semibold">Supervised practical hours are mandatory.</strong>{" "}
                  Certification for this programme is awarded only after you have completed the
                  required supervised practical hours in person.
                </p>
              </div>
            ) : null}

            {programme.whoItIsFor?.length ? (
              <div>
                <h2 className="text-display-sm">Who this is for</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {programme.whoItIsFor.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 rounded-lg border border-border bg-card p-3.5 text-sm"
                    >
                      <BadgeCheck className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {programme.outcomes?.length ? (
              <div>
                <h2 className="text-display-sm">What you will be able to do</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {programme.outcomes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-relaxed">
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {programme.curriculum?.length ? (
              <div>
                <h2 className="text-display-sm">Curriculum</h2>
                <ol className="mt-5 flex flex-col gap-3">
                  {programme.curriculum.map((module, index) => (
                    <li
                      key={module.title}
                      className="flex gap-4 rounded-lg border border-border bg-card p-5"
                    >
                      <span className="shrink-0 font-display text-sm font-extrabold tabular text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-semibold">{module.title}</p>
                        {module.description ? (
                          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                            {module.description}
                          </p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            {programme.entryRequirements?.length ? (
              <div>
                <h2 className="text-display-sm">Entry requirements</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {programme.entryRequirements.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-relaxed">
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-muted-foreground"
                      />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {programme.body?.length ? (
              <div className="prose-nk">
                <PortableText value={programme.body} />
              </div>
            ) : null}
          </div>

          {/* Conversion column */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-eyebrow font-bold uppercase text-muted-foreground">Fees</p>

              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm text-muted-foreground">Nigeria</span>
                  <span className="text-xl font-bold tabular">
                    {naira ?? <span className="text-base font-medium text-muted-foreground">On request</span>}
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm text-muted-foreground">International</span>
                  <span className="text-xl font-bold tabular">
                    {usd ?? <span className="text-base font-medium text-muted-foreground">On request</span>}
                  </span>
                </div>
              </div>

              {programme.feeNote ? (
                <p className="mt-3 text-xs text-muted-foreground">{programme.feeNote}</p>
              ) : null}

              {!naira && !usd ? (
                <p className="mt-3 text-xs text-muted-foreground">
                  Message us and we will send current pricing for your location.
                </p>
              ) : null}

              <WhatsAppButton
                className="mt-5 w-full"
                number={settings.whatsappNumber}
                message={programmeEnquiryMessage(programme.title)}
                context={`programme:${programme.slug}`}
                label="Ask about this programme"
              />
            </div>

            {intakes.length > 0 ? (
              <div className="rounded-xl border border-border bg-card p-6">
                <p className="text-eyebrow font-bold uppercase text-muted-foreground">
                  Upcoming intakes
                </p>
                <ul className="mt-4 flex flex-col gap-4">
                  {intakes.map((intake) => (
                    <li key={intake._id} className="flex items-start gap-3">
                      <CalendarDays className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-semibold">{formatDate(intake.startDate)}</p>
                        {intake.applicationDeadline ? (
                          <p className="text-xs text-muted-foreground">
                            Apply by {formatDate(intake.applicationDeadline)}
                          </p>
                        ) : null}
                        {intake.seatsNote ? (
                          <p className="text-xs text-signal">{intake.seatsNote}</p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <ProgrammeEnquiryForm
              programmeId={programme._id}
              programmeTitle={programme.title}
              whatsappNumber={settings.whatsappNumber}
            />
          </aside>
        </div>
      </Section>
    </>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  // dt and dd must be direct children of a single wrapper inside the dl, so the
  // icon is positioned by the grid rather than by an extra nesting div.
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-3 rounded-lg border border-border bg-card p-4">
      <Icon className="row-span-2 mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold">{value}</dd>
    </div>
  );
}
