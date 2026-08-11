import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/shared/section";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { ContactForm } from "@/features/leads/contact-form";
import { getSettings } from "@/lib/content";
import { generalEnquiryMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Nestra Klinikal about training programmes, corporate quality management consulting or institutional partnerships. Based in Ibadan, Oyo State, Nigeria.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHero
        breadcrumb={[{ href: "/", label: "Home" }, { label: "Contact" }]}
        eyebrow="Contact"
        title="Talk to us"
        lede="Whether you are choosing a programme or scoping a quality project for your organisation, we would like to hear from you."
      />

      <Section>
        <div className="container grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="flex flex-col gap-8">
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-6">
              <MessageCircle className="size-6 text-accent" aria-hidden="true" />
              <h2 className="mt-3 text-lg font-bold">WhatsApp is fastest</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Most enquiries reach us on WhatsApp and get a reply the same day.
              </p>
              <WhatsAppButton
                className="mt-5 w-full"
                number={settings.whatsappNumber}
                message={generalEnquiryMessage()}
                context="contact-page"
              />
            </div>

            <address className="flex flex-col gap-5 not-italic">
              {settings.phoneDisplay ? (
                <ContactRow icon={Phone} label="Phone">
                  <a
                    href={`tel:${settings.phoneDisplay.replace(/[^\d+]/g, "")}`}
                    className="transition-colors hover:text-accent"
                  >
                    {settings.phoneDisplay}
                  </a>
                </ContactRow>
              ) : null}

              {settings.email ? (
                <ContactRow icon={Mail} label="Email">
                  <a
                    href={`mailto:${settings.email}`}
                    className="transition-colors hover:text-accent"
                  >
                    {settings.email}
                  </a>
                </ContactRow>
              ) : null}

              {settings.address ? (
                <ContactRow icon={MapPin} label="Office">
                  {settings.address}
                </ContactRow>
              ) : null}
            </address>
          </div>

          <ContactForm />
        </div>
      </Section>
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Phone;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="mt-0.5 font-medium">{children}</p>
      </div>
    </div>
  );
}
