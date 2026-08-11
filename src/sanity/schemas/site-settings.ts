import { defineArrayMember, defineField, defineType } from "sanity";
import { Settings } from "lucide-react";

/**
 * Everything that would otherwise be hard-coded. Contact details, the WhatsApp
 * number and the announcement bar all live here so they can be changed without
 * a developer or a redeploy.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: Settings,
  groups: [
    { name: "contact", title: "Contact", default: true },
    { name: "announcement", title: "Announcement bar" },
    { name: "social", title: "Social links" },
    { name: "org", title: "Company details" },
  ],
  fields: [
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp number",
      type: "string",
      group: "contact",
      description:
        "In international format with no plus sign, spaces or dashes. Example: 2348131253352.",
      validation: (rule) =>
        rule
          .required()
          .regex(/^[0-9]{8,15}$/, {
            name: "digits only",
            invert: false,
          })
          .error("Digits only, no plus sign or spaces. Example: 2348131253352"),
    }),
    defineField({
      name: "phoneDisplay",
      title: "Phone number (as displayed)",
      type: "string",
      group: "contact",
      description: "How the number should read on the page, e.g. +234 (0) 813 125 3352.",
    }),
    defineField({
      name: "email",
      title: "Email address",
      type: "string",
      group: "contact",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "address",
      title: "Office address",
      type: "text",
      rows: 3,
      group: "contact",
    }),

    defineField({
      name: "announcementEnabled",
      title: "Show the announcement bar",
      type: "boolean",
      group: "announcement",
      initialValue: false,
    }),
    defineField({
      name: "announcementText",
      title: "Announcement text",
      type: "string",
      group: "announcement",
    }),
    defineField({
      name: "announcementLink",
      title: "Announcement link",
      type: "string",
      group: "announcement",
      description: "Optional. A path such as /programmes, or a full https:// address.",
    }),

    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      group: "social",
      of: [
        defineArrayMember({
          type: "object",
          name: "socialLink",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "X (Twitter)", value: "twitter" },
                  { title: "Facebook", value: "facebook" },
                  { title: "Instagram", value: "instagram" },
                  { title: "YouTube", value: "youtube" },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "Link",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        }),
      ],
    }),

    defineField({
      name: "legalName",
      title: "Registered company name",
      type: "string",
      group: "org",
      initialValue: "Nestra Klinikal Limited",
    }),
    defineField({
      name: "rcNumber",
      title: "RC number",
      type: "string",
      group: "org",
      initialValue: "RC 1054356",
    }),
    defineField({
      name: "completionsCount",
      title: "Number of training completions",
      type: "number",
      group: "org",
      description:
        "Shown as social proof. Only enter a figure you can evidence — this is a public claim.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site settings" };
    },
  },
});
