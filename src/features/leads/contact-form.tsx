"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ConsentCheckbox, Field } from "@/components/ui/field";
import { Input, Textarea } from "@/components/ui/input";
import { useLeadSubmit } from "@/features/leads/use-lead-submit";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/lead";

export function ContactForm() {
  const { submit, isSubmitting, isSuccess } = useLeadSubmit();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", phone: "", message: "", consentGiven: false },
  });

  const consentGiven = watch("consentGiven");

  const onSubmit = handleSubmit(async (values) => {
    await submit({ ...values, leadType: "contact" });
  });

  if (isSuccess) {
    return (
      <div
        role="status"
        className="flex flex-col gap-3 rounded-xl border border-accent/30 bg-accent/5 p-6 sm:p-8"
        data-testid="contact-success"
      >
        <CheckCircle2 className="size-8 text-accent" aria-hidden="true" />
        <h2 className="text-lg font-bold">Message sent</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Thank you for getting in touch. We aim to reply within one working day. If it is urgent,
          WhatsApp is the fastest way to reach us.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 sm:p-8"
      noValidate
      data-testid="contact-form"
    >
      <h2 className="text-display-sm">Send us a message</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" htmlFor="contact-name" required error={errors.name?.message}>
          <Input autoComplete="name" {...register("name")} />
        </Field>
        <Field label="Email address" htmlFor="contact-email" required error={errors.email?.message}>
          <Input type="email" inputMode="email" autoComplete="email" {...register("email")} />
        </Field>
      </div>

      <Field label="Phone or WhatsApp" htmlFor="contact-phone" error={errors.phone?.message}>
        <Input type="tel" inputMode="tel" autoComplete="tel" {...register("phone")} />
      </Field>

      <Field label="How can we help?" htmlFor="contact-message" required error={errors.message?.message}>
        <Textarea rows={5} {...register("message")} />
      </Field>

      {/* Honeypot */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="contact-company-website">Company website</label>
        <input id="contact-company-website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <ConsentCheckbox
        id="contact-consent"
        checked={consentGiven}
        error={errors.consentGiven?.message}
        onCheckedChange={(checked) => setValue("consentGiven", checked, { shouldValidate: true })}
      >
        Nestra Klinikal may reply to me by email or WhatsApp and contact me about relevant training.
        I can withdraw consent at any time.
      </ConsentCheckbox>

      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" />
            Sending
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
}
