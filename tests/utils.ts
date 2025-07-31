import { Page } from "@playwright/test";

export async function signIn(
  page: Page,
  email: string = "john@example.com",
  password: string = "password",
) {
  await page.goto("/signin");
  await page.getByLabel("Username or Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Sign in" }).click();

  // Wait for successful redirect
  await page.waitForURL("/dashboard");
}

export async function createTestInvoice(
  page: Page,
  data: {
    clientName: string;
    invoiceNumber: string;
    amount: number;
    dueDate: string;
  },
) {
  await page.getByRole("button", { name: "New Invoice" }).click();

  await page.getByLabel("Client Name").fill(data.clientName);
  await page.getByLabel("Invoice Number").fill(data.invoiceNumber);
  await page.getByLabel("Amount").fill(data.amount.toString());
  await page.getByLabel("Due Date").fill(data.dueDate);

  await page.getByRole("button", { name: "Create Invoice" }).click();
}

export async function deleteTestInvoice(page: Page, invoiceNumber: string) {
  const row = page.getByRole("row").filter({ hasText: invoiceNumber });
  await row.getByRole("button", { name: "Delete" }).click();
  await page.getByRole("button", { name: "Confirm" }).click();
}

export async function getInvoiceCount(page: Page): Promise<number> {
  return page.getByRole("row").count();
}

export async function waitForLoadingState(page: Page) {
  await page.waitForLoadState("networkidle");
  await page.waitForLoadState("domcontentloaded");
}

// PDF Viewer specific utilities
export async function fillBasicInvoiceForm(page: Page) {
  // Fill invoice details
  await page.getByLabel("Invoice Number").fill("INV-001");
  await page.getByLabel("Issue Date").fill("2024-01-01");
  await page.getByLabel("Due Date").fill("2024-01-31");

  // Fill company information
  await page.getByLabel("Company Name").fill("Test Company");
  await page.getByLabel("Company Address").fill("123 Test St");
  await page.getByLabel("Company City").fill("Test City");

  // Fill client information
  await page.getByLabel("Client Name").fill("Test Client");
  await page.getByLabel("Client Address").fill("456 Client St");

  // Add at least one invoice item
  await page.getByLabel("Description").first().fill("Test Service");
  await page.getByLabel("Quantity").first().fill("1");
  await page.getByLabel("Rate").first().fill("100");
}

export async function addPaymentScheduleEntry(
  page: Page,
  percentage: string,
  description: string = "Payment"
) {
  // Enable payment schedule if not already enabled
  const toggle = page.getByRole("button", { name: /payment schedule/i });
  const isExpanded = await toggle.getAttribute("aria-expanded");
  if (isExpanded !== "true") {
    await toggle.click();
  }

  // Add payment entry
  await page.getByRole("button", { name: "Add Payment" }).click();

  // Fill the last payment entry
  const percentageInputs = page.getByLabel("Percentage");
  const descriptionInputs = page.getByLabel("Description");

  const count = await percentageInputs.count();
  await percentageInputs.nth(count - 1).fill(percentage);
  await descriptionInputs.nth(count - 1).fill(description);
}

export async function getElementPosition(page: Page, selector: string) {
  return await page.locator(selector).boundingBox();
}

export async function scrollToBottom(page: Page) {
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
}

export async function scrollToTop(page: Page) {
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });
}
