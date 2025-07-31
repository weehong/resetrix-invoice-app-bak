import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { InvoicePDF } from '@/components/pdf/InvoicePDF';
import { InvoiceData } from '@/types/invoice';

export class PDFService {
  static async generateInvoicePDF(data: InvoiceData): Promise<Blob> {
    const doc = React.createElement(InvoicePDF, { data }) as any;
    const pdfBlob = await pdf(doc).toBlob();
    return pdfBlob;
  }

  static async downloadInvoicePDF(data: InvoiceData, filename?: string): Promise<void> {
    const pdfBlob = await this.generateInvoicePDF(data);
    const url = URL.createObjectURL(pdfBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `invoice-${data.invoiceNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  static async previewInvoicePDF(data: InvoiceData): Promise<string> {
    const pdfBlob = await this.generateInvoicePDF(data);
    return URL.createObjectURL(pdfBlob);
  }
}