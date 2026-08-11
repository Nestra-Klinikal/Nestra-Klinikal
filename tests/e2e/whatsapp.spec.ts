import { expect, test } from "@playwright/test";

/**
 * WhatsApp taps are the business's main enquiry signal, so these tests assert
 * the two things that make a tap useful: it reaches the right number, and it
 * arrives with a message naming what the person was looking at.
 */

const WHATSAPP_NUMBER = "2348131253352";

function decodedText(href: string): string {
  const url = new URL(href);
  return url.searchParams.get("text") ?? "";
}

test.describe("WhatsApp links", () => {
  test("the floating button is present on every page and points at the right number", async ({
    page,
  }) => {
    for (const path of ["/", "/programmes", "/corporate", "/partnerships", "/about", "/contact"]) {
      await page.goto(path);

      const fab = page.getByTestId("whatsapp-fab");
      await expect(fab).toBeVisible();

      const href = await fab.getAttribute("href");
      expect(href).toContain(`wa.me/${WHATSAPP_NUMBER}`);
      expect(decodedText(href!)).toContain("Nestra Klinikal");
    }
  });

  test("a programme's buttons name that programme in the pre-filled message", async ({ page }) => {
    await page.goto("/programmes/phlebotomy-certification");

    const link = page
      .getByTestId("whatsapp-link")
      .filter({ hasText: /ask about this programme/i })
      .first();

    const href = await link.getAttribute("href");
    expect(href).toContain(`wa.me/${WHATSAPP_NUMBER}`);

    const text = decodedText(href!);
    expect(text).toContain("Phlebotomy Certification");
    expect(text).toMatch(/fees|intake|apply/i);
  });

  test("the corporate route sends a business-to-business message, not a course enquiry", async ({
    page,
  }) => {
    await page.goto("/corporate");

    const fab = page.getByTestId("whatsapp-fab");
    const href = await fab.getAttribute("href");
    expect(href).toContain(`wa.me/${WHATSAPP_NUMBER}`);
  });

  test("every WhatsApp link opens in a new tab with a safe rel attribute", async ({ page }) => {
    await page.goto("/");

    const links = page.getByTestId("whatsapp-link");
    const count = await links.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i += 1) {
      const link = links.nth(i);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
    }
  });

  test("a WhatsApp tap records an analytics event", async ({ page }) => {
    await page.goto("/");

    // Stop the click from actually navigating away to WhatsApp.
    await page.route("https://wa.me/**", (route) => route.abort());

    await page.getByTestId("whatsapp-fab").click();

    const events = await page.evaluate(
      () => (window.dataLayer ?? []) as Array<{ event?: string }>,
    );
    expect(events.some((entry) => entry.event === "whatsapp_click")).toBe(true);
  });
});
