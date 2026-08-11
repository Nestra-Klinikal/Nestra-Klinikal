import type { Metadata } from "next";
import { ClipboardCheck, GraduationCap, LineChart, ScanSearch, ShieldCheck, Users } from "lucide-react";

import { PageHero } from "@/components/shared/page-hero";
import { Section, SectionHead } from "@/components/shared/section";
import { OrganisationEnquiryForm } from "@/features/leads/organisation-enquiry-form";
import { getSettings } from "@/lib/content";
import { corporateEnquiryMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Corporate & Consulting",
  description:
    "ISO-aligned quality management system design and implementation, auditing, accreditation-readiness support and in-house corporate training cohorts from Nestra Klinikal.",
  alternates: { canonical: "/corporate" },
};

const SERVICES = [
  {
    icon: ScanSearch,
    title: "Gap analysis",
    description:
      "An independent read of your current system against the standard you are targeting, with a prioritised list of what actually needs to change.",
  },
  {
    icon: ShieldCheck,
    title: "QMS design and implementation",
    description:
      "Building a quality management system that fits how your organisation really works, rather than a template that will be ignored.",
  },
  {
    icon: ClipboardCheck,
    title: "Auditing",
    description:
      "Internal and supplier audits against GCP, GMP, GCLP, GLP, ISO 15189 and ISO 17025, with findings written to be acted on.",
  },
  {
    icon: LineChart,
    title: "Accreditation readiness",
    description:
      "Structured preparation for ISO 15189 or ISO 17025 assessment, from gap closure through to mock assessment.",
  },
  {
    icon: Users,
    title: "In-house cohorts",
    description:
      "We train your team together, using your own processes and documents as the working material.",
  },
  {
    icon: GraduationCap,
    title: "Internal auditor development",
    description:
      "Building an internal audit capability inside your organisation so the system sustains itself.",
  },
];

export default async function CorporatePage() {
  const settings = await getSettings();

  return (
    <>
      <PageHero
        breadcrumb={[{ href: "/", label: "Home" }, { label: "Corporate & consulting" }]}
        eyebrow="For organisations"
        title="Quality systems that survive an assessment"
        lede="We work with laboratories, research sites, manufacturers and institutions to design, implement and audit quality management systems — and to train the people who will run them."
      />

      <Section>
        <div className="container">
          <SectionHead
            eyebrow="What we do"
            title="Consulting services"
            lede="Engagements are scoped to what your system needs, not to a fixed package."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-6">
                <span className="flex size-11 items-center justify-center rounded-lg bg-accent/10">
                  <Icon className="size-5 text-accent" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <div className="container grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <SectionHead
              eyebrow="Start a conversation"
              title="Tell us what your organisation needs"
              lede="The more you can tell us about where your system stands today, the more specific our first response can be."
            />
            <p className="text-sm leading-relaxed text-muted-foreground">
              We treat every enquiry as confidential. If you would rather talk before writing
              anything down, message us on WhatsApp and we will arrange a call.
            </p>
          </div>

          <OrganisationEnquiryForm
            leadType="corporate"
            heading="Corporate enquiry"
            description="Tell us about your organisation and what you are trying to achieve."
            submitLabel="Send enquiry"
            messageLabel="What do you need?"
            messageHint="For example: preparing a medical laboratory for ISO 15189 assessment, or training 20 staff in QMS."
            whatsappNumber={settings.whatsappNumber}
            whatsappMessage={corporateEnquiryMessage()}
          />
        </div>
      </Section>
    </>
  );
}
