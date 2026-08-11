"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ConsentCheckbox, Field } from "@/components/ui/field";
import { Input, Select, Textarea } from "@/components/ui/input";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { useLeadSubmit } from "@/features/leads/use-lead-submit";
import {
  ORGANISATION_SIZES,
  corporateEnquirySchema,
  type CorporateEnquiryValues,
  type LeadType,
} from "@/lib/validations/lead";

/**
 * Shared by the corporate and partnership routes. Both capture the same shape —
 * who is asking, how big they are, and what they need.
 */
export function OrganisationEnquiryForm({
  leadType,
  heading,
  description,
  submitLabel,
  messageLabel,
  messageHint,
  whatsappNumber,
  whatsappMessage,
}: {
  leadType: Extract<LeadType, "corporate" | "partnership">;
  heading: string;
  description: string;
  submitLabel: string;
  messageLabel: string;
  messageHint?: string;
  whatsappNumber: string;
  whatsappMessage: string;
}) {
  const { submit, isSubmitting, isSuccess } = useLeadSubmit();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CorporateEnquiryValues>({
    resolver: zodResolver(corporateEnquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      organisation: "",
      organisationSize: undefined,
      message: "",
      consentGiven: false,
    },
  });

  const consentGiven = watch("consentGiven");

  const onSubmit = handleSubmit(async (values) => {
    await submit({ ...values, leadType });
  });

  if (isSuccess) {
    return (
      <div
        role="status"
        className="flex flex-col gap-4 rounded-xl border border-accent/30 bg-accent/5 p-6 sm:p-8"
        data-testid="organisation-success"
      >
        <CheckCircle2 className="size-8 text-accent" aria-hidden="true" />
        <div>
          <h3 className="text-lg font-bold">Enquiry received</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Thank you. We will review what you have told us and come back to you with a proposed
            approach. If it is urgent, message us on WhatsApp.
          </p>
        </div>
        <WhatsAppButton
          number={whatsappNumber}
          message={whatsappMessage}
          context={`${leadType}-success`}
          label="Continue on WhatsApp"
        />
      </div>
    );
  }

  const prefix = leadType;

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 sm:p-8"
      noValidate
      data-testid="organisation-form"
    >
      <div>
        <h2 className="text-display-sm">{heading}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" htmlFor={`${prefix}-name`} required error={errors.name?.message}>
          <Input autoComplete="name" {...register("name")} />
        </Field>

        <Field
          label="Work email"
          htmlFor={`${prefix}-email`}
          required
          error={errors.email?.message}
        >
          <Input type="email" inputMode="email" autoComplete="email" {...register("email")} />
        </Field>

        <Field label="Phone or WhatsApp" htmlFor={`${prefix}-phone`} error={errors.phone?.message}>
          <Input type="tel" inputMode="tel" autoComplete="tel" {...register("phone")} />
        </Field>

        <Field
          label="Organisation"
          htmlFor={`${prefix}-organisation`}
          required
          error={errors.organisation?.message}
        >
          <Input autoComplete="organization" {...register("organisation")} />
        </Field>
      </div>

      <Field
        label="Organisation size"
        htmlFor={`${prefix}-size`}
        required
        error={errors.organisationSize?.message}
      >
        <Select defaultValue="" {...register("organisationSize")}>
          <option value="" disabled>
            Choose the closest size
          </option>
          {ORGANISATION_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        label={messageLabel}
        htmlFor={`${prefix}-message`}
        required
        hint={messageHint}
        error={errors.message?.message}
      >
        <Textarea rows={5} {...register("message")} />
      </Field>

      {/* Honeypot */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor={`${prefix}-company-website`}>Company website</label>
        <input id={`${prefix}-company-website`} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <ConsentCheckbox
        id={`${prefix}-consent`}
        checked={consentGiven}
        error={errors.consentGiven?.message}
        onCheckedChange={(checked) => setValue("consentGiven", checked, { shouldValidate: true })}
      >
        Nestra Klinikal may contact me about this enquiry and related services. I can withdraw
        consent at any time.
      </ConsentCheckbox>

      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" />
            Sending
          </>
        ) : (
          submitLabel
        )}
      </Button>
    </form>
  );
}
