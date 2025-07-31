export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface CompanyInfo {
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
  name: string;
  address: string;
  phone?: string;
  email?: string;
  contactPerson?: string;
  registrationNumber?: string;
}

export interface TaxInfo {
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
}

export interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  issueDate?: string;
  poNumber?: string; // Purchase Order Number

  company: CompanyInfo;
  client: ClientInfo;

  items: InvoiceItem[];

  // Financial calculations
  subtotal: number;
  tax: TaxInfo;
  discount?: {
    rate: number;
    amount: number;
    description?: string;
  };
  total: number;

  // Additional information
  notes?: string;
  paymentTerms?: string;
  payment?: PaymentInfo;

  // Metadata
  status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  currency?: string;
  locale?: string;
}