import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Public_Sans } from "next/font/google";

import "@/styles/globals.css";

import { Providers } from "@/components/shared/providers";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { WhatsAppFloatingButton } from "@/components/shared/whatsapp-button";
import { EmailCaptureModal } from "@/features/leads/email-capture-modal";
import { getSettings } from "@/lib/content";
import { generalEnquiryMessage } from "@/lib/whatsapp";
import { SITE_URL } from "@/lib/site";

// Self-hosted by next/font, so there is no third-party request on first paint —
// the single biggest lever on a throttled mobile connection.
/**
 * Weights are kept to the minimum the design actually uses, and both faces use
 * `display: optional`.
 *
 * `optional` keeps the webfont off the critical rendering path: text paints
 * immediately in the metric-matched fallback, so the largest contentful paint
 * does not wait on a 40 KB font download, and there is no reflow when it
 * arrives. Visitors on a slow first connection see the fallback and get the
 * brand face from cache on any later visit. On this audience's networks that
 * trade is the right way round.
 */
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display",
  display: "optional",
  preload: true,
});

const body = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-body",
  display: "optional",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nestra Klinikal | Clinical Research & Quality Management Systems Training",
    template: "%s | Nestra Klinikal",
  },
  description:
    "Nestra Klinikal trains health and research professionals in quality management systems, GCP, GMP, GCLP, GLP, ISO 15189 and ISO 17025, and provides QMS consulting to organisations across Nigeria and West Africa.",
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Nestra Klinikal",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#08111f" },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();

  return (
    <html lang="en-NG" suppressHydrationWarning className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
          >
            Skip to content
          </a>

          <SiteHeader settings={settings} />

          <main id="main" className="flex-1">
            {children}
          </main>

          <SiteFooter settings={settings} />

          <WhatsAppFloatingButton
            number={settings.whatsappNumber}
            message={generalEnquiryMessage()}
          />
          <EmailCaptureModal />
        </Providers>
      </body>
    </html>
  );
}
