import { InvoiceData, InvoiceItem } from '@/types/invoice';

export const calculateItemTotal = (quantity: number, unitPrice: number): number => {
  return quantity * unitPrice;
};

export const calculateSubtotal = (items: InvoiceItem[]): number => {
  return items.reduce((sum, item) => sum + item.total, 0);
};

export const calculateTax = (subtotal: number, taxRate: number): number => {
  return (subtotal * taxRate) / 100;
};

export const calculateTotal = (subtotal: number, taxAmount: number): number => {
  return subtotal + taxAmount;
};

export const validateInvoiceData = (data: Partial<InvoiceData>): string[] => {
  const errors: string[] = [];

  if (!data.invoiceNumber) errors.push('Invoice number is required');
  if (!data.invoiceDate) errors.push('Invoice date is required');
  if (!data.dueDate) errors.push('Due date is required');
  if (!data.company?.name) errors.push('Company name is required');
  if (!data.client?.name) errors.push('Client name is required');
  if (!data.items || data.items.length === 0) errors.push('At least one item is required');

  return errors;
};

export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};