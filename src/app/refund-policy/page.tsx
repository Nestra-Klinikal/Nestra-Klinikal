import type { Metadata } from "next";

import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/shared/section";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "How Nestra Klinikal handles cancellations, transfers and refunds for its training programmes.",
  alternates: { canonical: "/refund-policy" },
};

/*
 * DRAFT FOR LEGAL REVIEW, AND THE NOTICE PERIODS ARE PLACEHOLDERS.
 * The specific windows below must be confirmed as the organisation's real
 * commercial policy before launch. See PLACEHOLDERS.md.
 */
export default async function RefundPolicyPage() {
  const settings = await getSettings();
  const contactEmail = settings.email ?? "info@nestraklinikal.com";

  return (
    <>
      <PageHero
        breadcrumb={[{ href: "/", label: "Home" }, { label: "Refund policy" }]}
        title="Refund policy"
        lede="How we handle cancellations, transfers and refunds."
      />

      <Section>
        <div className="container">
          <div className="prose-nk mx-auto">
            <p>
              We want you to get value from your training. This policy explains what happens if your
              circumstances change, or if we have to change a programme.
            </p>

            <h2>If you cancel before a programme starts</h2>
            <p>
              Tell us as early as you can by emailing{" "}
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. Where you cancel well before
              the start date, we will refund the fee you have paid, less any administrative charge
              disclosed to you at the point of enrolment. Where you cancel close to the start date,
              a portion of the fee may be retained to cover places and materials already committed.
            </p>

            <h2>If you cancel after a programme starts</h2>
            <p>
              Once a programme has begun, fees are generally not refundable, because teaching
              capacity and materials have already been allocated to you. We will always consider
              genuine hardship or medical circumstances on their facts — write to us and tell us
              what has happened.
            </p>

            <h2>Transferring to a later cohort</h2>
            <p>
              If you cannot continue, we would usually rather move you than refund you. Subject to
              places being available, you may request a transfer to a later intake of the same
              programme. A transfer administration charge may apply.
            </p>

            <h2>If we cancel or reschedule</h2>
            <p>
              If we cancel a programme, you may choose either a full refund of the fee you have paid
              for it, or a transfer to the next available intake. If we reschedule a programme and
              the new dates do not work for you, the same choice applies.
            </p>

            <h2>Programmes with supervised practical hours</h2>
            <p>
              Where a programme requires supervised practical hours, the practical component is a
              distinct part of the programme. If you complete the taught part but do not attend the
              practical hours, the taught fee is not refundable, and certification cannot be awarded
              until those hours are completed.
            </p>

            <h2>Corporate and institutional bookings</h2>
            <p>
              Where an organisation books a cohort, cancellation and refund terms are those set out
              in the written agreement for that engagement, which take precedence over this page.
            </p>

            <h2>How to request a refund</h2>
            <p>
              Email <a href={`mailto:${contactEmail}`}>{contactEmail}</a> with your name, the
              programme, and what you are asking for. We will acknowledge your request and tell you
              our decision, with reasons. Approved refunds are paid to the account the original
              payment came from.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
