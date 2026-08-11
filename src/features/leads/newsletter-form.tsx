"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConsentCheckbox } from "@/components/ui/field";
import { useLeadSubmit } from "@/features/leads/use-lead-submit";
import {
  newsletterFormSchema,
  type LeadType,
  type NewsletterFormValues,
} from "@/lib/validations/lead";
import { cn } from "@/lib/utils";

type NewsletterFormProps = {
  leadType?: LeadType;
  tone?: "light" | "dark";
  submitLabel?: string;
  successMessage?: string;
  className?: string;
  idPrefix?: string;
};

export function NewsletterForm({
  leadType = "newsletter",
  tone = "light",
  submitLabel = "Get programme updates",
  successMessage = "You are on the list. We will send you intake dates and programme news.",
  className,
  idPrefix = "newsletter",
}: NewsletterFormProps) {
  const { submit, isSubmitting, isSuccess } = useLeadSubmit();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: { email: "", consentGiven: false },
  });

  const consentGiven = watch("consentGiven");

  const onSubmit = handleSubmit(async (values) => {
    await submit({
      email: values.email,
      consentGiven: values.consentGiven,
      leadType,
    });
  });

  if (isSuccess) {
    return (
      <div
        role="status"
        className={cn(
          "flex items-start gap-3 rounded-lg border p-4",
          tone === "dark"
            ? "border-accent/30 bg-accent/10 text-brand-foreground"
            : "border-accent/30 bg-accent/5 text-foreground",
          className,
        )}
      >
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
        <div>
          <p className="font-semibold">Thank you</p>
          <p
            className={cn(
              "mt-1 text-sm",
              tone === "dark" ? "text-brand-foreground/75" : "text-muted-foreground",
            )}
          >
            {successMessage}
          </p>
        </div>
      </div>
    );
  }

  const emailId = `${idPrefix}-email`;
  const consentId = `${idPrefix}-consent`;

  return (
    <form onSubmit={onSubmit} className={cn("flex flex-col gap-3", className)} noValidate>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <label htmlFor={emailId} className="sr-only">
            Email address
          </label>
          <Input
            id={emailId}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Your email address"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${emailId}-error` : undefined}
            className={cn(
              tone === "dark" && "border-white/20 bg-white/10 text-white placeholder:text-white/50",
            )}
            {...register("email")}
          />
        </div>
        <Button type="submit" disabled={isSubmitting} className="shrink-0">
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" />
              Sending
            </>
          ) : (
            submitLabel
          )}
        </Button>
      </div>

      {errors.email ? (
        <p
          id={`${emailId}-error`}
          className={cn(
            "text-xs font-medium",
            tone === "dark" ? "text-red-300" : "text-destructive",
          )}
        >
          {errors.email.message}
        </p>
      ) : null}

      <ConsentCheckbox
        id={consentId}
        checked={consentGiven}
        error={errors.consentGiven?.message}
        onCheckedChange={(checked) =>
          setValue("consentGiven", checked, { shouldValidate: true })
        }
      >
        <span className={tone === "dark" ? "text-brand-foreground/70" : undefined}>
          Yes, Nestra Klinikal may email me about programmes and intake dates. I can unsubscribe at
          any time.
        </span>
      </ConsentCheckbox>
    </form>
  );
}
