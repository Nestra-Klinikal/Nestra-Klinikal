"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "nk_email_modal_seen";
const SCROLL_TRIGGER_RATIO = 0.45;

/**
 * The modal body — and the form libraries it pulls in — is only imported once
 * the modal is actually going to be shown. Nothing here is on the critical path
 * for first paint, which matters on a throttled mobile connection.
 */
const EmailCaptureModalBody = dynamic(
  () => import("./email-capture-modal-body").then((m) => m.EmailCaptureModalBody),
  { ssr: false },
);

/**
 * Routes whose primary conversion action is a form of their own. The modal
 * stays out of the way there — interrupting someone who is already filling in
 * an application costs more than an address is worth.
 */
const SUPPRESSED_PREFIXES = ["/contact", "/corporate", "/partnerships", "/programmes/", "/studio"];

/**
 * Shown once per visitor, on scroll depth or exit intent, whichever comes
 * first. The dismissal is remembered so the modal never becomes an obstacle for
 * someone returning to the site.
 */
export function EmailCaptureModal() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  const suppressedRoute = SUPPRESSED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  useEffect(() => {
    try {
      setDismissed(window.localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      // Private browsing can block storage; treat that as already dismissed
      // rather than showing the modal on every scroll.
      setDismissed(true);
    }
  }, []);

  const remember = useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Nothing to do — the modal simply will not be suppressed next visit.
    }
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setDismissed(true);
    remember();
  }, [remember]);

  useEffect(() => {
    if (dismissed || suppressedRoute) return;

    // Never open over a capture form the visitor can already see — two asks on
    // screen at once reads as pressure and blocks the one they chose.
    const formInView = () =>
      Array.from(document.querySelectorAll("form")).some((form) => {
        const rect = form.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      });

    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (total > 0 && scrolled / total > SCROLL_TRIGGER_RATIO && !formInView()) {
        setOpen(true);
      }
    };

    const onMouseOut = (event: MouseEvent) => {
      if (!event.relatedTarget && event.clientY <= 0) setOpen(true);
    };

    // Someone already typing into a form is converting by another route. Stand
    // down rather than interrupt them.
    const onFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("form")) {
        setDismissed(true);
        remember();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseout", onMouseOut);
    document.addEventListener("focusin", onFocusIn);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [dismissed, suppressedRoute, remember]);

  if (!open || suppressedRoute) return null;

  return <EmailCaptureModalBody onClose={close} />;
}
