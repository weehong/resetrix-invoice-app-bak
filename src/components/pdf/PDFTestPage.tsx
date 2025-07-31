'use client';

import React, { useState } from 'react';
import { PDFPreview } from './PDFPreview';
import { InvoiceActions } from '../InvoiceActions';
import { InvoiceData } from '@/types/invoice';

// Sample data for testing
const sampleInvoiceData: InvoiceData = {
  invoiceNumber: "QUO-2025-0152",
  invoiceDate: "2025-05-15",
  dueDate: "2025-06-15",
  issueDate: "2025-05-15",
  poNumber: "PO-INCHFAB-2025-0123",
  company: {
    name: "Resetrix Solutions Pte Ltd",
    address: "123 Innovation Drive\n#05-01 Tech Hub\nSingapore 138632",
    phone: "+65 6123 4567",
    email: "billing@resetrix.com",
    website: "www.resetrix.com",
    registrationNumber: "202012345A",
    taxId: "GST-M90374114M"
  },
  client: {
    name: "InchFab Pte Ltd",
    address: "456 Manufacturing Street\n#03-15 Industrial Complex\nSingapore 629123",
    phone: "+65 6987 6543",
    email: "procurement@inchfab.com",
    contactPerson: "Mr. John Tan",
    registrationNumber: "201987654B"
  },
  items: [
    {
      id: "1",
      description: "Custom Web Application Development - E-commerce Platform with Advanced Analytics Dashboard",
      quantity: 120,
      unitPrice: 185.00,
      total: 22200.00
    },
    {
      id: "2", 
      description: "UI/UX Design Services - Complete Brand Identity and User Experience Design",
      quantity: 80,
      unitPrice: 150.00,
      total: 12000.00
    },
    {
      id: "3",
      description: "Mobile Application Development - iOS and Android Native Apps",
      quantity: 160,
      unitPrice: 175.00,
      total: 28000.00
    },
    {
      id: "4",
      description: "Project Management and Quality Assurance Services",
      quantity: 40,
      unitPrice: 125.00,
      total: 5000.00
    },
    {
      id: "5",
      description: "Cloud Infrastructure Setup and DevOps Implementation",
      quantity: 60,
      unitPrice: 200.00,
      total: 12000.00
    }
  ],
  subtotal: 79200.00,
  discount: {
    rate: 5,
    amount: 3960.00,
    description: "Volume Discount (5%)"
  },
  tax: {
    rate: 8,
    amount: 6019.20,
    label: "GST"
  },
  total: 81259.20,
  notes: "Thank you for choosing Resetrix Solutions for your digital transformation needs. This quotation is valid for 30 days from the issue date.",
  paymentTerms: "Net 30 days from invoice date. Late payments may incur a 1.5% monthly service charge.",
  payment: {
    terms: "Net 30 days",
    method: "Bank Transfer or Corporate Cheque",
    bankDetails: {
      bankName: "DBS Bank Ltd",
      accountNumber: "123-456789-001",
      routingNumber: "7171",
      swiftCode: "DBSSSGSG"
    },
    dueDate: "2025-06-15"
  },
  status: "sent",
  currency: "S$",
  locale: "en-SG"
};

export const PDFTestPage: React.FC = () => {
  const [selectedData, setSelectedData] = useState<InvoiceData>(sampleInvoiceData);

  const loadSampleData = async () => {
    try {
      const response = await fetch('/data/sample-invoice.json');
      const data = await response.json();
      setSelectedData(data);
    } catch (error) {
      console.error('Failed to load sample data:', error);
    }
  };

  const loadComprehensiveData = async () => {
    try {
      const response = await fetch('/data/comprehensive-invoice.json');
      const data = await response.json();
      setSelectedData(data);
    } catch (error) {
      console.error('Failed to load comprehensive data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            PDF Generation Test Page
          </h1>
          <p className="text-gray-600 mb-6">
            Test the enhanced PDF generation system with different data sets.
          </p>
          
          <div className="flex gap-4 mb-6">
            <button
              onClick={loadSampleData}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Load Sample Data
            </button>
            <button
              onClick={loadComprehensiveData}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Load Comprehensive Data
            </button>
            <InvoiceActions invoiceData={selectedData} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Invoice Data</h2>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto max-h-96">
              {JSON.stringify(selectedData, null, 2)}
            </pre>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">PDF Preview</h2>
            <div className="border border-gray-200 rounded-lg" style={{ height: '600px' }}>
              <PDFPreview data={selectedData} className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
