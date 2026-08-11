"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

import type { Faq } from "@/types/content";

export function Faqs({ faqs }: { faqs: Faq[] }) {
  return (
    <Accordion.Root type="single" collapsible className="divide-y divide-border border-y border-border">
      {faqs.map((faq) => (
        <Accordion.Item key={faq._id} value={faq._id}>
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-start justify-between gap-4 py-5 text-left font-semibold transition-colors hover:text-accent">
              {faq.question}
              <Plus
                className="mt-0.5 size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-45"
                aria-hidden="true"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <p className="pb-5 pr-10 text-[0.9375rem] leading-relaxed text-muted-foreground">
              {faq.answer}
            </p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
