"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, FileText, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ConsentCheckbox, Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLeadSubmit } from "@/features/leads/use-lead-submit";
import { newsletterFormSchema, type NewsletterFormValues } from "@/lib/validations/lead";

/**
 * The gated guide. The download only appears after the address is captured,
 * which is the point — but the gate is honest about what it is asking for.
 */
export function LeadMagnet({
  title,
  description,
  fileUrl,
  fileLabel = "Download the guide",
}: {
  title: string;
  description: string;
  fileUrl: string;
  fileLabel?: string;
}) {
  const { submit, isSubmitting } = useLeadSubmit();
  const [unlocked, setUnlocked] = useState(false);

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
    const ok = await submit({
      email: values.email,
      consentGiven: values.consentGiven,
      leadType: "lead-magnet",
    });
    if (ok) setUnlocked(true);
  });

  return (
    <div
      className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6 sm:p-8"
      data-testid="lead-magnet"
    >
      <span className="flex size-12 items-center justify-center rounded-lg bg-accent/10">
        <FileText className="size-6 text-accent" aria-hidden="true" />
      </span>

      <div>
        <h2 className="text-display-sm">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>

      {unlocked ? (
        <div role="status" className="flex flex-col gap-4">
          <p className="text-sm font-medium text-accent">
            Thank you — your guide is ready.
          </p>
          <Button asChild size="lg">
            <a href={fileUrl} download data-testid="lead-magnet-download">
              <Download aria-hidden="true" />
              {fileLabel}
            </a>
          </Button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
          <Field
            label="Email address"
            htmlFor="lead-magnet-email"
            required
            hint="We will send the guide here and let you know about new intakes."
            error={errors.email?.message}
          >
            <Input type="email" inputMode="email" autoComplete="email" {...register("email")} />
          </Field>

          <ConsentCheckbox
            id="lead-magnet-consent"
            checked={consentGiven}
            error={errors.consentGiven?.message}
            onCheckedChange={(checked) =>
              setValue("consentGiven", checked, { shouldValidate: true })
            }
          >
            Nestra Klinikal may email me the guide and information about training programmes. I can
            unsubscribe at any time.
          </ConsentCheckbox>

          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" aria-hidden="true" />
                Preparing
              </>
            ) : (
              <>
                <Download aria-hidden="true" />
                Get the guide
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
