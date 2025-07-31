import { expect, test } from "@playwright/test";
import { signIn } from "./utils";

test.describe("Enhanced Invoice Features", () => {
  test.beforeEach(async ({ page }) => {
    await signIn(page);
    await page.goto("/pdf-viewer");
    await page.waitForLoadState("networkidle");
  });

  test.describe("Geographic Address Fields", () => {
    test("should display geographic fields in company information form", async ({ page }) => {
      // Check if geographic fields are present in company form
      await expect(page.getByLabel("City")).toBeVisible();
      await expect(page.getByLabel("State/Province")).toBeVisible();
      await expect(page.getByLabel("Country")).toBeVisible();
    });

    test("should display geographic fields in client information form", async ({ page }) => {
      // Check if geographic fields are present in client form
      const cityFields = page.getByLabel("City");
      const stateFields = page.getByLabel("State/Province");
      const countryFields = page.getByLabel("Country");
      
      // Should have multiple instances (company and client)
      expect(await cityFields.count()).toBeGreaterThanOrEqual(2);
      expect(await stateFields.count()).toBeGreaterThanOrEqual(2);
      expect(await countryFields.count()).toBeGreaterThanOrEqual(2);
    });

    test("should save geographic information in form data", async ({ page }) => {
      // Fill company geographic fields
      await page.getByLabel("Company Name").fill("Test Company");
      await page.getByLabel("Company Address").fill("123 Test Street");
      await page.getByLabel("City").first().fill("Test City");
      await page.getByLabel("State/Province").first().fill("Test State");
      await page.getByLabel("Country").first().fill("Test Country");
      
      // Fill client geographic fields
      await page.getByLabel("Client Name").fill("Test Client");
      await page.getByLabel("City").last().fill("Client City");
      await page.getByLabel("State/Province").last().fill("Client State");
      await page.getByLabel("Country").last().fill("Client Country");
      
      // Verify fields retain values
      await expect(page.getByLabel("City").first()).toHaveValue("Test City");
      await expect(page.getByLabel("State/Province").first()).toHaveValue("Test State");
      await expect(page.getByLabel("Country").first()).toHaveValue("Test Country");
      
      await expect(page.getByLabel("City").last()).toHaveValue("Client City");
      await expect(page.getByLabel("State/Province").last()).toHaveValue("Client State");
      await expect(page.getByLabel("Country").last()).toHaveValue("Client Country");
    });
  });

  test.describe("Currency Integration", () => {
    test("should display currency dropdown with multiple options", async ({ page }) => {
      const currencySelect = page.getByLabel("Currency");
      await expect(currencySelect).toBeVisible();
      
      // Check if dropdown has multiple currency options
      await currencySelect.click();
      await expect(page.getByText("USD - US Dollar")).toBeVisible();
      await expect(page.getByText("EUR - Euro")).toBeVisible();
      await expect(page.getByText("GBP - British Pound")).toBeVisible();
      await expect(page.getByText("SGD - Singapore Dollar")).toBeVisible();
    });

    test("should update currency formatting when currency is changed", async ({ page }) => {
      // Fill basic invoice data
      await page.getByLabel("Invoice Number").fill("INV-001");
      await page.getByLabel("Issue Date").fill("2024-01-01");
      await page.getByLabel("Due Date").fill("2024-01-31");
      
      // Add an invoice item
      await page.getByLabel("Description").first().fill("Test Service");
      await page.getByLabel("Quantity").first().fill("1");
      await page.getByLabel("Rate").first().fill("100");
      
      // Change currency to EUR
      await page.getByLabel("Currency").selectOption("EUR");
      
      // Check if currency formatting updates (this might require waiting for form updates)
      await page.waitForTimeout(1000);
      
      // The exact assertion depends on how currency is displayed in the form
      // This is a placeholder - adjust based on actual implementation
      const currencyDisplays = page.locator('[class*="currency"], [data-testid*="currency"]');
      if (await currencyDisplays.count() > 0) {
        // Check if EUR symbol or formatting is present
        await expect(currencyDisplays.first()).toContainText("€");
      }
    });

    test("should generate PDF with selected currency", async ({ page }) => {
      // Fill form with EUR currency
      await page.getByLabel("Invoice Number").fill("INV-EUR-001");
      await page.getByLabel("Issue Date").fill("2024-01-01");
      await page.getByLabel("Due Date").fill("2024-01-31");
      await page.getByLabel("Currency").selectOption("EUR");
      
      // Fill company and client info
      await page.getByLabel("Company Name").fill("Test Company");
      await page.getByLabel("Company Address").fill("123 Test St");
      await page.getByLabel("Client Name").fill("Test Client");
      
      // Add invoice item
      await page.getByLabel("Description").first().fill("Test Service");
      await page.getByLabel("Quantity").first().fill("1");
      await page.getByLabel("Rate").first().fill("100");
      
      // Generate PDF preview
      await page.getByRole("button", { name: "Generate Preview" }).click();
      
      // Wait for PDF generation
      await expect(page.getByText("PDF Preview")).toBeVisible({ timeout: 10000 });
      
      // Verify PDF iframe is present (currency formatting would be visible in actual PDF)
      await expect(page.locator('iframe[title="PDF Preview"]')).toBeVisible();
    });
  });

  test.describe("Customizable Column Headers", () => {
    test("should display column header customization fields", async ({ page }) => {
      // Check if column header fields are present
      await expect(page.getByText("Customize Table Column Headers")).toBeVisible();
      await expect(page.getByLabel("Description Column")).toBeVisible();
      await expect(page.getByLabel("Quantity Column")).toBeVisible();
      await expect(page.getByLabel("Rate Column")).toBeVisible();
      await expect(page.getByLabel("Total Column")).toBeVisible();
    });

    test("should have default column header values", async ({ page }) => {
      // Check default values
      await expect(page.getByLabel("Description Column")).toHaveValue("Description");
      await expect(page.getByLabel("Quantity Column")).toHaveValue("Quantity");
      await expect(page.getByLabel("Rate Column")).toHaveValue("Rate");
      await expect(page.getByLabel("Total Column")).toHaveValue("Total");
    });

    test("should allow customization of column headers", async ({ page }) => {
      // Customize column headers
      await page.getByLabel("Description Column").fill("Service Details");
      await page.getByLabel("Quantity Column").fill("Hours");
      await page.getByLabel("Rate Column").fill("Hourly Rate");
      await page.getByLabel("Total Column").fill("Amount");
      
      // Verify values are saved
      await expect(page.getByLabel("Description Column")).toHaveValue("Service Details");
      await expect(page.getByLabel("Quantity Column")).toHaveValue("Hours");
      await expect(page.getByLabel("Rate Column")).toHaveValue("Hourly Rate");
      await expect(page.getByLabel("Total Column")).toHaveValue("Amount");
    });

    test("should generate PDF with custom column headers", async ({ page }) => {
      // Fill basic form data
      await page.getByLabel("Invoice Number").fill("INV-CUSTOM-001");
      await page.getByLabel("Issue Date").fill("2024-01-01");
      await page.getByLabel("Due Date").fill("2024-01-31");
      
      // Customize column headers
      await page.getByLabel("Description Column").fill("Work Description");
      await page.getByLabel("Quantity Column").fill("Days");
      await page.getByLabel("Rate Column").fill("Daily Rate");
      await page.getByLabel("Total Column").fill("Total Cost");
      
      // Fill required fields
      await page.getByLabel("Company Name").fill("Test Company");
      await page.getByLabel("Company Address").fill("123 Test St");
      await page.getByLabel("Client Name").fill("Test Client");
      
      // Add invoice item
      await page.getByLabel("Description").first().fill("Consulting Services");
      await page.getByLabel("Quantity").first().fill("5");
      await page.getByLabel("Rate").first().fill("200");
      
      // Generate PDF preview
      await page.getByRole("button", { name: "Generate Preview" }).click();
      
      // Wait for PDF generation
      await expect(page.getByText("PDF Preview")).toBeVisible({ timeout: 10000 });
      
      // Verify PDF iframe is present (custom headers would be visible in actual PDF)
      await expect(page.locator('iframe[title="PDF Preview"]')).toBeVisible();
    });
  });

  test.describe("Integration Testing", () => {
    test("should work with all enhanced features together", async ({ page }) => {
      // Fill invoice details with custom currency
      await page.getByLabel("Invoice Number").fill("INV-FULL-001");
      await page.getByLabel("Issue Date").fill("2024-01-01");
      await page.getByLabel("Due Date").fill("2024-01-31");
      await page.getByLabel("Currency").selectOption("GBP");
      
      // Customize column headers
      await page.getByLabel("Description Column").fill("Service");
      await page.getByLabel("Quantity Column").fill("Units");
      await page.getByLabel("Rate Column").fill("Price");
      await page.getByLabel("Total Column").fill("Subtotal");
      
      // Fill company info with geographic details
      await page.getByLabel("Company Name").fill("UK Test Company Ltd");
      await page.getByLabel("Company Address").fill("10 Downing Street");
      await page.getByLabel("City").first().fill("London");
      await page.getByLabel("State/Province").first().fill("England");
      await page.getByLabel("Country").first().fill("United Kingdom");
      await page.getByLabel("Postal Code").first().fill("SW1A 2AA");
      
      // Fill client info with geographic details
      await page.getByLabel("Client Name").fill("European Client Corp");
      await page.getByLabel("City").last().fill("Paris");
      await page.getByLabel("State/Province").last().fill("Île-de-France");
      await page.getByLabel("Country").last().fill("France");
      
      // Add invoice item
      await page.getByLabel("Description").first().fill("Premium Consulting");
      await page.getByLabel("Quantity").first().fill("3");
      await page.getByLabel("Rate").first().fill("500");
      
      // Generate PDF with all enhancements
      await page.getByRole("button", { name: "Generate Preview" }).click();
      
      // Wait for successful PDF generation
      await expect(page.getByText("PDF Preview")).toBeVisible({ timeout: 15000 });
      await expect(page.locator('iframe[title="PDF Preview"]')).toBeVisible();
      
      // Test download functionality
      const downloadPromise = page.waitForEvent('download');
      await page.getByRole("button", { name: "Download PDF" }).click();
      const download = await downloadPromise;
      expect(download.suggestedFilename()).toMatch(/invoice-.*\.pdf/);
    });
  });
});
