import { expect, test } from "@playwright/test";

const LEAD_ENDPOINT = "**/api/leads";
const PROGRAMME_PATH = "/programmes/quality-management-systems-quality-assurance";
const PROGRAMME_TITLE = "Quality Management Systems & Quality Assurance";

test.describe("Programme application", () => {
  test("submits an application and confirms it against the named programme", async ({ page }) => {
    const requests: Array<Record<string, unknown>> = [];

    await page.route(LEAD_ENDPOINT, async (route) => {
      requests.push(route.request().postDataJSON());
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, stored: true }),
      });
    });

    await page.goto(PROGRAMME_PATH);

    const form = page.getByTestId("application-form");
    await form.scrollIntoViewIfNeeded();

    await form.locator("#enquiry-name").fill("Chidi Okonkwo");
    await form.locator("#enquiry-email").fill("chidi.okonkwo@example.com");
    await form.locator("#enquiry-phone").fill("08131253352");
    await form.locator("#enquiry-consent").check();
    await form.getByRole("button", { name: /start my application/i }).click();

    await expect(page.getByTestId("application-success")).toBeVisible();

    expect(requests).toHaveLength(1);
    expect(requests[0]).toMatchObject({
      name: "Chidi Okonkwo",
      email: "chidi.okonkwo@example.com",
      leadType: "application",
      programmeTitle: PROGRAMME_TITLE,
      consentGiven: true,
      sourcePage: PROGRAMME_PATH,
    });
  });

  test("blocks submission when required fields are missing", async ({ page }) => {
    let called = false;
    await page.route(LEAD_ENDPOINT, async (route) => {
      called = true;
      await route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
    });

    await page.goto(PROGRAMME_PATH);

    const form = page.getByTestId("application-form");
    await form.scrollIntoViewIfNeeded();
    await form.getByRole("button", { name: /start my application/i }).click();

    await expect(form.getByText(/enter your full name/i)).toBeVisible();
    await expect(form.getByText(/enter your email address/i)).toBeVisible();
    expect(called).toBe(false);
  });

  test("submits a corporate enquiry with organisation details", async ({ page }) => {
    const requests: Array<Record<string, unknown>> = [];
    await page.route(LEAD_ENDPOINT, async (route) => {
      requests.push(route.request().postDataJSON());
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, stored: true }),
      });
    });

    await page.goto("/corporate");

    const form = page.getByTestId("organisation-form");
    await form.scrollIntoViewIfNeeded();

    await form.locator("#corporate-name").fill("Amina Bello");
    await form.locator("#corporate-email").fill("amina.bello@example.org");
    await form.locator("#corporate-organisation").fill("Federal Medical Centre");
    await form.locator("#corporate-size").selectOption("51–200 staff");
    await form
      .locator("#corporate-message")
      .fill("We are preparing our medical laboratory for ISO 15189 assessment next year.");
    await form.locator("#corporate-consent").check();
    await form.getByRole("button", { name: /send enquiry/i }).click();

    await expect(page.getByTestId("organisation-success")).toBeVisible();

    expect(requests[0]).toMatchObject({
      leadType: "corporate",
      organisation: "Federal Medical Centre",
      organisationSize: "51–200 staff",
      consentGiven: true,
    });
  });

  test("filters programmes through the URL so a filtered view can be shared", async ({ page }) => {
    await page.goto("/programmes");

    await page.getByRole("button", { name: "Specialist / Practical", exact: true }).click();

    await expect(page).toHaveURL(/category=specialist/);
    await expect(page.getByRole("heading", { name: /phlebotomy certification/i })).toBeVisible();
  });
});
