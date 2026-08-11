import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Logo, Wordmark } from "@/components/shared/logo";
import { NewsletterForm } from "@/features/leads/newsletter-form";
import type { SiteSettings } from "@/types/content";

const PROGRAMME_LINKS = [
  { href: "/programmes", label: "All programmes" },
  { href: "/corporate", label: "Corporate & consulting" },
  { href: "/partnerships", label: "Institutional partnerships" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "About us" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms", label: "Terms" },
  { href: "/refund-policy", label: "Refund policy" },
];

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand text-brand-foreground">
      <div className="container py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1.4fr]">
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo className="size-10" />
              <Wordmark tone="inverted" />
            </Link>
            <p className="max-w-[34ch] text-sm leading-relaxed text-brand-foreground/70">
              A Clinical Research and Quality Management Systems organisation based in Ibadan,
              Nigeria, training health and research professionals to international quality
              standards.
            </p>
            <p className="text-xs text-brand-foreground/50">
              {settings.legalName ?? "Nestra Klinikal Limited"}
              {settings.rcNumber ? ` · ${settings.rcNumber}` : ""}
            </p>
          </div>

          <nav aria-label="Programmes" className="flex flex-col gap-3">
            <h2 className="text-eyebrow font-bold uppercase text-brand-foreground/50">
              Programmes
            </h2>
            {PROGRAMME_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-brand-foreground/75 transition-colors hover:text-brand-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <nav aria-label="Company" className="flex flex-col gap-3">
            <h2 className="text-eyebrow font-bold uppercase text-brand-foreground/50">Company</h2>
            {COMPANY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-brand-foreground/75 transition-colors hover:text-brand-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-5">
            <h2 className="text-eyebrow font-bold uppercase text-brand-foreground/50">
              Stay in touch
            </h2>

            <NewsletterForm
              tone="dark"
              idPrefix="footer-newsletter"
              submitLabel="Subscribe"
              successMessage="You are subscribed. Look out for intake announcements."
            />

            <address className="flex flex-col gap-2.5 not-italic">
              {settings.phoneDisplay ? (
                <a
                  href={`tel:${settings.phoneDisplay.replace(/[^\d+]/g, "")}`}
                  className="flex items-center gap-2.5 text-sm text-brand-foreground/75 transition-colors hover:text-brand-foreground"
                >
                  <Phone className="size-4 shrink-0" aria-hidden="true" />
                  {settings.phoneDisplay}
                </a>
              ) : null}
              {settings.email ? (
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-2.5 text-sm text-brand-foreground/75 transition-colors hover:text-brand-foreground"
                >
                  <Mail className="size-4 shrink-0" aria-hidden="true" />
                  {settings.email}
                </a>
              ) : null}
              {settings.address ? (
                <span className="flex items-start gap-2.5 text-sm text-brand-foreground/75">
                  <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  {settings.address}
                </span>
              ) : null}
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-brand-foreground/50">
            © {year} {settings.legalName ?? "Nestra Klinikal Limited"}. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-brand-foreground/50 transition-colors hover:text-brand-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
