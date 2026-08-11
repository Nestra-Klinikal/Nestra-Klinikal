import type { Metadata } from "next";
import { BadgeCheck, BookOpen, Megaphone, ShieldCheck } from "lucide-react";

import { PageHero } from "@/components/shared/page-hero";
import { Section, SectionHead } from "@/components/shared/section";
import { OrganisationEnquiryForm } from "@/features/leads/organisation-enquiry-form";
import { getPartners, getSettings } from "@/lib/content";
import { partnershipEnquiryMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Institutional Partnerships",
  description:
    "Nestra Klinikal partners with training centres and academic institutions across Nigeria to deliver quality management and clinical research certification programmes.",
  alternates: { canonical: "/partnerships" },
};

const BENEFITS = [
  {
    icon: BookOpen,
    title: "A curriculum that is already built",
    description:
      "You deliver programmes developed and maintained by practitioners, without having to design them yourself.",
  },
  {
    icon: BadgeCheck,
    title: "A credential with a track record",
    description:
      "Certification backed by a body of graduates already working in the sector across Nigeria and abroad.",
  },
  {
    icon: Megaphone,
    title: "Marketing led by us",
    description:
      "Nestra Klinikal leads programme marketing and credits the partner institution, so reach grows for both sides.",
  },
  {
    icon: ShieldCheck,
    title: "A clear written agreement",
    description:
      "Every partnership runs on a formal training services agreement covering fee handling, reporting and audit rights.",
  },
];

const KIND_LABELS: Record<string, string> = {
  private: "Private training centre",
  state: "State institution",
  federal: "Federal institution",
  corporate: "Corporate",
};

export default async function PartnershipsPage() {
  const [partners, settings] = await Promise.all([getPartners(), getSettings()]);

  return (
    <>
      <PageHero
        breadcrumb={[{ href: "/", label: "Home" }, { label: "Partnerships" }]}
        eyebrow="For institutions"
        title="Run Nestra Klinikal programmes at your institution"
        lede="We partner with training centres and academic institutions so more health and research professionals can reach an international standard without leaving their region."
      />

      {partners.length > 0 ? (
        <Section>
          <div className="container">
            <SectionHead
              eyebrow="Current partners"
              title="Institutions we work with"
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {partners.map((partner) => (
                <div key={partner._id} className="rounded-xl border border-border bg-card p-6">
                  <p className="text-eyebrow font-bold uppercase text-accent">
                    {KIND_LABELS[partner.kind ?? "private"] ?? "Partner"}
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
          </div>
        </Section>
      ) : null}

      <Section tone="surface">
        <div className="container">
          <SectionHead
            eyebrow="Why partner"
            title="What a partnership gives your institution"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {BENEFITS.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4 rounded-xl border border-border bg-card p-6">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <Icon className="size-5 text-accent" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-bold">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="container grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <SectionHead
            eyebrow="Talk to us"
            title="Enquire about a partnership"
            lede="Tell us about your institution and the learners you serve, and we will come back with how a partnership could work."
          />
          <OrganisationEnquiryForm
            leadType="partnership"
            heading="Partnership enquiry"
            description="For training centres, polytechnics, universities and professional bodies."
            submitLabel="Send partnership enquiry"
            messageLabel="Tell us about your institution"
            messageHint="For example: the programmes you already run, your learner numbers, and which Nestra Klinikal programmes interest you."
            whatsappNumber={settings.whatsappNumber}
            whatsappMessage={partnershipEnquiryMessage()}
          />
        </div>
      </Section>
    </>
  );
}
