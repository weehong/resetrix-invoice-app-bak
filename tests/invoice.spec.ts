import { expect, test } from "@playwright/test";

test.describe("Invoice Management", () => {
  test.beforeEach(async ({ page }) => {
    // Sign in before each test
    await page.goto("/signin");
    await page.getByLabel("Username or Email").fill("test@resetrix.com");
    await page.getByLabel("Password").fill("password123");
    await page.getByRole("button", { name: "Sign in" }).click();

    // Navigate to invoices page
    await page.goto("/invoices");
  });

  test("should display invoice list", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Invoices" })).toBeVisible();
    await expect(page.getByRole("table")).toBeVisible();
  });

  test("should create new invoice", async ({ page }) => {
    await page.getByRole("button", { name: "New Invoice" }).click();

    // Fill in invoice details
    await page.getByLabel("Client Name").fill("Test Client");
    await page.getByLabel("Invoice Number").fill("INV-001");
    await page.getByLabel("Amount").fill("1000");
    await page.getByLabel("Due Date").fill("2024-12-31");

    await page.getByRole("button", { name: "Create Invoice" }).click();

    // Verify invoice was created
    await expect(page.getByText("Test Client")).toBeVisible();
    await expect(page.getByText("INV-001")).toBeVisible();
  });

  test("should edit existing invoice", async ({ page }) => {
    // Click edit button on first invoice
    await page.getByRole("button", { name: "Edit" }).first().click();

    // Update invoice details
    await page.getByLabel("Client Name").fill("Updated Client");
    await page.getByLabel("Amount").fill("2000");

    await page.getByRole("button", { name: "Save Changes" }).click();

    // Verify changes were saved
    await expect(page.getByText("Updated Client")).toBeVisible();
    await expect(page.getByText("$2,000.00")).toBeVisible();
  });

  test("should delete invoice", async ({ page }) => {
    // Get initial invoice count
    const initialCount = await page.getByRole("row").count();

    // Click delete button on first invoice
    await page.getByRole("button", { name: "Delete" }).first().click();

    // Confirm deletion
    await page.getByRole("button", { name: "Confirm" }).click();

    // Verify invoice was deleted
    const newCount = await page.getByRole("row").count();
    expect(newCount).toBe(initialCount - 1);
  });

  test("should filter invoices", async ({ page }) => {
    // Set filter to show only paid invoices
    await page.getByRole("combobox", { name: "Status" }).selectOption("paid");

    // Verify only paid invoices are shown
    const rows = await page.getByRole("row").all();
    for (const row of rows) {
      const status = await row.getByRole("cell").nth(3).textContent();
      expect(status).toBe("Paid");
    }
  });

  test("should search invoices", async ({ page }) => {
    // Search for a specific client
    await page.getByRole("searchbox").fill("Test Client");

    // Verify search results
    const rows = await page.getByRole("row").all();
    for (const row of rows) {
      const clientName = await row.getByRole("cell").nth(1).textContent();
      expect(clientName).toContain("Test Client");
    }
  });
});
