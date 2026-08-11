"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

import { NewsletterForm } from "@/features/leads/newsletter-form";

/** The visible modal. Loaded on demand by EmailCaptureModal. */
export function EmailCaptureModalBody({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="email-modal-title"
      data-testid="email-capture-modal"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-md animate-fade-up rounded-xl border border-border bg-background p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="size-4" aria-hidden="true" />
        </button>

        <p className="text-eyebrow font-bold uppercase text-signal">Before you go</p>
        <h2 id="email-modal-title" className="mt-3 text-display-sm">
          Get intake dates before they fill
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Join the professionals who hear first when a new cohort opens. No more than a few emails a
          month, and you can unsubscribe any time.
        </p>

        <NewsletterForm
          className="mt-6"
          idPrefix="modal-newsletter"
          submitLabel="Send me intake dates"
          successMessage="You will hear from us when the next cohort opens."
        />
      </div>
    </div>
  );
}
