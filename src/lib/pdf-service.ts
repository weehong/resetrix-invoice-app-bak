import React from 'react';
import { pdf } from '@react-pdf/renderer';
import InvoiceDocument from '@/components/InvoiceDocument';
import { InvoiceData, InvoiceProps } from '@/types/invoice-updated';
import { InvoiceData as LegacyInvoiceData } from '@/types/invoice';
import { loadFonts } from '@/helper/font';

// Convert updated InvoiceData to legacy format for compatibility
function convertToLegacyFormat(data: InvoiceData): LegacyInvoiceData {
  return {
    ...data,
    dueDate: data.payment?.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  } as LegacyInvoiceData;
}

// Convert InvoiceData to InvoiceProps format
function convertInvoiceData(data: InvoiceData, showPaymentSchedule: boolean = true): InvoiceProps {
  return {
    logo: data.company.logo || '',
    invoiceNumber: data.invoiceNumber,
    invoiceDate: data.invoiceDate,
    currency: data.currency,
    showPaymentSchedule: showPaymentSchedule,
    owner: {
      name: data.company.ownerName || data.company.name,
      company: data.company.name,
      registrationNumber: data.company.registrationNumber || '',
      address: data.company.address,
      city: data.company.city || '',

      email: data.company.email,
      phone: data.company.phone,
    },
    client: {
      name: data.client.name || data.client.companyName || 'Client',
      company: data.client.companyName || data.client.name || '',
      registrationNumber: data.client.registrationNumber || '',
      address: data.client.address || '',
      city: data.client.city || '',

      email: data.client.email || '',
      phone: data.client.phone || '',
    },
    items: data.items.map(item => ({
      id: item.id,
      section: item.section || '',
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      total: item.total,
      manDays: item.quantity,
      rate: item.unitPrice,
    })),
    paymentInfo: {
      terms: data.payment?.terms,
      method: data.payment?.method,
      bankDetails: data.payment?.bankDetails,
      dueDate: data.payment?.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      bankName: data.payment?.bankDetails?.bankName || 'Bank Name',
      swiftCode: data.payment?.bankDetails?.swiftCode || 'SWIFT',
      accountNumber: data.payment?.bankDetails?.accountNumber || 'Account',
      accountName: data.payment?.bankDetails?.accountName || data.company.name,
    },
    paymentSchedule: data.paymentSchedule || [],
    columnHeaders: data.columnHeaders,
    columns: data.columns, // Pass dynamic columns configuration
    subtotal: data.subtotal,
    tax: data.tax,
    total: data.total,
  };
}

export class PDFService {
  static async generateInvoicePDF(data: InvoiceData, showPaymentSchedule: boolean = true): Promise<Blob> {
    // Load fonts before generating PDF
    await loadFonts();

    const invoiceProps = convertInvoiceData(data, showPaymentSchedule);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc = React.createElement(InvoiceDocument, { invoice: invoiceProps }) as any;
    const pdfBlob = await pdf(doc).toBlob();
    return pdfBlob;
  }

  static async downloadInvoicePDF(data: InvoiceData, filename?: string, showPaymentSchedule: boolean = true): Promise<void> {
    const pdfBlob = await this.generateInvoicePDF(data, showPaymentSchedule);
    const url = URL.createObjectURL(pdfBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `invoice-${data.invoiceNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  static async previewInvoicePDF(data: InvoiceData, showPaymentSchedule: boolean = true): Promise<string> {
    const pdfBlob = await this.generateInvoicePDF(data, showPaymentSchedule);
    return URL.createObjectURL(pdfBlob);
  }
}
