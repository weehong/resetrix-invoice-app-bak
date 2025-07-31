/**
 * PDF Viewer Test Configuration
 * 
 * Configuration constants and test data for PDF viewer tests
 */

export const TEST_CREDENTIALS = {
  email: "john@example.com",
  username: "john",
  password: "password"
};

export const TEST_INVOICE_DATA = {
  basic: {
    invoiceNumber: "INV-TEST-001",
    issueDate: "2024-01-01",
    dueDate: "2024-01-31"
  },
  company: {
    name: "Test Company Ltd",
    address: "123 Business Street",
    city: "Test City",
    state: "Test State",
    zipCode: "12345",
    phone: "+1-555-0123",
    email: "billing@testcompany.com"
  },
  client: {
    name: "Test Client Corp",
    address: "456 Client Avenue",
    city: "Client City",
    state: "Client State",
    zipCode: "67890",
    phone: "+1-555-0456",
    email: "contact@testclient.com"
  },
  items: [
    {
      description: "Web Development Services",
      quantity: "40",
      rate: "125.00"
    },
    {
      description: "UI/UX Design",
      quantity: "20",
      rate: "150.00"
    },
    {
      description: "Project Management",
      quantity: "10",
      rate: "100.00"
    }
  ],
  paymentSchedule: [
    {
      percentage: "50",
      description: "Initial Payment"
    },
    {
      percentage: "30",
      description: "Milestone Payment"
    },
    {
      percentage: "20",
      description: "Final Payment"
    }
  ]
};

export const VIEWPORT_SIZES = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 },
  largeDesktop: { width: 1920, height: 1080 }
};

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536
};

export const TEST_TIMEOUTS = {
  short: 2000,
  medium: 5000,
  long: 10000,
  pdfGeneration: 15000
};

export const SELECTORS = {
  stickyElements: '[class*="sticky"]',
  gridContainer: '.lg\\:grid-cols-2',
  errorMessages: '[class*="text-red"]',
  loadingSpinner: '[class*="animate-spin"]',
  pdfIframe: 'iframe[title="PDF Preview"]'
};

export const ERROR_MESSAGES = {
  percentageExceeds: "Total percentage exceeds 100%",
  requiredField: "This field is required",
  invalidEmail: "Please enter a valid email address",
  invalidDate: "Please enter a valid date"
};

/**
 * Test data generators
 */
export const generateInvoiceData = (overrides: any = {}) => ({
  ...TEST_INVOICE_DATA.basic,
  ...overrides
});

export const generateCompanyData = (overrides: any = {}) => ({
  ...TEST_INVOICE_DATA.company,
  ...overrides
});

export const generateClientData = (overrides: any = {}) => ({
  ...TEST_INVOICE_DATA.client,
  ...overrides
});

/**
 * Payment schedule test scenarios
 */
export const PAYMENT_SCENARIOS = {
  valid100Percent: [
    { percentage: "50", description: "Down Payment" },
    { percentage: "50", description: "Final Payment" }
  ],
  validUnder100: [
    { percentage: "30", description: "Initial" },
    { percentage: "40", description: "Progress" }
  ],
  invalid110Percent: [
    { percentage: "60", description: "First" },
    { percentage: "50", description: "Second" }
  ],
  complex100Percent: [
    { percentage: "25", description: "Q1 Payment" },
    { percentage: "25", description: "Q2 Payment" },
    { percentage: "25", description: "Q3 Payment" },
    { percentage: "25", description: "Q4 Payment" }
  ]
};

/**
 * Browser-specific test configurations
 */
export const BROWSER_CONFIGS = {
  desktop: {
    testSticky: true,
    testGrid: true,
    testResponsive: false
  },
  mobile: {
    testSticky: false,
    testGrid: false,
    testResponsive: true
  }
};

/**
 * Test utilities for common assertions
 */
export const COMMON_ASSERTIONS = {
  pageLoaded: [
    { selector: "h1", text: "Invoice Generator" },
    { selector: "p", text: "Create and preview invoice PDFs" }
  ],
  buttonsVisible: [
    { role: "button", name: "Generate Preview" },
    { role: "button", name: "Download PDF" }
  ],
  formSections: [
    "Invoice Details",
    "Company Information", 
    "Client Information",
    "Invoice Items"
  ]
};

/**
 * Performance thresholds for tests
 */
export const PERFORMANCE_THRESHOLDS = {
  pageLoad: 3000,
  pdfGeneration: 10000,
  formSubmission: 2000,
  stickyPositioning: 100
};
