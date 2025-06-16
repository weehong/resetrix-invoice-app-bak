import { Page } from "@playwright/test";

export async function signIn(
  page: Page,
  email: string = "test@resetrix.com",
  password: string = "password123",
) {
  await page.goto("/signin");
  await page.getByLabel("Username or Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Sign in" }).click();
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
