"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ConsentCheckbox, Field } from "@/components/ui/field";
import { Input, Textarea } from "@/components/ui/input";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { useLeadSubmit } from "@/features/leads/use-lead-submit";
import { programmeEnquirySchema, type ProgrammeEnquiryValues } from "@/lib/validations/lead";
import { programmeApplicationMessage } from "@/lib/whatsapp";

export function ProgrammeEnquiryForm({
  programmeId,
  programmeTitle,
  whatsappNumber,
}: {
  programmeId: string;
  programmeTitle: string;
  whatsappNumber: string;
}) {
  const { submit, isSubmitting, isSuccess } = useLeadSubmit();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProgrammeEnquiryValues>({
    resolver: zodResolver(programmeEnquirySchema),
    defaultValues: { name: "", email: "", phone: "", message: "", consentGiven: false },
  });

  const consentGiven = watch("consentGiven");

  const onSubmit = handleSubmit(async (values) => {
    await submit({
      ...values,
      leadType: "application",
      // Seed content uses synthetic ids that are not real Sanity documents, so
      // the reference is only sent for genuine CMS records.
      programmeId: programmeId.startsWith("seed-") ? undefined : programmeId,
      programmeTitle,
    });
  });

  if (isSuccess) {
    return (
      <div
        role="status"
        className="flex flex-col gap-4 rounded-xl border border-accent/30 bg-accent/5 p-6"
        data-testid="application-success"
      >
        <CheckCircle2 className="size-8 text-accent" aria-hidden="true" />
        <div>
          <h3 className="text-lg font-bold">Application started</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            We have your details and will be in touch about the next steps for{" "}
            <strong className="text-foreground">{programmeTitle}</strong>. For the fastest response,
            continue the conversation on WhatsApp.
          </p>
        </div>
        <WhatsAppButton
          number={whatsappNumber}
          message={programmeApplicationMessage(programmeTitle)}
          context="application-success"
          label="Continue on WhatsApp"
        />
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6"
      noValidate
      data-testid="application-form"
    >
      <div>
        <h3 className="text-lg font-bold">Apply for this programme</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Send your details and we will confirm fees, the next intake and how to secure a place.
        </p>
      </div>

      <Field label="Full name" htmlFor="enquiry-name" required error={errors.name?.message}>
        <Input autoComplete="name" {...register("name")} />
      </Field>

      <Field label="Email address" htmlFor="enquiry-email" required error={errors.email?.message}>
        <Input type="email" inputMode="email" autoComplete="email" {...register("email")} />
      </Field>

      <Field
        label="Phone or WhatsApp number"
        htmlFor="enquiry-phone"
        error={errors.phone?.message}
        hint="Optional, but it is the fastest way for us to reach you."
      >
        <Input type="tel" inputMode="tel" autoComplete="tel" {...register("phone")} />
      </Field>

      <Field label="Anything you want us to know" htmlFor="enquiry-message" error={errors.message?.message}>
        <Textarea rows={3} {...register("message")} />
      </Field>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="enquiry-company-website">Company website</label>
        <input id="enquiry-company-website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <ConsentCheckbox
        id="enquiry-consent"
        checked={consentGiven}
        error={errors.consentGiven?.message}
        onCheckedChange={(checked) => setValue("consentGiven", checked, { shouldValidate: true })}
      >
        Nestra Klinikal may contact me by email and WhatsApp about this programme and related
        training. I can withdraw consent at any time.
      </ConsentCheckbox>

      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" />
            Sending
          </>
        ) : (
          "Start my application"
        )}
      </Button>
    </form>
  );
}
