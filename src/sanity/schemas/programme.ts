import { defineArrayMember, defineField, defineType } from "sanity";
import { GraduationCap } from "lucide-react";

/**
 * A Programme is the unit that drives the whole site. Creating one publishes an
 * index card, a detail page, a filter entry, a sitemap entry, Course structured
 * data and a pre-filled WhatsApp link — with no code change and no redeploy.
 */
export const programme = defineType({
  name: "programme",
  title: "Programme",
  type: "document",
  icon: GraduationCap,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "details", title: "Details & fees" },
    { name: "seo", title: "Search listing" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Programme name",
      type: "string",
      group: "content",
      description: "For example: Quality Management Systems & Quality Assurance.",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      group: "content",
      description:
        "The part of the link after /programmes/. Press Generate to fill it in from the name.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "content",
      description: "Controls which filter this programme appears under.",
      options: {
        list: [
          { title: "Quality Management Systems", value: "qms" },
          { title: "Clinical Research", value: "clinical-research" },
          { title: "Laboratory Quality", value: "laboratory" },
          { title: "Specialist / Practical", value: "specialist" },
          { title: "Corporate & Consulting", value: "corporate" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "level",
      title: "Level",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Foundation", value: "foundation" },
          { title: "Core", value: "core" },
          { title: "Advanced / Diploma", value: "advanced" },
          { title: "Specialist", value: "specialist" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Short summary",
      type: "text",
      rows: 3,
      group: "content",
      description: "One or two sentences. Shown on the programme card and in search results.",
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: "heroImage",
      title: "Main image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Image description",
          type: "string",
          description: "Describe the image for people using screen readers.",
        }),
      ],
    }),
    defineField({
      name: "whoItIsFor",
      title: "Who this is for",
      type: "array",
      group: "content",
      description: "One line per audience, e.g. Medical laboratory scientists.",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "outcomes",
      title: "What you will be able to do",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "curriculum",
      title: "Curriculum",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          name: "module",
          title: "Module",
          fields: [
            defineField({ name: "title", title: "Module title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", title: "What it covers", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Full description",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({ type: "image", options: { hotspot: true } }),
      ],
    }),

    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      group: "details",
      description: "For example: 8 weeks, or 3 months part-time.",
    }),
    defineField({
      name: "deliveryMode",
      title: "Delivery mode",
      type: "string",
      group: "details",
      options: {
        list: [
          { title: "Online (live)", value: "online-live" },
          { title: "Online (self-paced)", value: "online-self" },
          { title: "In person", value: "in-person" },
          { title: "Blended (online + in person)", value: "blended" },
        ],
      },
    }),
    defineField({
      name: "entryRequirements",
      title: "Entry requirements",
      type: "array",
      group: "details",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "certification",
      title: "Certification awarded",
      type: "string",
      group: "details",
      description:
        "State only what Nestra Klinikal actually awards. Do not name an external accreditation unless it is documented.",
    }),
    defineField({
      name: "requiresSupervisedHours",
      title: "Requires supervised practical hours before certification",
      type: "boolean",
      group: "details",
      initialValue: false,
      description:
        "Turn on for programmes such as Phlebotomy where certification depends on completing supervised practical hours.",
    }),
    defineField({
      name: "feeNaira",
      title: "Fee (Naira)",
      type: "number",
      group: "details",
      description: "Numbers only, no ₦ sign and no commas. Leave empty to show 'On request'.",
    }),
    defineField({
      name: "feeUsd",
      title: "Fee (US dollars)",
      type: "number",
      group: "details",
      description: "For diaspora enrolments. Numbers only. Leave empty to show 'On request'.",
    }),
    defineField({
      name: "feeNote",
      title: "Note about fees",
      type: "string",
      group: "details",
      description: "Optional, e.g. Instalment plans available.",
    }),
    defineField({
      name: "featured",
      title: "Show on the home page",
      type: "boolean",
      group: "details",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      group: "details",
      description: "Lower numbers appear first.",
      initialValue: 100,
    }),

    defineField({
      name: "seoTitle",
      title: "Search engine title",
      type: "string",
      group: "seo",
      description: "Leave empty to use the programme name.",
    }),
    defineField({
      name: "seoDescription",
      title: "Search engine description",
      type: "text",
      rows: 2,
      group: "seo",
      description: "Leave empty to use the short summary.",
    }),
  ],
  orderings: [
    {
      title: "Sort order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "heroImage" },
  },
});
