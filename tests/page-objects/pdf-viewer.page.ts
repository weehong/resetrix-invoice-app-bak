import { Page, Locator, expect } from "@playwright/test";

export class PdfViewerPage {
  readonly page: Page;
  
  // Header elements
  readonly pageTitle: Locator;
  readonly pageDescription: Locator;
  
  // Action buttons
  readonly generatePreviewButton: Locator;
  readonly downloadPdfButton: Locator;
  readonly stickyActionContainer: Locator;
  
  // Form sections
  readonly invoiceDetailsSection: Locator;
  readonly companyInfoSection: Locator;
  readonly clientInfoSection: Locator;
  readonly invoiceItemsSection: Locator;
  readonly paymentScheduleSection: Locator;
  
  // Form inputs - Invoice Details
  readonly invoiceNumberInput: Locator;
  readonly issueDateInput: Locator;
  readonly dueDateInput: Locator;
  
  // Form inputs - Company Info
  readonly companyNameInput: Locator;
  readonly companyAddressInput: Locator;
  readonly companyCityInput: Locator;
  
  // Form inputs - Client Info
  readonly clientNameInput: Locator;
  readonly clientAddressInput: Locator;
  
  // Form inputs - Invoice Items
  readonly itemDescriptionInputs: Locator;
  readonly itemQuantityInputs: Locator;
  readonly itemRateInputs: Locator;
  readonly addItemButton: Locator;
  
  // Payment Schedule
  readonly paymentScheduleToggle: Locator;
  readonly addPaymentButton: Locator;
  readonly paymentPercentageInputs: Locator;
  readonly paymentDescriptionInputs: Locator;
  readonly paymentAmountInputs: Locator;
  
  // PDF Preview
  readonly pdfPreviewContainer: Locator;
  readonly pdfPreviewTitle: Locator;
  readonly pdfIframe: Locator;
  readonly loadingSpinner: Locator;
  readonly placeholderMessage: Locator;
  
  // Error messages
  readonly validationErrors: Locator;
  readonly percentageExceedsError: Locator;
  
  // Layout containers
  readonly gridContainer: Locator;
  readonly formColumn: Locator;
  readonly previewColumn: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Header elements
    this.pageTitle = page.getByText("Invoice Generator");
    this.pageDescription = page.getByText("Create and preview invoice PDFs");
    
    // Action buttons
    this.generatePreviewButton = page.getByRole("button", { name: "Generate Preview" });
    this.downloadPdfButton = page.getByRole("button", { name: "Download PDF" });
    this.stickyActionContainer = page.locator('[class*="sticky"]').first();
    
    // Form sections
    this.invoiceDetailsSection = page.locator('section, div').filter({ hasText: /invoice details/i }).first();
    this.companyInfoSection = page.locator('section, div').filter({ hasText: /company information/i }).first();
    this.clientInfoSection = page.locator('section, div').filter({ hasText: /client information/i }).first();
    this.invoiceItemsSection = page.locator('section, div').filter({ hasText: /invoice items/i }).first();
    this.paymentScheduleSection = page.locator('section, div').filter({ hasText: /payment schedule/i }).first();
    
    // Form inputs - Invoice Details
    this.invoiceNumberInput = page.getByLabel("Invoice Number");
    this.issueDateInput = page.getByLabel("Issue Date");
    this.dueDateInput = page.getByLabel("Due Date");
    
    // Form inputs - Company Info
    this.companyNameInput = page.getByLabel("Company Name");
    this.companyAddressInput = page.getByLabel("Company Address");
    this.companyCityInput = page.getByLabel("Company City");
    
    // Form inputs - Client Info
    this.clientNameInput = page.getByLabel("Client Name");
    this.clientAddressInput = page.getByLabel("Client Address");
    
    // Form inputs - Invoice Items
    this.itemDescriptionInputs = page.getByLabel("Description");
    this.itemQuantityInputs = page.getByLabel("Quantity");
    this.itemRateInputs = page.getByLabel("Rate");
    this.addItemButton = page.getByRole("button", { name: "Add Item" });
    
    // Payment Schedule
    this.paymentScheduleToggle = page.getByRole("button", { name: /payment schedule/i });
    this.addPaymentButton = page.getByRole("button", { name: "Add Payment" });
    this.paymentPercentageInputs = page.getByLabel("Percentage");
    this.paymentDescriptionInputs = page.getByLabel("Description");
    this.paymentAmountInputs = page.getByLabel("Amount");
    
    // PDF Preview
    this.pdfPreviewContainer = page.locator('.lg\\:sticky, [class*="sticky"]').last();
    this.pdfPreviewTitle = page.getByText("PDF Preview");
    this.pdfIframe = page.locator('iframe[title="PDF Preview"]');
    this.loadingSpinner = page.getByText("Generating PDF...");
    this.placeholderMessage = page.getByText('Click "Generate Preview" to view the PDF');
    
    // Error messages
    this.validationErrors = page.locator('[class*="text-red"]');
    this.percentageExceedsError = page.getByText("Total percentage exceeds 100%");
    
    // Layout containers
    this.gridContainer = page.locator('.lg\\:grid-cols-2');
    this.formColumn = page.locator('.space-y-6').first();
    this.previewColumn = page.locator('.space-y-6').last();
  }

  // Navigation methods
  async goto() {
    await this.page.goto("/pdf-viewer");
  }

  async waitForLoad() {
    await this.page.waitForLoadState("networkidle");
    await expect(this.pageTitle).toBeVisible();
  }

  // Form filling methods
  async fillBasicInvoiceDetails(data: {
    invoiceNumber?: string;
    issueDate?: string;
    dueDate?: string;
  } = {}) {
    const defaults = {
      invoiceNumber: "INV-001",
      issueDate: "2024-01-01",
      dueDate: "2024-01-31",
      ...data
    };

    await this.invoiceNumberInput.fill(defaults.invoiceNumber);
    await this.issueDateInput.fill(defaults.issueDate);
    await this.dueDateInput.fill(defaults.dueDate);
  }

  async fillCompanyInformation(data: {
    name?: string;
    address?: string;
    city?: string;
  } = {}) {
    const defaults = {
      name: "Test Company",
      address: "123 Test St",
      city: "Test City",
      ...data
    };

    await this.companyNameInput.fill(defaults.name);
    await this.companyAddressInput.fill(defaults.address);
    await this.companyCityInput.fill(defaults.city);
  }

  async fillClientInformation(data: {
    name?: string;
    address?: string;
  } = {}) {
    const defaults = {
      name: "Test Client",
      address: "456 Client St",
      ...data
    };

    await this.clientNameInput.fill(defaults.name);
    await this.clientAddressInput.fill(defaults.address);
  }

  async addInvoiceItem(data: {
    description?: string;
    quantity?: string;
    rate?: string;
  } = {}) {
    const defaults = {
      description: "Test Service",
      quantity: "1",
      rate: "100",
      ...data
    };

    // Fill the first available item or add new one
    const descriptionCount = await this.itemDescriptionInputs.count();
    const index = descriptionCount > 0 ? 0 : 0;

    await this.itemDescriptionInputs.nth(index).fill(defaults.description);
    await this.itemQuantityInputs.nth(index).fill(defaults.quantity);
    await this.itemRateInputs.nth(index).fill(defaults.rate);
  }

  async enablePaymentSchedule() {
    const isExpanded = await this.paymentScheduleToggle.getAttribute("aria-expanded");
    if (isExpanded !== "true") {
      await this.paymentScheduleToggle.click();
    }
  }

  async addPaymentScheduleEntry(percentage: string, description: string = "Payment") {
    await this.enablePaymentSchedule();
    await this.addPaymentButton.click();
    
    const count = await this.paymentPercentageInputs.count();
    await this.paymentPercentageInputs.nth(count - 1).fill(percentage);
    await this.paymentDescriptionInputs.nth(count - 1).fill(description);
  }

  async fillCompleteForm() {
    await this.fillBasicInvoiceDetails();
    await this.fillCompanyInformation();
    await this.fillClientInformation();
    await this.addInvoiceItem();
  }

  // Action methods
  async generatePreview() {
    await this.generatePreviewButton.click();
  }

  async downloadPdf() {
    const downloadPromise = this.page.waitForEvent('download');
    await this.downloadPdfButton.click();
    return await downloadPromise;
  }

  // Validation methods
  async expectButtonsEnabled() {
    await expect(this.generatePreviewButton).toBeEnabled();
    await expect(this.downloadPdfButton).toBeEnabled();
  }

  async expectButtonsDisabled() {
    await expect(this.generatePreviewButton).toBeDisabled();
    await expect(this.downloadPdfButton).toBeDisabled();
  }

  async expectPercentageExceedsError() {
    await expect(this.percentageExceedsError).toBeVisible();
  }

  async expectNoPercentageError() {
    await expect(this.percentageExceedsError).not.toBeVisible();
  }

  async expectPdfPreviewVisible() {
    await expect(this.pdfPreviewTitle).toBeVisible();
    await expect(this.pdfIframe).toBeVisible();
  }

  async expectLoadingState() {
    await expect(this.loadingSpinner).toBeVisible();
  }

  // Utility methods
  async scrollToBottom() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  async scrollToTop() {
    await this.page.evaluate(() => {
      window.scrollTo(0, 0);
    });
  }

  async getStickyElementPosition() {
    return await this.stickyActionContainer.boundingBox();
  }

  async getViewportSize() {
    return this.page.viewportSize();
  }
}
