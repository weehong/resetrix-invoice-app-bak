export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  section?: string;
  manDays?: number;
  rate?: number;
  customFields?: Record<string, string | number>;
}

export interface PaymentScheduleEntry {
  id: string;
  description: string;
  percentage: number;
  amount: number;
}

export interface ColumnHeaders {
  description: string;
  quantity: string;
  rate: string;
  total: string;
}

export interface ColumnConfig {
  id: string;
  key: string;
  label: string;
  type: "text" | "number" | "currency";
  required: boolean;
  order: number;
  width?: string;
}

export interface CompanyInfo {
  ownerName?: string;
  name: string;
  address: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  phone: string;
  email: string;
  website?: string;
  logo?: string;
  registrationNumber?: string;
  taxId?: string;
}

export interface ClientInfo {
  name?: string;
  companyName?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  contactPerson?: string;
  registrationNumber?: string;
}

export interface TaxInfo {
  enabled: boolean;
  rate: number;
  amount: number;
  label?: string; // e.g., "GST", "VAT", "Sales Tax"
}

export interface PaymentInfo {
  terms?: string;
  method?: string;
  bankDetails?: {
    bankName?: string;
    accountNumber?: string;
    routingNumber?: string;
    swiftCode?: string;
    accountName?: string;
  };
  dueDate: string;
  bankName?: string;
  swiftCode?: string;
  accountNumber?: string;
  accountName?: string;
}

export type InvoiceProps = {
  logo: string;
  invoiceNumber: string;
  invoiceDate: string;
  currency: string;
  owner: AddressInfo;
  client: AddressInfo;
  showPaymentSchedule: boolean;
  items: InvoiceItem[];
  paymentInfo: PaymentInfo;
  paymentSchedule?: PaymentScheduleEntry[];
  columnHeaders?: ColumnHeaders;
  columns?: ColumnConfig[]; // Add dynamic columns support
  subtotal: number;
  tax: TaxInfo;
  total: number;
};

export type AddressInfo = {
  name: string;
  company?: string;
  registrationNumber?: string;
  address: string;
  city: string;
  postal_code: string;
  email?: string;
  phone?: string;
};

export interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;

  currency: string;
  issueDate?: string;
  poNumber?: string;
  status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  company: CompanyInfo;
  client: ClientInfo;
  items: InvoiceItem[];
  subtotal: number;
  tax: TaxInfo;
  total: number;
  notes?: string;
  paymentTerms?: string;
  payment?: PaymentInfo;
  paymentSchedule?: PaymentScheduleEntry[];
  columns?: ColumnConfig[];
  columnHeaders?: ColumnHeaders;
  locale?: string;
}
