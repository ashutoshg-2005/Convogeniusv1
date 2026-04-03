import { expect, test } from "@playwright/test";

test("sign-in page loads", async ({ page }) => {
  await page.goto("/sign-in");

  await expect(page.getByText(/Welcome to ConvoGenius/i)).toBeVisible();
});
