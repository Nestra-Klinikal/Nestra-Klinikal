import { defineField, defineType } from "sanity";
import { Mail } from "lucide-react";

/**
 * A captured email address. Stored as a document so the administrator can see
 * and export the list from Studio without asking a developer.
 *
 * The consent fields exist because the Nigeria Data Protection Act requires
 * consent to be recorded, not assumed.
 */
export const lead = defineType({
  name: "lead",
  title: "Email lead",
  type: "document",
  icon: Mail,
  // Leads are written by the website, not typed by hand.
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: "email",
      title: "Email address",
      type: "string",
      readOnly: true,
      validation: (rule) => rule.required().email(),
    }),
    defineField({ name: "name", title: "Name", type: "string", readOnly: true }),
    defineField({ name: "phone", title: "Phone", type: "string", readOnly: true }),
    defineField({
      name: "organisation",
      title: "Organisation",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "organisationSize",
      title: "Organisation size",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 4,
      readOnly: true,
    }),
    defineField({
      name: "leadType",
      title: "Type",
      type: "string",
      readOnly: true,
      options: {
        list: [
          { title: "Newsletter signup", value: "newsletter" },
          { title: "Programme enquiry", value: "programme-enquiry" },
          { title: "Application started", value: "application" },
          { title: "Corporate / consulting enquiry", value: "corporate" },
          { title: "Partnership enquiry", value: "partnership" },
          { title: "Guide download", value: "lead-magnet" },
          { title: "Contact form", value: "contact" },
        ],
      },
    }),
    defineField({
      name: "programmeOfInterest",
      title: "Programme of interest",
      type: "reference",
      to: [{ type: "programme" }],
      readOnly: true,
    }),
    defineField({
      name: "sourcePage",
      title: "Page they signed up from",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "consentGiven",
      title: "Consent given",
      type: "boolean",
      readOnly: true,
      description: "Whether the person ticked the marketing consent box.",
    }),
    defineField({
      name: "consentText",
      title: "Exact wording they agreed to",
      type: "text",
      rows: 3,
      readOnly: true,
      description: "Kept as evidence of what consent was given for.",
    }),
    defineField({
      name: "consentTimestamp",
      title: "When consent was given",
      type: "datetime",
      readOnly: true,
    }),
    defineField({ name: "utmSource", title: "UTM source", type: "string", readOnly: true }),
    defineField({ name: "utmMedium", title: "UTM medium", type: "string", readOnly: true }),
    defineField({ name: "utmCampaign", title: "UTM campaign", type: "string", readOnly: true }),
    defineField({ name: "utmTerm", title: "UTM term", type: "string", readOnly: true }),
    defineField({ name: "utmContent", title: "UTM content", type: "string", readOnly: true }),
    defineField({
      name: "syncedToEmailPlatform",
      title: "Synced to email platform",
      type: "boolean",
      readOnly: true,
      initialValue: false,
    }),
    defineField({
      name: "createdAt",
      title: "Received",
      type: "datetime",
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: "Most recent first",
      name: "createdAtDesc",
      by: [{ field: "createdAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "email", subtitle: "leadType", createdAt: "createdAt" },
    prepare({ title, subtitle, createdAt }) {
      const when = createdAt
        ? new Date(createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "";
      return {
        title: title ?? "(no email)",
        subtitle: [subtitle, when].filter(Boolean).join(" · "),
      };
    },
  },
});
