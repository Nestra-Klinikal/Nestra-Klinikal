import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ClipboardCheck,
  FlaskConical,
  Microscope,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Section, SectionHead } from "@/components/shared/section";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { Button } from "@/components/ui/button";
import { LeadMagnet } from "@/features/leads/lead-magnet";
import { NewsletterForm } from "@/features/leads/newsletter-form";
import { ProgrammeCard } from "@/features/programmes/programme-card";
import { getFaqs, getIntakes, getPartners, getProgrammes, getSettings, getTestimonials } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { generalEnquiryMessage } from "@/lib/whatsapp";
import { Faqs } from "@/features/content/faqs";
import { TestimonialCard } from "@/features/content/testimonial-card";

const STANDARDS = [
  { label: "GCP Quality Assurance", icon: ClipboardCheck },
  { label: "GMP", icon: Building2 },
  { label: "GCLP", icon: FlaskConical },
  { label: "GLP", icon: Microscope },
  { label: "ISO 15189", icon: ShieldCheck },
  { label: "ISO 17025", icon: BadgeCheck },
];

const VALUES = [
  { letter: "N", word: "Noble", line: "We hold ourselves to the standard we teach." },
  { letter: "E", word: "Empathic", line: "We understand the pressure your team works under." },
  { letter: "S", word: "Sincere", line: "We tell you what your system actually needs." },
  { letter: "T", word: "Truthful", line: "Findings are evidence-based, never convenient." },
  { letter: "R", word: "Reliable", line: "What we commit to is what we deliver." },
  { letter: "A", word: "Authentic", line: "Our faculty teach from real practice." },
];

export default async function HomePage() {
  const [programmes, testimonials, partners, faqs, intakes, settings] = await Promise.all([
    getProgrammes(),
    getTestimonials(),
    getPartners(),
    getFaqs(),
    getIntakes(),
    getSettings(),
  ]);

  const featured = programmes.filter((p) => p.featured).slice(0, 6);
  const shown = featured.length > 0 ? featured : programmes.slice(0, 6);
  const featuredTestimonials = testimonials.filter((t) => t.featured);
  const shownTestimonials =
    featuredTestimonials.length > 0 ? featuredTestimonials : testimonials.slice(0, 2);
  const completions = settings.completionsCount;

  return (
    <>
      {/* Hero — the thesis: who this is for, and the two ways to act on it. */}
      <section className="relative overflow-hidden bg-brand text-brand-foreground">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--accent)/0.28),transparent_55%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.14] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:28px_28px]"
        />

        <div className="container relative grid gap-12 py-16 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16 lg:py-24">
          <div className="flex flex-col gap-6">
            <p className="text-eyebrow font-bold uppercase text-accent">
              Clinical Research &amp; Quality Management Systems
            </p>

            <h1 className="text-display-xl">
              Quality systems training that moves careers and passes audits
            </h1>

            <p className="max-w-[52ch] text-lg leading-relaxed text-brand-foreground/80">
              Nestra Klinikal trains laboratory scientists, clinical research staff, nurses and
              regulatory professionals across Nigeria and West Africa to international quality
              standards — and helps their organisations build systems that hold up to assessment.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="default">
                <Link href="/programmes">
                  Browse programmes
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <WhatsAppButton
                number={settings.whatsappNumber}
                message={generalEnquiryMessage()}
                context="hero"
                size="lg"
              />
            </div>

            {completions ? (
              <p className="flex items-center gap-2 text-sm text-brand-foreground/70">
                <Users className="size-4 shrink-0" aria-hidden="true" />
                Over {completions.toLocaleString("en-NG")} training completions to date
              </p>
            ) : null}
          </div>

          {/* Email capture, above the fold, as the brief requires. */}
          <div className="rounded-xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-sm sm:p-7">
            <h2 className="text-display-sm text-brand-foreground">
              Be first to hear when a cohort opens
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-foreground/70">
              Intake dates, new programmes and career guidance for health and research
              professionals. A few emails a month, no more.
            </p>
            <NewsletterForm
              className="mt-6"
              tone="dark"
              idPrefix="hero-newsletter"
              submitLabel="Send me intake dates"
            />
          </div>
        </div>
      </section>

      {/* Standards strip — what we actually cover, stated plainly. */}
      <div className="border-b border-border bg-surface">
        <div className="container py-8">
          <p className="text-center text-eyebrow font-bold uppercase text-muted-foreground">
            Standards we train and audit against
          </p>
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {STANDARDS.map(({ label, icon: Icon }) => (
              <li key={label} className="flex items-center gap-2 text-sm font-semibold">
                <Icon className="size-4 shrink-0 text-accent" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Programmes */}
      <Section>
        <div className="container">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHead
              eyebrow="Programmes"
              title="Training built around the standard you work to"
              lede="Every programme states its entry requirements, what it certifies, and what you will be able to do at the end."
            />
            <Button asChild variant="outline" className="shrink-0">
              <Link href="/programmes">
                All programmes
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((programme) => (
              <ProgrammeCard key={programme._id} programme={programme} />
            ))}
          </div>
        </div>
      </Section>

      {/* Who this is for */}
      <Section tone="surface">
        <div className="container grid gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionHead
            eyebrow="Who this is for"
            title="Built for professionals already carrying responsibility"
            lede="Our participants come from hospital laboratories, research sites, manufacturing floors and regulatory offices — most of them studying alongside a full-time job."
          />

          <ul className="grid gap-4 sm:grid-cols-2">
            {[
              "Medical laboratory scientists",
              "Biomedical scientists",
              "Clinical research associates",
              "Nurses and clinical staff",
              "Pharmacists",
              "Quality and regulatory officers",
            ].map((who) => (
              <li
                key={who}
                className="flex items-start gap-2.5 rounded-lg border border-border bg-card p-4 text-sm font-medium"
              >
                <BadgeCheck className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                {who}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Intakes — only rendered when real dates exist. */}
      {intakes.length > 0 ? (
        <Section>
          <div className="container">
            <SectionHead
              eyebrow="Upcoming intakes"
              title="Next cohorts"
              lede="Places are confirmed on payment. Message us on WhatsApp to hold a place."
            />
            <ul className="mt-10 divide-y divide-border overflow-hidden rounded-xl border border-border">
              {intakes.map((intake) => (
                <li
                  key={intake._id}
                  className="flex flex-col gap-3 bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold">{intake.programmeTitle}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Starts {formatDate(intake.startDate)}
                      {intake.location ? ` · ${intake.location}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {intake.status === "filling" ? (
                      <span className="rounded-full bg-signal/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-signal">
                        Filling fast
                      </span>
                    ) : (
                      <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent">
                        Open
                      </span>
                    )}
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/programmes/${intake.programmeSlug}`}>View</Link>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      {/* Core values */}
      <Section tone="surface">
        <div className="container">
          <SectionHead
            align="center"
            eyebrow="Our core values"
            title="What NESTRA stands for"
            lede="Six commitments, one per letter of our name, that govern how we teach and how we audit."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value) => (
              <li key={value.letter} className="rounded-xl border border-border bg-card p-6">
                <span className="flex size-10 items-center justify-center rounded-lg bg-brand font-display text-lg font-extrabold text-brand-foreground">
                  {value.letter}
                </span>
                <p className="mt-4 font-bold">{value.word}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{value.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Testimonials */}
      {shownTestimonials.length > 0 ? (
        <Section>
          <div className="container">
            <SectionHead
              align="center"
              eyebrow="In their words"
              title="What the training changed"
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {shownTestimonials.map((testimonial) => (
                <TestimonialCard key={testimonial._id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      {/* Partners */}
      {partners.length > 0 ? (
        <Section tone="surface">
          <div className="container">
            <SectionHead
              eyebrow="Institutional partners"
              title="Delivered with institutions across Nigeria"
              lede="We work with training centres and academic institutions so more professionals can reach the same standard."
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {partners.map((partner) => (
                <div key={partner._id} className="rounded-xl border border-border bg-card p-6">
                  <p className="text-eyebrow font-bold uppercase text-accent">
                    {partner.kind === "state"
                      ? "State institution"
                      : partner.kind === "federal"
                        ? "Federal institution"
                        : partner.kind === "corporate"
                          ? "Corporate"
                          : "Private training centre"}
                  </p>
                  <h3 className="mt-3 text-lg font-bold">{partner.name}</h3>
                  {partner.location ? (
                    <p className="mt-1 text-sm text-muted-foreground">{partner.location}</p>
                  ) : null}
                  {partner.description ? (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {partner.description}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Button asChild variant="outline">
                <Link href="/partnerships">
                  Become a partner
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </Section>
      ) : null}

      {/* Lead magnet */}
      <Section>
        <div className="container grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <SectionHead
            eyebrow="Free guide"
            title="Take the programme guide away with you"
            lede="A short guide to how our programmes fit together, who each one is for, and what you need to enrol. Useful if you are deciding where to start, or making a case to your employer."
          />
          <LeadMagnet
            title="Nestra Klinikal Programme Guide"
            description="One PDF covering the full learning pathway, from foundation certificate through to advanced diploma and the phlebotomy specialist track."
            fileUrl="/guides/nestra-klinikal-programme-guide.pdf"
          />
        </div>
      </Section>

      {/* FAQ */}
      {faqs.length > 0 ? (
        <Section>
          <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <SectionHead
              eyebrow="Questions"
              title="Before you enrol"
              lede="If your question is not here, message us on WhatsApp and a person will answer."
            />
            <Faqs faqs={faqs} />
          </div>
        </Section>
      ) : null}

      {/* Final conversion block */}
      <Section tone="deep" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--accent)/0.3),transparent_55%)]"
        />
        <div className="container relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-5">
            <h2 className="text-display-lg">Ready to take the next step?</h2>
            <p className="max-w-[48ch] text-lg text-brand-foreground/75">
              Tell us where you are in your career, or what your organisation needs, and we will
              point you to the right programme.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton
                number={settings.whatsappNumber}
                message={generalEnquiryMessage()}
                context="final-cta"
                size="lg"
              />
              <Button asChild size="lg" variant="outline" className="border-white/30 text-brand-foreground hover:bg-white/10">
                <Link href="/corporate">Corporate &amp; consulting</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-sm sm:p-7">
            <h3 className="text-display-sm">Not ready to enrol yet?</h3>
            <p className="mt-3 text-sm text-brand-foreground/70">
              Join the mailing list and we will keep you posted on intakes and new programmes.
            </p>
            <NewsletterForm
              className="mt-6"
              tone="dark"
              idPrefix="cta-newsletter"
              submitLabel="Keep me posted"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
