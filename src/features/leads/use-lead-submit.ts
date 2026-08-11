"use client";

import { useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

import { track } from "@/lib/analytics";
import { readUtmParams } from "@/lib/analytics";
import type { LeadType } from "@/lib/validations/lead";

type SubmitArgs = {
  email: string;
  name?: string;
  phone?: string;
  organisation?: string;
  organisationSize?: string;
  message?: string;
  leadType: LeadType;
  programmeId?: string;
  programmeTitle?: string;
  consentGiven: boolean;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

/**
 * Posts a lead and surfaces the outcome. Every submission resolves to a visible
 * state — a toast plus a persistent success panel — because a silent success is
 * indistinguishable from a broken form.
 */
export function useLeadSubmit() {
  const pathname = usePathname();
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submit = useCallback(
    async (args: SubmitArgs): Promise<boolean> => {
      setState("submitting");
      setErrorMessage(null);

      try {
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...args,
            sourcePage: pathname,
            utm: readUtmParams(),
          }),
        });

        const data = (await response.json().catch(() => null)) as
          | { ok: boolean; error?: string; stored?: boolean }
          | null;

        if (!response.ok || !data?.ok) {
          const message =
            data?.error ?? "We could not save your details. Please try again in a moment.";
          setState("error");
          setErrorMessage(message);
          toast.error(message);
          return false;
        }

        setState("success");
        track("lead_submitted", { leadType: args.leadType, sourcePage: pathname });
        track("form_submitted", { leadType: args.leadType });
        if (args.leadType === "application") {
          track("application_started", { programme: args.programmeTitle ?? "unknown" });
        }
        toast.success("Thank you — we have your details.");
        return true;
      } catch {
        const message =
          "We could not reach the server. Please check your connection, or message us on WhatsApp.";
        setState("error");
        setErrorMessage(message);
        toast.error(message);
        return false;
      }
    },
    [pathname],
  );

  const reset = useCallback(() => {
    setState("idle");
    setErrorMessage(null);
  }, []);

  return {
    submit,
    reset,
    state,
    errorMessage,
    isSubmitting: state === "submitting",
    isSuccess: state === "success",
  };
}
