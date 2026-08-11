"use client";

import { MessageCircle } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type WhatsAppButtonProps = {
  number: string;
  message: string;
  label?: string;
  context?: string;
  className?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
};

/**
 * Every WhatsApp entry point on the site goes through this component, so no tap
 * can be made without also firing the analytics event that measures it.
 */
export function WhatsAppButton({
  number,
  message,
  label = "Chat on WhatsApp",
  context = "unknown",
  className,
  variant = "whatsapp",
  size = "default",
}: WhatsAppButtonProps) {
  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={className}
      onClick={() => track("whatsapp_click", { context })}
    >
      <a
        href={whatsappLink(number, message)}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="whatsapp-link"
      >
        <MessageCircle aria-hidden="true" />
        {label}
      </a>
    </Button>
  );
}

/** The persistent floating button. Present on every page. */
export function WhatsAppFloatingButton({
  number,
  message,
}: {
  number: string;
  message: string;
}) {
  return (
    <a
      href={whatsappLink(number, message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      data-testid="whatsapp-fab"
      onClick={() => track("whatsapp_click", { context: "floating-button" })}
      className={cn(
        "fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full",
        "bg-[#25D366] text-[#062f16] shadow-lg shadow-[#25D366]/30",
        "transition-transform hover:scale-105 active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
    >
      <MessageCircle className="size-7" aria-hidden="true" />
    </a>
  );
}
