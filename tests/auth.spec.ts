import { expect, test } from "@playwright/test";

test.describe("Authentication", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should redirect to signin page when accessing protected route", async ({
    page,
  }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL("/signin");
  });

  test("should show validation errors for empty signin form", async ({
    page,
  }) => {
    await page.goto("/signin");
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page.getByText("Username or Email is required")).toBeVisible();
    await expect(page.getByText("Password is required")).toBeVisible();
  });

  test("should show error for invalid credentials", async ({ page }) => {
    await page.goto("/signin");

    await page.getByLabel("Username or Email").fill("invalid@example.com");
    await page.getByLabel("Password").fill("wrongpassword");
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(
      page.getByText("Invalid username/email or password"),
    ).toBeVisible();
  });

  test("should redirect to dashboard after successful signin", async ({
    page,
  }) => {
    // This test requires a test user in the database
    await page.goto("/signin");

    await page.getByLabel("Username or Email").fill("test@resetrix.com");
    await page.getByLabel("Password").fill("password123");
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL("/dashboard");
  });

  test("should maintain session after page reload", async ({ page }) => {
    // Sign in first
    await page.goto("/signin");
    await page.getByLabel("Username or Email").fill("test@resetrix.com");
    await page.getByLabel("Password").fill("password123");
    await page.getByRole("button", { name: "Sign in" }).click();

    // Reload the page
    await page.reload();

    // Should still be on dashboard
    await expect(page).toHaveURL("/dashboard");
  });

  test("should redirect to dashboard when accessing auth pages while signed in", async ({
    page,
  }) => {
    // Sign in first
    await page.goto("/signin");
    await page.getByLabel("Username or Email").fill("test@resetrix.com");
    await page.getByLabel("Password").fill("password123");
    await page.getByRole("button", { name: "Sign in" }).click();

    // Try to access signin page
    await page.goto("/signin");

    // Should redirect to dashboard
    await expect(page).toHaveURL("/dashboard");
  });
});
