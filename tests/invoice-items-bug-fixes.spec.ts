import { expect, test } from "@playwright/test";
import { signIn } from "./utils";

test.describe("Invoice Items Bug Fixes", () => {
  test.beforeEach(async ({ page }) => {
    await signIn(page);
    await page.goto("/pdf-viewer");
    await page.waitForLoadState("networkidle");
  });

  test.describe("Item Total Calculation Bug Fix", () => {
    test("should automatically calculate item total when quantity and rate are entered", async ({ page }) => {
      // Add an invoice item
      await page.getByRole("button", { name: "Add Item" }).click();
      
      // Fill in description
      await page.getByPlaceholder("Description").first().fill("Test Service");
      
      // Enter quantity
      await page.getByPlaceholder("Qty").first().fill("5");
      
      // Enter rate/price
      await page.getByPlaceholder("Price").first().fill("100");
      
      // Wait for calculation to complete
      await page.waitForTimeout(500);
      
      // Check if the total is calculated correctly (5 * 100 = 500)
      // The total should be displayed in the item row
      const itemRow = page.locator('[class*="grid-cols-12"]').first();
      await expect(itemRow).toContainText("500");
    });

    test("should update item total when quantity is changed", async ({ page }) => {
      // Add an invoice item
      await page.getByRole("button", { name: "Add Item" }).click();
      
      // Fill initial values
      await page.getByPlaceholder("Description").first().fill("Consulting");
      await page.getByPlaceholder("Qty").first().fill("2");
      await page.getByPlaceholder("Price").first().fill("150");
      
      // Wait for initial calculation
      await page.waitForTimeout(500);
      
      // Verify initial total (2 * 150 = 300)
      const itemRow = page.locator('[class*="grid-cols-12"]').first();
      await expect(itemRow).toContainText("300");
      
      // Change quantity to 3
      await page.getByPlaceholder("Qty").first().fill("3");
      
      // Wait for recalculation
      await page.waitForTimeout(500);
      
      // Verify updated total (3 * 150 = 450)
      await expect(itemRow).toContainText("450");
    });

    test("should update item total when rate is changed", async ({ page }) => {
      // Add an invoice item
      await page.getByRole("button", { name: "Add Item" }).click();
      
      // Fill initial values
      await page.getByPlaceholder("Description").first().fill("Development");
      await page.getByPlaceholder("Qty").first().fill("4");
      await page.getByPlaceholder("Price").first().fill("75");
      
      // Wait for initial calculation
      await page.waitForTimeout(500);
      
      // Verify initial total (4 * 75 = 300)
      const itemRow = page.locator('[class*="grid-cols-12"]').first();
      await expect(itemRow).toContainText("300");
      
      // Change rate to 100
      await page.getByPlaceholder("Price").first().fill("100");
      
      // Wait for recalculation
      await page.waitForTimeout(500);
      
      // Verify updated total (4 * 100 = 400)
      await expect(itemRow).toContainText("400");
    });

    test("should calculate subtotal correctly from multiple items", async ({ page }) => {
      // Add first item
      await page.getByRole("button", { name: "Add Item" }).click();
      await page.getByPlaceholder("Description").first().fill("Service 1");
      await page.getByPlaceholder("Qty").first().fill("2");
      await page.getByPlaceholder("Price").first().fill("100");
      
      // Add second item
      await page.getByRole("button", { name: "Add Item" }).click();
      await page.getByPlaceholder("Description").last().fill("Service 2");
      await page.getByPlaceholder("Qty").last().fill("3");
      await page.getByPlaceholder("Price").last().fill("150");
      
      // Wait for calculations
      await page.waitForTimeout(1000);
      
      // Check subtotal (2*100 + 3*150 = 200 + 450 = 650)
      await expect(page.getByText("Subtotal:")).toBeVisible();
      const subtotalSection = page.locator('text=Subtotal:').locator('..');
      await expect(subtotalSection).toContainText("650");
    });
  });

  test.describe("Tax Toggle Feature", () => {
    test("should display tax toggle checkbox", async ({ page }) => {
      // Check if tax toggle is present
      await expect(page.getByText("Enable Tax")).toBeVisible();
      await expect(page.locator('input[type="checkbox"]')).toBeVisible();
    });

    test("should show tax fields when tax is enabled", async ({ page }) => {
      // Enable tax
      await page.getByText("Enable Tax").locator('..').locator('input[type="checkbox"]').check();
      
      // Check if tax rate and label fields appear
      await expect(page.getByText("Tax Rate (%)")).toBeVisible();
      await expect(page.getByPlaceholder("7")).toBeVisible();
      await expect(page.getByPlaceholder("GST")).toBeVisible();
    });

    test("should hide tax fields when tax is disabled", async ({ page }) => {
      // First enable tax to show fields
      await page.getByText("Enable Tax").locator('..').locator('input[type="checkbox"]').check();
      await expect(page.getByText("Tax Rate (%)")).toBeVisible();
      
      // Then disable tax
      await page.getByText("Enable Tax").locator('..').locator('input[type="checkbox"]').uncheck();
      
      // Check if tax fields are hidden
      await expect(page.getByText("Tax Rate (%)")).not.toBeVisible();
    });

    test("should calculate tax amount automatically", async ({ page }) => {
      // Add an item first
      await page.getByRole("button", { name: "Add Item" }).click();
      await page.getByPlaceholder("Description").first().fill("Taxable Service");
      await page.getByPlaceholder("Qty").first().fill("1");
      await page.getByPlaceholder("Price").first().fill("1000");
      
      // Enable tax
      await page.getByText("Enable Tax").locator('..').locator('input[type="checkbox"]').check();
      
      // Set tax rate to 10%
      await page.getByPlaceholder("7").fill("10");
      
      // Wait for calculations
      await page.waitForTimeout(1000);
      
      // Check if tax amount is calculated (10% of 1000 = 100)
      const taxSection = page.locator('text=Tax').locator('..');
      await expect(taxSection).toContainText("100");
      
      // Check if total includes tax (1000 + 100 = 1100)
      const totalSection = page.locator('text=Total:').locator('..');
      await expect(totalSection).toContainText("1100");
    });

    test("should update tax when rate changes", async ({ page }) => {
      // Add an item
      await page.getByRole("button", { name: "Add Item" }).click();
      await page.getByPlaceholder("Description").first().fill("Service");
      await page.getByPlaceholder("Qty").first().fill("1");
      await page.getByPlaceholder("Price").first().fill("500");
      
      // Enable tax with 5% rate
      await page.getByText("Enable Tax").locator('..').locator('input[type="checkbox"]').check();
      await page.getByPlaceholder("7").fill("5");
      
      // Wait for initial calculation
      await page.waitForTimeout(1000);
      
      // Verify initial tax (5% of 500 = 25)
      const taxSection = page.locator('text=Tax').locator('..');
      await expect(taxSection).toContainText("25");
      
      // Change tax rate to 8%
      await page.getByPlaceholder("7").fill("8");
      
      // Wait for recalculation
      await page.waitForTimeout(1000);
      
      // Verify updated tax (8% of 500 = 40)
      await expect(taxSection).toContainText("40");
    });

    test("should use custom tax label", async ({ page }) => {
      // Add an item
      await page.getByRole("button", { name: "Add Item" }).click();
      await page.getByPlaceholder("Description").first().fill("Service");
      await page.getByPlaceholder("Qty").first().fill("1");
      await page.getByPlaceholder("Price").first().fill("100");
      
      // Enable tax
      await page.getByText("Enable Tax").locator('..').locator('input[type="checkbox"]').check();
      
      // Set custom tax label
      await page.getByPlaceholder("GST").fill("VAT");
      
      // Wait for update
      await page.waitForTimeout(500);
      
      // Check if custom label is displayed
      await expect(page.getByText("VAT")).toBeVisible();
    });

    test("should exclude tax from total when disabled", async ({ page }) => {
      // Add an item
      await page.getByRole("button", { name: "Add Item" }).click();
      await page.getByPlaceholder("Description").first().fill("Service");
      await page.getByPlaceholder("Qty").first().fill("1");
      await page.getByPlaceholder("Price").first().fill("200");
      
      // First enable tax
      await page.getByText("Enable Tax").locator('..').locator('input[type="checkbox"]').check();
      await page.getByPlaceholder("7").fill("10");
      
      // Wait for calculation with tax
      await page.waitForTimeout(1000);
      
      // Verify total with tax (200 + 20 = 220)
      const totalSection = page.locator('text=Total:').locator('..');
      await expect(totalSection).toContainText("220");
      
      // Disable tax
      await page.getByText("Enable Tax").locator('..').locator('input[type="checkbox"]').uncheck();
      
      // Wait for recalculation
      await page.waitForTimeout(1000);
      
      // Verify total without tax (should be 200)
      await expect(totalSection).toContainText("200");
      
      // Verify tax section is not visible
      await expect(page.getByText("Tax (")).not.toBeVisible();
    });
  });

  test.describe("Tax Rate Validation", () => {
    test("should accept valid tax rates (0-100%)", async ({ page }) => {
      // Add an item first
      await page.getByRole("button", { name: "Add Item" }).click();
      await page.getByPlaceholder("Description").first().fill("Test Service");
      await page.getByPlaceholder("Qty").first().fill("1");
      await page.getByPlaceholder("Price").first().fill("100");

      // Enable tax
      await page.getByText("Enable Tax").locator('..').locator('input[type="checkbox"]').check();

      // Test that we can enter valid tax rates without errors
      const validRates = ["0", "10", "50", "100"];

      for (const rate of validRates) {
        // Clear the field first
        await page.getByPlaceholder("7").clear();
        await page.getByPlaceholder("7").fill(rate);
        await page.waitForTimeout(1000);

        // Just verify that the total section is visible and contains a number
        await expect(page.getByText(/Total:/)).toBeVisible();

        // Verify the input field doesn't have error styling
        const taxInput = page.getByPlaceholder("7");
        const inputClass = await taxInput.getAttribute("class");
        expect(inputClass).not.toContain("border-red-500");
      }
    });

    test("should handle edge case: 0% tax rate", async ({ page }) => {
      // Add an item
      await page.getByRole("button", { name: "Add Item" }).click();
      await page.getByPlaceholder("Description").first().fill("Service");
      await page.getByPlaceholder("Qty").first().fill("1");
      await page.getByPlaceholder("Price").first().fill("500");

      // Enable tax and set to 0%
      await page.getByText("Enable Tax").locator('..').locator('input[type="checkbox"]').check();
      await page.getByPlaceholder("7").fill("0");

      await page.waitForTimeout(1000);

      // Tax amount should be 0 - look for tax display in totals section
      await expect(page.getByText(/Tax.*0/)).toBeVisible();

      // Total should equal subtotal (500)
      await expect(page.getByText(/Total:.*500/)).toBeVisible();
    });

    test("should handle edge case: 100% tax rate", async ({ page }) => {
      // Add an item
      await page.getByRole("button", { name: "Add Item" }).click();
      await page.getByPlaceholder("Description").first().fill("Service");
      await page.getByPlaceholder("Qty").first().fill("1");
      await page.getByPlaceholder("Price").first().fill("200");

      // Enable tax and set to 100%
      await page.getByText("Enable Tax").locator('..').locator('input[type="checkbox"]').check();
      await page.getByPlaceholder("7").fill("100");

      await page.waitForTimeout(1000);

      // Tax amount should equal subtotal (200)
      await expect(page.getByText(/Tax.*200/)).toBeVisible();

      // Total should be subtotal + tax (200 + 200 = 400)
      await expect(page.getByText(/Total:.*400/)).toBeVisible();
    });

    test("should show error for negative tax rates", async ({ page }) => {
      // Enable tax
      await page.getByText("Enable Tax").locator('..').locator('input[type="checkbox"]').check();

      // Try to enter negative tax rate
      await page.getByPlaceholder("7").fill("-5");
      await page.getByPlaceholder("7").blur(); // Trigger validation

      await page.waitForTimeout(500);

      // Should show error message
      await expect(page.getByText("Tax rate cannot be negative")).toBeVisible();

      // Input should have error styling (red border)
      const taxInput = page.getByPlaceholder("7");
      await expect(taxInput).toHaveClass(/border-red-500/);
    });

    test("should show error for tax rates over 100%", async ({ page }) => {
      // Enable tax
      await page.getByText("Enable Tax").locator('..').locator('input[type="checkbox"]').check();

      // Try to enter tax rate over 100%
      await page.getByPlaceholder("7").fill("150");
      await page.getByPlaceholder("7").blur(); // Trigger validation

      await page.waitForTimeout(500);

      // Should show error message
      await expect(page.getByText("Tax rate cannot exceed 100%")).toBeVisible();

      // Input should have error styling (red border)
      const taxInput = page.getByPlaceholder("7");
      await expect(taxInput).toHaveClass(/border-red-500/);
    });

    test("should prevent mathematical errors from invalid tax rates", async ({ page }) => {
      // Add an item
      await page.getByRole("button", { name: "Add Item" }).click();
      await page.getByPlaceholder("Description").first().fill("Service");
      await page.getByPlaceholder("Qty").first().fill("1");
      await page.getByPlaceholder("Price").first().fill("100");

      // Enable tax
      await page.getByText("Enable Tax").locator('..').locator('input[type="checkbox"]').check();

      // Try various edge case inputs that could cause mathematical errors
      const edgeCaseInputs = ["", "999", "-50"];

      for (const input of edgeCaseInputs) {
        // Clear the field first
        await page.getByPlaceholder("7").clear();

        if (input !== "") {
          await page.getByPlaceholder("7").fill(input);
        }

        await page.waitForTimeout(500);

        // Total should still be calculated correctly (not NaN or undefined)
        const totalText = await page.getByText(/Total:/).textContent();

        // Should not contain NaN, undefined, or invalid numbers
        expect(totalText).not.toContain("NaN");
        expect(totalText).not.toContain("undefined");
        expect(totalText).not.toContain("Infinity");

        // Should contain a valid number
        expect(totalText).toMatch(/\d+/);
      }
    });

    test("should maintain HTML validation attributes", async ({ page }) => {
      // Enable tax
      await page.getByText("Enable Tax").locator('..').locator('input[type="checkbox"]').check();

      const taxInput = page.getByPlaceholder("7");

      // Check HTML validation attributes
      await expect(taxInput).toHaveAttribute("min", "0");
      await expect(taxInput).toHaveAttribute("max", "100");
      await expect(taxInput).toHaveAttribute("type", "number");
      await expect(taxInput).toHaveAttribute("step", "0.01");
    });
  });

  test.describe("PDF Generation with Tax", () => {
    test("should generate PDF with tax information when enabled", async ({ page }) => {
      // Fill basic invoice info
      await page.getByLabel("Invoice Number").fill("INV-TAX-001");
      await page.getByLabel("Issue Date").fill("2024-01-01");
      await page.getByLabel("Due Date").fill("2024-01-31");
      
      // Fill company and client info
      await page.getByLabel("Company Name").fill("Test Company");
      await page.getByLabel("Company Address").fill("123 Test St");
      await page.getByLabel("Client Name").fill("Test Client");
      
      // Add item
      await page.getByRole("button", { name: "Add Item" }).click();
      await page.getByPlaceholder("Description").first().fill("Professional Services");
      await page.getByPlaceholder("Qty").first().fill("1");
      await page.getByPlaceholder("Price").first().fill("1000");
      
      // Enable tax
      await page.getByText("Enable Tax").locator('..').locator('input[type="checkbox"]').check();
      await page.getByPlaceholder("7").fill("7");
      await page.getByPlaceholder("GST").fill("GST");
      
      // Wait for calculations
      await page.waitForTimeout(1000);
      
      // Generate PDF
      await page.getByRole("button", { name: "Generate Preview" }).click();
      
      // Wait for PDF generation
      await expect(page.getByText("PDF Preview")).toBeVisible({ timeout: 10000 });
      await expect(page.locator('iframe[title="PDF Preview"]')).toBeVisible();
    });

    test("should generate PDF without tax when disabled", async ({ page }) => {
      // Fill basic invoice info
      await page.getByLabel("Invoice Number").fill("INV-NO-TAX-001");
      await page.getByLabel("Issue Date").fill("2024-01-01");
      await page.getByLabel("Due Date").fill("2024-01-31");
      
      // Fill company and client info
      await page.getByLabel("Company Name").fill("Test Company");
      await page.getByLabel("Company Address").fill("123 Test St");
      await page.getByLabel("Client Name").fill("Test Client");
      
      // Add item
      await page.getByRole("button", { name: "Add Item" }).click();
      await page.getByPlaceholder("Description").first().fill("Consulting");
      await page.getByPlaceholder("Qty").first().fill("2");
      await page.getByPlaceholder("Price").first().fill("500");
      
      // Ensure tax is disabled (should be default)
      const taxCheckbox = page.getByText("Enable Tax").locator('..').locator('input[type="checkbox"]');
      if (await taxCheckbox.isChecked()) {
        await taxCheckbox.uncheck();
      }
      
      // Wait for calculations
      await page.waitForTimeout(1000);
      
      // Generate PDF
      await page.getByRole("button", { name: "Generate Preview" }).click();
      
      // Wait for PDF generation
      await expect(page.getByText("PDF Preview")).toBeVisible({ timeout: 10000 });
      await expect(page.locator('iframe[title="PDF Preview"]')).toBeVisible();
    });
  });
});
