import type { Metadata } from "next";

import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/shared/section";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "The terms on which Nestra Klinikal Limited provides this website and its training programmes.",
  alternates: { canonical: "/terms" },
};

/*
 * DRAFT FOR LEGAL REVIEW. See PLACEHOLDERS.md.
 */
export default async function TermsPage() {
  const settings = await getSettings();
  const contactEmail = settings.email ?? "info@nestraklinikal.com";
  const legalName = settings.legalName ?? "Nestra Klinikal Limited";

  return (
    <>
      <PageHero
        breadcrumb={[{ href: "/", label: "Home" }, { label: "Terms" }]}
        title="Terms"
        lede="The terms on which we provide this website and our training programmes."
      />

      <Section>
        <div className="container">
          <div className="prose-nk mx-auto">
            <h2>About us</h2>
            <p>
              This website is operated by {legalName}
              {settings.rcNumber ? `, ${settings.rcNumber}` : ""}, a company registered in the
              Federal Republic of Nigeria with its office at{" "}
              {settings.address ?? "Ibadan, Oyo State, Nigeria"}. References to
              &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; are to {legalName}.
            </p>

            <h2>Using this website</h2>
            <p>
              You may use this website to learn about our programmes and services and to contact us.
              You agree not to use it in a way that damages it, interferes with anyone else&rsquo;s
              use of it, or breaks any applicable law.
            </p>

            <h2>Information on this website</h2>
            <p>
              We take care to keep programme information accurate, but content on this website is
              provided for general information. Programme content, duration, delivery mode, fees and
              intake dates may change. The details confirmed to you in writing when you enrol are
              the details that apply to your enrolment.
            </p>

            <h2>Enrolment</h2>
            <p>
              Submitting an enquiry or application through this website does not by itself create a
              contract between us. A place on a programme is confirmed only when we confirm it to
              you in writing and any required fee has been received.
            </p>
            <p>
              Where a programme states entry requirements, we may ask you to evidence that you meet
              them, and may decline an application where you do not.
            </p>

            <h2>Fees</h2>
            <p>
              Fees for each programme are as stated on the programme page or as quoted to you in
              writing. Where a fee is shown in more than one currency, the currency in which you are
              invoiced will be confirmed to you before payment.
            </p>

            <h2>Certification</h2>
            <p>
              Certificates are awarded by {legalName} on successful completion of the programme
              requirements. Where a programme requires supervised practical hours, certification is
              awarded only once those hours have been completed and assessed. We do not represent
              that our certificates carry accreditation from any external body unless the programme
              page expressly says so.
            </p>

            <h2>Our materials</h2>
            <p>
              All curriculum, training materials, documents and other content we provide remain our
              property. You may use them for your own learning and professional practice. You may
              not reproduce, distribute, publish or use them to deliver training to others without
              our written permission.
            </p>

            <h2>Cancellation and refunds</h2>
            <p>
              Cancellations and refunds are governed by our refund policy, which forms part of these
              terms.
            </p>

            <h2>Our responsibility</h2>
            <p>
              We will provide our programmes and services with reasonable care and skill. We do not
              exclude or limit our liability where it would be unlawful to do so. Subject to that,
              we are not responsible for losses that were not foreseeable, or for loss of profit,
              revenue or business opportunity.
            </p>

            <h2>Changes to these terms</h2>
            <p>
              We may update these terms from time to time. The version published on this page at the
              time you enrol is the version that applies to that enrolment.
            </p>

            <h2>Governing law</h2>
            <p>
              These terms are governed by the laws of the Federal Republic of Nigeria, and the
              Nigerian courts have jurisdiction over any dispute arising from them.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms can be sent to{" "}
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
