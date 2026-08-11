import { defineField, defineType } from "sanity";
import { CalendarDays } from "lucide-react";

/** A dated cohort. Opening an intake surfaces it everywhere dates are shown. */
export const intake = defineType({
  name: "intake",
  title: "Intake",
  type: "document",
  icon: CalendarDays,
  fields: [
    defineField({
      name: "programme",
      title: "Programme",
      type: "reference",
      to: [{ type: "programme" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "startDate",
      title: "Start date",
      type: "date",
      options: { dateFormat: "DD MMMM YYYY" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "applicationDeadline",
      title: "Application deadline",
      type: "date",
      options: { dateFormat: "DD MMMM YYYY" },
    }),
    defineField({
      name: "mode",
      title: "Delivery mode for this intake",
      type: "string",
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
      name: "location",
      title: "Location",
      type: "string",
      description: "Only needed for in-person or blended intakes.",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "open",
      options: {
        list: [
          { title: "Open for applications", value: "open" },
          { title: "Filling fast", value: "filling" },
          { title: "Closed", value: "closed" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seatsNote",
      title: "Note about places",
      type: "string",
      description: "Optional, e.g. Limited places.",
    }),
  ],
  orderings: [
    {
      title: "Start date",
      name: "startAsc",
      by: [{ field: "startDate", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "programme.title", subtitle: "startDate", status: "status" },
    prepare({ title, subtitle, status }) {
      return {
        title: title ?? "Intake",
        subtitle: [subtitle, status].filter(Boolean).join(" · "),
      };
    },
  },
});
