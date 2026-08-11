import type { Metadata } from "next";

import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/shared/section";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Nestra Klinikal Limited collects, uses and protects personal data, written against the Nigeria Data Protection Act.",
  alternates: { canonical: "/privacy" },
};

/*
 * DRAFT FOR LEGAL REVIEW.
 * This policy describes what the website actually does with personal data, but
 * it has not been reviewed by a Nigerian-qualified lawyer. See PLACEHOLDERS.md.
 */
export default async function PrivacyPage() {
  const settings = await getSettings();
  const contactEmail = settings.email ?? "info@nestraklinikal.com";

  return (
    <>
      <PageHero
        breadcrumb={[{ href: "/", label: "Home" }, { label: "Privacy policy" }]}
        title="Privacy policy"
        lede="How we collect, use and protect your personal data."
      />

      <Section>
        <div className="container">
          <div className="prose-nk mx-auto">
            <p>
              This policy explains how {settings.legalName ?? "Nestra Klinikal Limited"}{" "}
              {settings.rcNumber ? `(${settings.rcNumber})` : ""} collects and uses personal data
              through this website. It is written to reflect our obligations under the Nigeria Data
              Protection Act 2023.
            </p>

            <h2>Who is responsible for your data</h2>
            <p>
              {settings.legalName ?? "Nestra Klinikal Limited"} is the data controller for personal
              data collected through this website. Our office is at{" "}
              {settings.address ?? "Ibadan, Oyo State, Nigeria"}. You can reach us about any privacy
              matter at <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </p>

            <h2>What we collect</h2>
            <p>We collect only what you give us through a form on this website:</p>
            <ul>
              <li>Your email address, when you subscribe for programme and intake updates.</li>
              <li>
                Your name, email address and, where you choose to provide it, your phone or WhatsApp
                number, when you enquire about or apply for a programme.
              </li>
              <li>
                Your organisation&rsquo;s name and approximate size, when you make a corporate or
                partnership enquiry.
              </li>
              <li>Any message you choose to write to us.</li>
              <li>
                The page you submitted the form from, and any campaign parameters in the link you
                arrived through, so we understand which of our activities are useful.
              </li>
              <li>
                A record of the consent you gave: whether you ticked the consent box, the exact
                wording you agreed to, and the date and time.
              </li>
            </ul>

            <h2>Why we use it</h2>
            <p>We use your personal data to:</p>
            <ul>
              <li>Reply to your enquiry or process your application.</li>
              <li>
                Send you information about training programmes, intake dates and related services,
                where you have consented to receive it.
              </li>
              <li>Understand which pages and campaigns generate enquiries, in aggregate.</li>
            </ul>

            <h2>The basis on which we rely</h2>
            <p>
              Where we send you marketing, we rely on your consent, which you give by ticking the
              consent box on a form. Where we reply to an enquiry or process an application, we rely
              on taking steps at your request before entering into a contract with you.
            </p>

            <h2>Withdrawing your consent</h2>
            <p>
              You can withdraw your consent at any time. Email{" "}
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a> or reply to any message you
              receive from us, and we will stop sending you marketing. Withdrawing consent does not
              affect anything we did before you withdrew it.
            </p>

            <h2>Your rights</h2>
            <p>Under the Nigeria Data Protection Act you have the right to:</p>
            <ul>
              <li>Ask what personal data we hold about you, and get a copy of it.</li>
              <li>Ask us to correct data that is wrong or incomplete.</li>
              <li>Ask us to delete your data, where we have no lawful reason to keep it.</li>
              <li>Object to us using your data for marketing.</li>
              <li>Ask us to restrict how we use your data while a concern is resolved.</li>
              <li>Ask us to transfer your data to you or another organisation.</li>
              <li>
                Complain to the Nigeria Data Protection Commission if you believe we have handled
                your data improperly.
              </li>
            </ul>
            <p>
              To exercise any of these rights, email{" "}
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. We will respond within the
              period the Act requires.
            </p>

            <h2>Who else sees your data</h2>
            <p>
              We do not sell your personal data. We share it only with service providers who help us
              operate this website and communicate with you — our content management and hosting
              providers, and our email delivery provider where one is in use. These providers act on
              our instructions.
            </p>
            <p>
              Some of these providers store data outside Nigeria. Where that is the case, we take
              reasonable steps to satisfy ourselves that your data remains protected to a standard
              consistent with the Act.
            </p>

            <h2>How long we keep it</h2>
            <p>
              We keep enquiry and application records for as long as we have an active relationship
              with you, and for a reasonable period afterwards so we can answer questions about your
              training history. We keep marketing subscriptions until you withdraw your consent.
            </p>

            <h2>Cookies and analytics</h2>
            <p>
              This website stores a small marker in your browser to remember that you have already
              seen or dismissed our email signup prompt, so that it is not shown to you repeatedly.
              Where analytics are enabled, we use them to count page views and to see which pages
              lead to enquiries. We do not use advertising trackers.
            </p>

            <h2>Keeping your data safe</h2>
            <p>
              Personal data submitted through this website is transmitted over an encrypted
              connection and stored in access-controlled systems. Access is limited to people who
              need it to do their work.
            </p>

            <h2>Changes to this policy</h2>
            <p>
              If we change this policy we will update this page. Please check it from time to time.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
