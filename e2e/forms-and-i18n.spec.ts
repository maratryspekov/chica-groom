import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Mock API to avoid backend dependencies
  await page.route("**/api/**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    });
  });
});

test("booking form submits", async ({ page }) => {
  await page.goto("/");

  const booking = page.locator("#booking");
  await expect(booking).toBeVisible();

  // Fill ALL required fields
  await booking.locator("#email").fill("marat@example.com");
  await booking.locator("#phone").fill("+49123456789");
  await booking.locator("#ownerName").fill("Marat");
  await booking.locator("#dogName").fill("Sharik");
  await booking.locator("#dogBreed").fill("Labrador");
  await booking.locator("#dogWeight").fill("25");
  await booking.locator("#dogAge").fill("3");

  // Check privacy consent checkbox if present
  const consent = booking.getByLabel(/privacy|datenschutz|agree/i);
  if ((await consent.count()) > 0) await consent.check();

  // Submit button
  const submit = booking.locator('button[type="submit"]');

  // Wait for successful API response
  const responsePromise = page.waitForResponse(
    (resp) => resp.url().includes("/api/") && resp.status() === 200,
  );

  await submit.click();
  await responsePromise;

  // Verify success message appears
  const successMessage = booking.getByTestId("success-message");
  await expect(successMessage).toBeVisible({ timeout: 5000 });

  // Verify form is cleared
  await expect(booking.locator("#ownerName")).toHaveValue("");
  await expect(booking.locator("#dogName")).toHaveValue("");
  await expect(booking.locator("#email")).toHaveValue("");
});

test("language switch works", async ({ page }) => {
  await page.goto("/");

  const booking = page.locator("#booking");
  await expect(booking).toBeVisible();

  // Switch to English
  await page.getByRole("button", { name: "Switch to English" }).click();
  await page.waitForTimeout(300); // Wait for language to apply

  // Check specific form labels (within booking) - avoids strict mode
  const ownerLabel = booking.locator('label[for="ownerName"]');
  const dogLabel = booking.locator('label[for="dogName"]');

  await expect(ownerLabel).toContainText("Owner's Name", { timeout: 5000 });
  await expect(dogLabel).toContainText("Dog's Name");

  // Switch to Russian
  await page.getByRole("button", { name: "Switch to Russian" }).click();
  await page.waitForTimeout(300); // Wait for language to apply

  // Verify Russian translations
  await expect(ownerLabel).toContainText("Имя владельца", { timeout: 5000 });
  await expect(dogLabel).toContainText("Имя собаки");
});
