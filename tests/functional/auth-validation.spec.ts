import { expect, test } from "@playwright/test";

test("sign-in accepts credential input", async ({ page }) => {
  await page.goto("/sign-in");

  await page.getByLabel("Email").fill("teammate@example.com");
  await page.getByLabel("Password").fill("123");

  await expect(page.getByLabel("Email")).toHaveValue("teammate@example.com");
  await expect(page.getByLabel("Password")).toHaveValue("123");
  await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
});

test("sign-up accepts typed account details", async ({
  page,
}) => {
  await page.goto("/sign-up");

  await page.getByLabel("Name").fill("Teammate");
  await page.getByLabel("Email").fill("teammate@example.com");
  await page.getByLabel("Password", { exact: true }).fill("secret123");
  await page.getByLabel("Confirm Password", { exact: true }).fill("secret123");

  await expect(page.getByLabel("Name")).toHaveValue("Teammate");
  await expect(page.getByLabel("Email")).toHaveValue("teammate@example.com");
  await expect(page.getByLabel("Password", { exact: true })).toHaveValue("secret123");
  await expect(page.getByLabel("Confirm Password", { exact: true })).toHaveValue("secret123");
  await expect(page.getByRole("button", { name: "Sign Up" })).toBeVisible();
});

test("auth pages expose cross-links to each other", async ({ page }) => {
  await page.goto("/sign-in");

  await expect(page.locator('a[href="/sign-up"]')).toBeVisible();
  await expect(page.locator('a[href="/sign-up"]')).toHaveAttribute("href", "/sign-up");

  await page.goto("/sign-up");
  await expect(page.locator('a[href="/sign-in"]')).toBeVisible();
  await expect(page.locator('a[href="/sign-in"]')).toHaveAttribute("href", "/sign-in");
});
