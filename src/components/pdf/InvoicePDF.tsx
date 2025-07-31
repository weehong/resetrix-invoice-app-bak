import React from 'react';
import { Document, Page } from '@react-pdf/renderer';
import { InvoiceData } from '@/types/invoice';
import { invoiceStyles } from './styles/InvoiceStyles';
import {
  InvoiceHeader,
  InvoiceDetails,
  InvoiceItemsTable,
  InvoiceTotals,
  InvoiceFooter,
} from './components';

// Component props interface

interface InvoicePDFProps {
  data: InvoiceData;
}

export const InvoicePDF: React.FC<InvoicePDFProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={invoiceStyles.page}>
      <InvoiceHeader data={data} />
      <InvoiceDetails data={data} />
      <InvoiceItemsTable data={data} />
      <InvoiceTotals data={data} />
      <InvoiceFooter data={data} />
    </Page>
  </Document>
);