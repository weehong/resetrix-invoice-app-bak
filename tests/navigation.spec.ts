import { expect, test } from "@playwright/test";

test.describe("Navigation and Layout", () => {
  test.beforeEach(async ({ page }) => {
    // Sign in before each test
    await page.goto("/signin");
    await page.getByLabel("Username or Email").fill("test@resetrix.com");
    await page.getByLabel("Password").fill("password123");
    await page.getByRole("button", { name: "Sign in" }).click();
  });

  test("should display navigation menu", async ({ page }) => {
    await expect(page.getByRole("navigation")).toBeVisible();
  });

  test("should navigate to dashboard", async ({ page }) => {
    await page.getByRole("link", { name: "Dashboard" }).click();
    await expect(page).toHaveURL("/dashboard");
  });

  test("should navigate to invoices", async ({ page }) => {
    await page.getByRole("link", { name: "Invoices" }).click();
    await expect(page).toHaveURL("/invoices");
  });

  test("should navigate to profile", async ({ page }) => {
    await page.getByRole("link", { name: "Profile" }).click();
    await expect(page).toHaveURL("/profile");
  });

  test("should navigate to settings", async ({ page }) => {
    await page.getByRole("link", { name: "Settings" }).click();
    await expect(page).toHaveURL("/settings");
  });

  test("should sign out when clicking sign out button", async ({ page }) => {
    await page.getByRole("button", { name: "Sign out" }).click();
    await expect(page).toHaveURL("/signin");
  });

  test("should be responsive on mobile viewport", async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });

    // Check if mobile menu button is visible
    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();

    // Open mobile menu
    await page.getByRole("button", { name: "Open menu" }).click();

    // Check if navigation links are visible in mobile menu
    await expect(page.getByRole("link", { name: "Dashboard" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Invoices" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Profile" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Settings" })).toBeVisible();
  });
});
