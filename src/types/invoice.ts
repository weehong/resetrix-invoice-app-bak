export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  section?: string;
  manDays?: number;
  rate?: number;
}

export interface CompanyInfo {
  ownerName?: string;
  name: string;
  address: string;
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
  };
  dueDate: string;
  bankName?: string;
  swiftCode?: string;
  accountNumber?: string;
  accountName?: string;
}

export interface PaymentScheduleEntry {
  id: string;
  description: string;
  percentage: number;
  amount: number;
}

export type InvoiceProps = {
  logo: string;
  invoiceNumber: string;
  invoiceDate: string;
  owner: AddressInfo;
  client: AddressInfo;
  showPaymentSchedule: boolean;
  items: InvoiceItem[];
  paymentInfo: PaymentInfo;
};

export type AddressInfo = {
  name: string;
  company?: string;
  registrationNumber?: string;
  address: string;
  state?: string;
  city: string;
  country?: string;
  email?: string;
  phone?: string;
};

export interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
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
  currency: string;
  locale?: string;
}