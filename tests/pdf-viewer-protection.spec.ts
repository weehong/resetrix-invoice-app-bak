import { expect, test } from "@playwright/test";

test.describe("PDF Viewer Protection", () => {
  test("should redirect unauthenticated users to signin", async ({ page }) => {
    // Try to access the protected pdf-viewer route
    await page.goto("/pdf-viewer");
    
    // Should be redirected to signin page
    await expect(page).toHaveURL("/signin");
    
    // Should show signin form
    await expect(page.getByRole("heading", { name: "Sign in to your account" })).toBeVisible();
  });

  test("should allow authenticated users to access pdf-viewer", async ({ page }) => {
    // First sign in with correct credentials
    await page.goto("/signin");
    await page.getByLabel("Username or Email").fill("john@example.com");
    await page.getByLabel("Password").fill("password");
    await page.getByRole("button", { name: "Sign in" }).click();

    // Wait for redirect to dashboard
    await expect(page).toHaveURL("/dashboard");

    // Now try to access the protected pdf-viewer route
    await page.goto("/pdf-viewer");

    // Should be able to access the page (not redirected to signin)
    await expect(page).toHaveURL("/pdf-viewer");

    // Should show the PDF viewer interface
    await expect(page.getByText("Invoice Generator")).toBeVisible();
    await expect(page.getByText("Create and preview invoice PDFs")).toBeVisible();
  });

  test("should preserve callback URL when redirecting to signin", async ({ page }) => {
    // Try to access the protected pdf-viewer route
    await page.goto("/pdf-viewer");
    
    // Should be redirected to signin with callback URL
    await expect(page).toHaveURL("/signin?callbackUrl=%2Fpdf-viewer");
  });
});
