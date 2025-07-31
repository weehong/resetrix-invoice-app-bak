'use client';

import React from 'react';
import { InvoiceData } from '@/types/invoice';
import { usePDF } from '@/hooks/usePDF';

interface InvoiceActionsProps {
  invoiceData: InvoiceData;
}

export const InvoiceActions: React.FC<InvoiceActionsProps> = ({ invoiceData }) => {
  const { downloadPDF, isGenerating } = usePDF();

  const handleDownload = async () => {
    try {
      await downloadPDF(invoiceData);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isGenerating ? 'Generating...' : 'Download PDF'}
      </button>
    </div>
  );
};