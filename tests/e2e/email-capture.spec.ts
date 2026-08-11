import { expect, test } from "@playwright/test";

/**
 * Email capture is the flow the business depends on most, so it is tested at
 * the boundary that matters: what the visitor types, and what they see back.
 *
 * The lead API is intercepted rather than hitting a real Sanity project, so the
 * suite runs anywhere without credentials.
 */

const LEAD_ENDPOINT = "**/api/leads";

test.describe("Email capture", () => {
  test("captures an address from the hero form and confirms it visibly", async ({ page }) => {
    const requests: Array<Record<string, unknown>> = [];

    await page.route(LEAD_ENDPOINT, async (route) => {
      requests.push(route.request().postDataJSON());
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, stored: true }),
      });
    });

    await page.goto("/");

    await page.locator("#hero-newsletter-email").fill("kemi.adeyemi@example.com");
    await page.locator("#hero-newsletter-consent").check();
    await page.getByRole("button", { name: /send me intake dates/i }).first().click();

    // A visible success state, not a silent success.
    await expect(page.getByText("Thank you").first()).toBeVisible();

    expect(requests).toHaveLength(1);
    expect(requests[0]).toMatchObject({
      email: "kemi.adeyemi@example.com",
      consentGiven: true,
      leadType: "newsletter",
      sourcePage: "/",
    });
  });

  test("refuses to submit without consent", async ({ page }) => {
    let called = false;
    await page.route(LEAD_ENDPOINT, async (route) => {
      called = true;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.goto("/");

    await page.locator("#hero-newsletter-email").fill("no.consent@example.com");
    await page.getByRole("button", { name: /send me intake dates/i }).first().click();

    await expect(page.getByText(/please tick the box/i).first()).toBeVisible();
    expect(called).toBe(false);
  });

  test("rejects a malformed email address before sending", async ({ page }) => {
    let called = false;
    await page.route(LEAD_ENDPOINT, async (route) => {
      called = true;
      await route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
    });

    await page.goto("/");

    await page.locator("#hero-newsletter-email").fill("not-an-email");
    await page.locator("#hero-newsletter-consent").check();
    await page.getByRole("button", { name: /send me intake dates/i }).first().click();

    await expect(page.getByText(/enter a valid email address/i).first()).toBeVisible();
    expect(called).toBe(false);
  });

  test("carries UTM parameters through to the lead", async ({ page }) => {
    const requests: Array<Record<string, unknown>> = [];
    await page.route(LEAD_ENDPOINT, async (route) => {
      requests.push(route.request().postDataJSON());
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, stored: true }),
      });
    });

    await page.goto("/?utm_source=whatsapp&utm_medium=broadcast&utm_campaign=jan-intake");

    await page.locator("#hero-newsletter-email").fill("utm.test@example.com");
    await page.locator("#hero-newsletter-consent").check();
    await page.getByRole("button", { name: /send me intake dates/i }).first().click();

    await expect(page.getByText("Thank you").first()).toBeVisible();
    expect(requests[0]).toMatchObject({
      utm: {
        utm_source: "whatsapp",
        utm_medium: "broadcast",
        utm_campaign: "jan-intake",
      },
    });
  });

  test("unlocks the guide download only after an address is captured", async ({ page }) => {
    await page.route(LEAD_ENDPOINT, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, stored: true }),
      });
    });

    await page.goto("/");

    const magnet = page.getByTestId("lead-magnet");
    await magnet.scrollIntoViewIfNeeded();

    await expect(page.getByTestId("lead-magnet-download")).toHaveCount(0);

    await magnet.locator("#lead-magnet-email").fill("guide.reader@example.com");
    await magnet.locator("#lead-magnet-consent").check();
    await magnet.getByRole("button", { name: /get the guide/i }).click();

    const download = page.getByTestId("lead-magnet-download");
    await expect(download).toBeVisible();
    await expect(download).toHaveAttribute(
      "href",
      "/guides/nestra-klinikal-programme-guide.pdf",
    );
  });

  test("surfaces a server failure instead of pretending it worked", async ({ page }) => {
    await page.route(LEAD_ENDPOINT, async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ ok: false, error: "We could not save your details just now." }),
      });
    });

    await page.goto("/");

    await page.locator("#hero-newsletter-email").fill("server.error@example.com");
    await page.locator("#hero-newsletter-consent").check();
    await page.getByRole("button", { name: /send me intake dates/i }).first().click();

    await expect(page.getByText(/could not save your details/i).first()).toBeVisible();
  });
});
