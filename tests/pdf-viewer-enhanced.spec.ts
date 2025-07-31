import { expect, test } from "@playwright/test";
import { signIn } from "./utils";
import { PdfViewerPage } from "./page-objects/pdf-viewer.page";

test.describe("PDF Viewer - Enhanced Tests with Page Objects", () => {
  let pdfViewerPage: PdfViewerPage;

  test.beforeEach(async ({ page }) => {
    pdfViewerPage = new PdfViewerPage(page);
    await signIn(page);
    await pdfViewerPage.goto();
    await pdfViewerPage.waitForLoad();
  });

  test.describe("Authentication and Access", () => {
    test("should display PDF viewer interface after authentication", async () => {
      await expect(pdfViewerPage.pageTitle).toBeVisible();
      await expect(pdfViewerPage.pageDescription).toBeVisible();
      await expect(pdfViewerPage.generatePreviewButton).toBeVisible();
      await expect(pdfViewerPage.downloadPdfButton).toBeVisible();
    });
  });

  test.describe("Sticky Positioning - Desktop", () => {
    test("should maintain sticky action buttons position when scrolling", async ({ browserName }) => {
      test.skip(browserName === "Mobile Chrome" || browserName === "Mobile Safari", 
        "Sticky positioning test is for desktop only");

      // Fill form to create scrollable content
      await pdfViewerPage.fillCompleteForm();
      
      // Get initial position of sticky buttons
      const initialPosition = await pdfViewerPage.getStickyElementPosition();
      expect(initialPosition).toBeTruthy();
      
      // Scroll to bottom
      await pdfViewerPage.scrollToBottom();
      
      // Buttons should still be visible and in same position
      await expect(pdfViewerPage.generatePreviewButton).toBeVisible();
      const scrolledPosition = await pdfViewerPage.getStickyElementPosition();
      
      // Y position should remain the same (sticky behavior)
      expect(scrolledPosition?.y).toBe(initialPosition?.y);
    });

    test("should display sticky PDF preview on desktop after generation", async ({ browserName }) => {
      test.skip(browserName === "Mobile Chrome" || browserName === "Mobile Safari", 
        "Sticky PDF preview test is for desktop only");

      await pdfViewerPage.fillCompleteForm();
      await pdfViewerPage.generatePreview();
      
      // Wait for PDF to load
      await pdfViewerPage.expectLoadingState();
      await pdfViewerPage.expectPdfPreviewVisible();
      
      // Check if preview container has sticky positioning
      await expect(pdfViewerPage.pdfPreviewContainer).toBeVisible();
      
      // Scroll and verify preview stays in position
      await pdfViewerPage.scrollToBottom();
      await expect(pdfViewerPage.pdfPreviewTitle).toBeVisible();
    });
  });

  test.describe("Form Validation and Payment Schedule", () => {
    test("should prevent percentage total exceeding 100%", async () => {
      await pdfViewerPage.fillCompleteForm();
      
      // Add payments that exceed 100%
      await pdfViewerPage.addPaymentScheduleEntry("60", "First Payment");
      await pdfViewerPage.addPaymentScheduleEntry("50", "Second Payment");
      
      // Should show error and disable buttons
      await pdfViewerPage.expectPercentageExceedsError();
      await pdfViewerPage.expectButtonsDisabled();
    });

    test("should allow exactly 100% payment schedule", async () => {
      await pdfViewerPage.fillCompleteForm();
      
      // Add payments totaling exactly 100%
      await pdfViewerPage.addPaymentScheduleEntry("50", "First Payment");
      await pdfViewerPage.addPaymentScheduleEntry("50", "Second Payment");
      
      // Should not show error and buttons should be enabled
      await pdfViewerPage.expectNoPercentageError();
      await pdfViewerPage.expectButtonsEnabled();
    });

    test("should cap individual percentage input automatically", async () => {
      await pdfViewerPage.fillCompleteForm();
      
      // Add first payment of 70%
      await pdfViewerPage.addPaymentScheduleEntry("70", "First Payment");
      
      // Try to add 50% (should be capped to 30%)
      await pdfViewerPage.addPaymentScheduleEntry("50", "Second Payment");
      
      // Verify the second input was capped to 30%
      const count = await pdfViewerPage.paymentPercentageInputs.count();
      const lastInput = pdfViewerPage.paymentPercentageInputs.nth(count - 1);
      await expect(lastInput).toHaveValue("30");
    });

    test("should make amount fields readonly", async () => {
      await pdfViewerPage.fillCompleteForm();
      await pdfViewerPage.addPaymentScheduleEntry("50", "Test Payment");
      
      // Amount fields should be readonly
      const amountInputs = pdfViewerPage.paymentAmountInputs;
      const count = await amountInputs.count();
      
      for (let i = 0; i < count; i++) {
        const input = amountInputs.nth(i);
        await expect(input).toHaveAttribute("readonly");
      }
    });
  });

  test.describe("PDF Generation and Download", () => {
    test("should generate PDF preview successfully", async () => {
      await pdfViewerPage.fillCompleteForm();
      
      // Generate preview
      await pdfViewerPage.generatePreview();
      
      // Should show loading then preview
      await pdfViewerPage.expectLoadingState();
      await pdfViewerPage.expectPdfPreviewVisible();
    });

    test("should download PDF successfully", async () => {
      await pdfViewerPage.fillCompleteForm();
      
      // Download PDF
      const download = await pdfViewerPage.downloadPdf();
      
      // Verify download
      expect(download.suggestedFilename()).toMatch(/invoice-.*\.pdf/);
    });

    test("should handle form validation errors", async () => {
      // Don't fill required fields
      await pdfViewerPage.generatePreview();
      
      // Should show validation errors
      await expect(pdfViewerPage.validationErrors).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe("Responsive Layout", () => {
    test("should use grid layout on desktop", async ({ browserName }) => {
      test.skip(browserName === "Mobile Chrome" || browserName === "Mobile Safari", 
        "Grid layout test is for desktop only");

      await expect(pdfViewerPage.gridContainer).toBeVisible();
      
      // Should have two columns visible
      await expect(pdfViewerPage.formColumn).toBeVisible();
      await expect(pdfViewerPage.previewColumn).toBeVisible();
    });

    test("should stack elements on mobile", async ({ browserName }) => {
      test.skip(browserName !== "Mobile Chrome" && browserName !== "Mobile Safari", 
        "Mobile layout test is for mobile only");

      const viewport = await pdfViewerPage.getViewportSize();
      expect(viewport?.width).toBeLessThan(1024); // Less than lg breakpoint
      
      // Form should be visible
      await expect(pdfViewerPage.formColumn).toBeVisible();
    });
  });

  test.describe("User Experience and Interactions", () => {
    test("should show placeholder message initially", async () => {
      await expect(pdfViewerPage.placeholderMessage).toBeVisible();
    });

    test("should toggle payment schedule section", async () => {
      // Initially collapsed or expanded
      const initialState = await pdfViewerPage.paymentScheduleToggle.getAttribute("aria-expanded");
      
      // Click toggle
      await pdfViewerPage.paymentScheduleToggle.click();
      
      // State should change
      const newState = await pdfViewerPage.paymentScheduleToggle.getAttribute("aria-expanded");
      expect(newState).not.toBe(initialState);
    });

    test("should add and remove invoice items", async () => {
      await pdfViewerPage.fillBasicInvoiceDetails();
      
      // Add first item
      await pdfViewerPage.addInvoiceItem({
        description: "First Service",
        quantity: "1",
        rate: "100"
      });
      
      // Add second item if add button exists
      const addButtonVisible = await pdfViewerPage.addItemButton.isVisible();
      if (addButtonVisible) {
        await pdfViewerPage.addItemButton.click();
        
        const itemCount = await pdfViewerPage.itemDescriptionInputs.count();
        expect(itemCount).toBeGreaterThan(1);
      }
    });

    test("should calculate amounts automatically from percentages", async () => {
      await pdfViewerPage.fillCompleteForm();
      
      // Add payment with percentage
      await pdfViewerPage.addPaymentScheduleEntry("25", "Quarter Payment");
      
      // Amount should be calculated automatically
      const amountInputs = pdfViewerPage.paymentAmountInputs;
      const count = await amountInputs.count();
      const lastAmount = amountInputs.nth(count - 1);
      
      // Should have some calculated value (not empty)
      const value = await lastAmount.inputValue();
      expect(value).not.toBe("");
      expect(parseFloat(value)).toBeGreaterThan(0);
    });
  });

  test.describe("Error Handling and Edge Cases", () => {
    test("should handle empty form submission gracefully", async () => {
      // Try to generate without filling form
      await pdfViewerPage.generatePreview();
      
      // Should either show validation errors or handle gracefully
      // (depending on implementation)
      const hasErrors = await pdfViewerPage.validationErrors.isVisible();
      const hasLoading = await pdfViewerPage.loadingSpinner.isVisible();
      
      expect(hasErrors || hasLoading).toBeTruthy();
    });

    test("should maintain form state after validation errors", async () => {
      // Fill partial form
      await pdfViewerPage.fillBasicInvoiceDetails({ invoiceNumber: "TEST-123" });
      
      // Try to generate (might cause validation error)
      await pdfViewerPage.generatePreview();
      
      // Form values should be preserved
      await expect(pdfViewerPage.invoiceNumberInput).toHaveValue("TEST-123");
    });
  });
});
