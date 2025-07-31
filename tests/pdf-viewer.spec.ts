import { expect, test } from "@playwright/test";
import { 
  signIn, 
  fillBasicInvoiceForm, 
  addPaymentScheduleEntry, 
  getElementPosition, 
  scrollToBottom, 
  scrollToTop,
  waitForLoadingState 
} from "./utils";

test.describe("PDF Viewer - Authentication Flow", () => {
  test("should redirect unauthenticated users to signin", async ({ page }) => {
    await page.goto("/pdf-viewer");
    
    // Should be redirected to signin page
    await expect(page).toHaveURL("/signin");
    await expect(page.getByRole("heading", { name: "Sign in to your account" })).toBeVisible();
  });

  test("should preserve callback URL when redirecting to signin", async ({ page }) => {
    await page.goto("/pdf-viewer");
    
    // Should be redirected to signin with callback URL
    await expect(page).toHaveURL("/signin?callbackUrl=%2Fpdf-viewer");
  });

  test("should allow authenticated users to access pdf-viewer directly", async ({ page }) => {
    // Sign in first
    await signIn(page);
    
    // Navigate to PDF viewer
    await page.goto("/pdf-viewer");
    
    // Should be able to access the page
    await expect(page).toHaveURL("/pdf-viewer");
    await expect(page.getByText("Invoice Generator")).toBeVisible();
    await expect(page.getByText("Create and preview invoice PDFs")).toBeVisible();
  });

  test("should redirect to pdf-viewer after successful signin with callback", async ({ page }) => {
    // Try to access PDF viewer (will redirect to signin)
    await page.goto("/pdf-viewer");
    await expect(page).toHaveURL("/signin?callbackUrl=%2Fpdf-viewer");
    
    // Sign in
    await page.getByLabel("Username or Email").fill("john@example.com");
    await page.getByLabel("Password").fill("password");
    await page.getByRole("button", { name: "Sign in" }).click();
    
    // Should be redirected back to PDF viewer
    await expect(page).toHaveURL("/pdf-viewer");
    await expect(page.getByText("Invoice Generator")).toBeVisible();
  });
});

test.describe("PDF Viewer - UI and Sticky Positioning", () => {
  test.beforeEach(async ({ page }) => {
    await signIn(page);
    await page.goto("/pdf-viewer");
    await waitForLoadingState(page);
  });

  test("should display sticky action buttons on desktop", async ({ page }) => {
    // Fill form to create scrollable content
    await fillBasicInvoiceForm(page);
    
    // Get initial position of action buttons
    const actionButtons = page.locator('[class*="sticky"]').first();
    await expect(actionButtons).toBeVisible();
    
    const initialPosition = await getElementPosition(page, '[class*="sticky"]');
    
    // Scroll down
    await scrollToBottom(page);
    
    // Action buttons should still be visible and in the same position
    await expect(actionButtons).toBeVisible();
    const scrolledPosition = await getElementPosition(page, '[class*="sticky"]');
    
    // Y position should be the same (sticky behavior)
    expect(scrolledPosition?.y).toBe(initialPosition?.y);
  });

  test("should display Generate Preview and Download PDF buttons", async ({ page }) => {
    const generateButton = page.getByRole("button", { name: "Generate Preview" });
    const downloadButton = page.getByRole("button", { name: "Download PDF" });
    
    await expect(generateButton).toBeVisible();
    await expect(downloadButton).toBeVisible();
    
    // Buttons should be enabled initially
    await expect(generateButton).toBeEnabled();
    await expect(downloadButton).toBeEnabled();
  });

  test("should show PDF preview section with sticky positioning on desktop", async ({ page, browserName }) => {
    // Skip on mobile browsers
    test.skip(browserName === "Mobile Chrome" || browserName === "Mobile Safari", 
      "Sticky positioning only applies on desktop");
    
    // Fill form and generate preview
    await fillBasicInvoiceForm(page);
    await page.getByRole("button", { name: "Generate Preview" }).click();
    
    // Wait for PDF generation
    await expect(page.getByText("Generating PDF...")).toBeVisible();
    await expect(page.getByText("PDF Preview")).toBeVisible({ timeout: 10000 });
    
    // Check if PDF preview container has sticky classes
    const pdfContainer = page.locator('.lg\\:sticky');
    await expect(pdfContainer).toBeVisible();
  });

  test("should not apply sticky positioning on mobile", async ({ page, browserName }) => {
    // Only run on mobile browsers
    test.skip(browserName !== "Mobile Chrome" && browserName !== "Mobile Safari", 
      "This test is for mobile browsers only");
    
    await fillBasicInvoiceForm(page);
    
    // On mobile, elements should not have sticky positioning
    const stickyElements = page.locator('.sticky');
    const count = await stickyElements.count();
    
    // Should have minimal or no sticky elements on mobile
    expect(count).toBeLessThanOrEqual(1); // Only action buttons might be sticky
  });
});

test.describe("PDF Viewer - Form Validation", () => {
  test.beforeEach(async ({ page }) => {
    await signIn(page);
    await page.goto("/pdf-viewer");
    await waitForLoadingState(page);
  });

  test("should validate payment schedule percentage not exceeding 100%", async ({ page }) => {
    await fillBasicInvoiceForm(page);
    
    // Add payment schedule entries that exceed 100%
    await addPaymentScheduleEntry(page, "60", "First Payment");
    await addPaymentScheduleEntry(page, "50", "Second Payment");
    
    // Should show error message
    await expect(page.getByText("Total percentage exceeds 100%")).toBeVisible();
    
    // Buttons should be disabled
    await expect(page.getByRole("button", { name: "Generate Preview" })).toBeDisabled();
    await expect(page.getByRole("button", { name: "Download PDF" })).toBeDisabled();
  });

  test("should allow payment schedule totaling exactly 100%", async ({ page }) => {
    await fillBasicInvoiceForm(page);
    
    // Add payment schedule entries that total 100%
    await addPaymentScheduleEntry(page, "50", "First Payment");
    await addPaymentScheduleEntry(page, "50", "Second Payment");
    
    // Should not show error message
    await expect(page.getByText("Total percentage exceeds 100%")).not.toBeVisible();
    
    // Buttons should be enabled
    await expect(page.getByRole("button", { name: "Generate Preview" })).toBeEnabled();
    await expect(page.getByRole("button", { name: "Download PDF" })).toBeEnabled();
  });

  test("should cap individual percentage input to prevent exceeding 100%", async ({ page }) => {
    await fillBasicInvoiceForm(page);
    
    // Add first payment
    await addPaymentScheduleEntry(page, "70", "First Payment");
    
    // Try to add second payment that would exceed 100%
    await addPaymentScheduleEntry(page, "50", "Second Payment");
    
    // The second percentage should be capped to 30% (100% - 70%)
    const percentageInputs = page.getByLabel("Percentage");
    const count = await percentageInputs.count();
    const lastInput = percentageInputs.nth(count - 1);
    
    await expect(lastInput).toHaveValue("30");
  });
});

test.describe("PDF Viewer - Invoice Generation", () => {
  test.beforeEach(async ({ page }) => {
    await signIn(page);
    await page.goto("/pdf-viewer");
    await waitForLoadingState(page);
  });

  test("should generate PDF preview successfully", async ({ page }) => {
    await fillBasicInvoiceForm(page);
    
    // Click generate preview
    await page.getByRole("button", { name: "Generate Preview" }).click();
    
    // Should show loading state
    await expect(page.getByText("Generating...")).toBeVisible();
    
    // Should show PDF preview
    await expect(page.getByText("PDF Preview")).toBeVisible({ timeout: 10000 });
    
    // Should contain iframe with PDF
    await expect(page.locator('iframe[title="PDF Preview"]')).toBeVisible();
  });

  test("should handle download PDF functionality", async ({ page }) => {
    await fillBasicInvoiceForm(page);
    
    // Set up download promise before clicking
    const downloadPromise = page.waitForEvent('download');
    
    // Click download PDF
    await page.getByRole("button", { name: "Download PDF" }).click();
    
    // Should trigger download
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/invoice-.*\.pdf/);
  });

  test("should show error message on generation failure", async ({ page }) => {
    // Don't fill form (invalid state)
    
    // Try to generate preview
    await page.getByRole("button", { name: "Generate Preview" }).click();
    
    // Should show error (either validation error or generation error)
    await expect(page.locator('[class*="text-red"]')).toBeVisible({ timeout: 5000 });
  });
});

test.describe("PDF Viewer - Responsive Behavior", () => {
  test.beforeEach(async ({ page }) => {
    await signIn(page);
    await page.goto("/pdf-viewer");
    await waitForLoadingState(page);
  });

  test("should use grid layout on desktop", async ({ page, browserName }) => {
    test.skip(browserName === "Mobile Chrome" || browserName === "Mobile Safari", 
      "Grid layout test is for desktop only");
    
    // Should have grid layout on desktop
    const gridContainer = page.locator('.lg\\:grid-cols-2');
    await expect(gridContainer).toBeVisible();
  });

  test("should use single column layout on mobile", async ({ page, browserName }) => {
    test.skip(browserName !== "Mobile Chrome" && browserName !== "Mobile Safari", 
      "Single column test is for mobile only");
    
    await fillBasicInvoiceForm(page);
    
    // On mobile, should not have multi-column grid
    const viewport = page.viewportSize();
    expect(viewport?.width).toBeLessThan(1024); // Less than lg breakpoint
    
    // Form and preview should stack vertically
    const formSection = page.locator('[class*="space-y-6"]').first();
    const previewSection = page.locator('[class*="space-y-6"]').last();
    
    await expect(formSection).toBeVisible();
    await expect(previewSection).toBeVisible();
  });
});
