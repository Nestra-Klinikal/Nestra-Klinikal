import { defineArrayMember, defineField, defineType } from "sanity";
import { Building2, HelpCircle, Newspaper, Quote, Users } from "lucide-react";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: Quote,
  fields: [
    defineField({
      name: "name",
      title: "Person's name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role and organisation",
      type: "string",
      description: "For example: Deputy Director, University of Abuja Teaching Hospital.",
    }),
    defineField({
      name: "cohort",
      title: "Cohort or programme",
      type: "string",
      description: "For example: Cohort 1 QMS/QA Class.",
    }),
    defineField({
      name: "quote",
      title: "What they said",
      type: "text",
      rows: 8,
      description:
        "Use their real words. Never edit a quote in a way that changes its meaning, and never publish one you did not receive.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Image description", type: "string" })],
    }),
    defineField({
      name: "consentOnFile",
      title: "Written permission to publish is on file",
      type: "boolean",
      initialValue: false,
      description: "Tick only when you hold the person's permission to publish this.",
    }),
    defineField({
      name: "featured",
      title: "Show on the home page",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "order", title: "Sort order", type: "number", initialValue: 100 }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  icon: Users,
  fields: [
    defineField({
      name: "name",
      title: "Full name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "group",
      title: "Group",
      type: "string",
      options: {
        list: [
          { title: "Leadership", value: "leadership" },
          { title: "Faculty", value: "faculty" },
          { title: "Operations", value: "operations" },
        ],
        layout: "radio",
      },
      initialValue: "faculty",
    }),
    defineField({ name: "bio", title: "Short biography", type: "text", rows: 5 }),
    defineField({
      name: "credentials",
      title: "Credentials",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description: "For example: BMLS, MSc Quality Management.",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Image description", type: "string" })],
    }),
    defineField({ name: "linkedin", title: "LinkedIn link", type: "url" }),
    defineField({ name: "order", title: "Sort order", type: "number", initialValue: 100 }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});

export const partner = defineType({
  name: "partner",
  title: "Partner institution",
  type: "document",
  icon: Building2,
  fields: [
    defineField({
      name: "name",
      title: "Institution name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "kind",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Private training centre", value: "private" },
          { title: "State institution", value: "state" },
          { title: "Federal institution", value: "federal" },
          { title: "Corporate", value: "corporate" },
        ],
      },
    }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      fields: [defineField({ name: "alt", title: "Image description", type: "string" })],
    }),
    defineField({ name: "order", title: "Sort order", type: "number", initialValue: 100 }),
  ],
  preview: { select: { title: "name", subtitle: "location", media: "logo" } },
});

export const faq = defineType({
  name: "faq",
  title: "Frequently asked question",
  type: "document",
  icon: HelpCircle,
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "topic",
      title: "Topic",
      type: "string",
      options: {
        list: [
          { title: "General", value: "general" },
          { title: "Programmes", value: "programmes" },
          { title: "Fees and payment", value: "fees" },
          { title: "Certification", value: "certification" },
          { title: "Corporate and partnerships", value: "corporate" },
        ],
      },
      initialValue: "general",
    }),
    defineField({ name: "order", title: "Sort order", type: "number", initialValue: 100 }),
  ],
  preview: { select: { title: "question", subtitle: "topic" } },
});

export const post = defineType({
  name: "post",
  title: "Article",
  type: "document",
  icon: Newspaper,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Short summary",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(280),
    }),
    defineField({
      name: "publishedAt",
      title: "Publish date",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Image description", type: "string" })],
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "teamMember" }],
    }),
    defineField({
      name: "body",
      title: "Article",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({ type: "image", options: { hotspot: true } }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: { select: { title: "title", subtitle: "publishedAt", media: "coverImage" } },
});
