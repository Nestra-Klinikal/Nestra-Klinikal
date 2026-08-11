"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";

import { Logo, Wordmark } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/types/content";

const NAV_LINKS = [
  { href: "/programmes", label: "Programmes" },
  { href: "/corporate", label: "Corporate" },
  { href: "/partnerships", label: "Partnerships" },
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // The server cannot know the viewer's theme, so the icon is only rendered
  // after mount to avoid a hydration mismatch.
  useEffect(() => setMounted(true), []);

  return (
    <button
      type="button"
      aria-label={
        mounted && resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
    >
      {mounted && resolvedTheme === "dark" ? (
        <Sun className="size-4" aria-hidden="true" />
      ) : (
        <Moon className="size-4" aria-hidden="true" />
      )}
    </button>
  );
}

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Prevent the page behind the mobile menu from scrolling.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const announcement =
    settings.announcementEnabled && settings.announcementText ? settings.announcementText : null;

  return (
    <>
      {announcement ? (
        <div className="bg-brand text-brand-foreground">
          <div className="container flex min-h-10 items-center justify-center gap-2 py-2 text-center text-[0.8125rem]">
            {settings.announcementLink ? (
              <Link href={settings.announcementLink} className="underline underline-offset-4">
                {announcement}
              </Link>
            ) : (
              <span>{announcement}</span>
            )}
          </div>
        </div>
      ) : null}

      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between gap-4 lg:h-18">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo className="size-9" />
            <Wordmark />
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    // min-height keeps the hit area at the 24px minimum even
                    // though these only render on wide screens.
                    "flex min-h-11 items-center rounded-md px-3 text-sm font-medium transition-colors",
                    active
                      ? "text-accent"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/programmes">Enrol now</Link>
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex size-9 items-center justify-center rounded-md border border-border lg:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-background lg:hidden"
        >
          <nav className="container flex flex-col py-4" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-b border-border py-4 text-lg font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Button asChild size="lg" className="mt-6">
              <Link href="/programmes">Enrol now</Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </>
  );
}
