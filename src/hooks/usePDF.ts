import { useState } from 'react';
import { PDFService } from '@/lib/pdf-service';
import { InvoiceData } from '@/types/invoice';

export const usePDF = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePDF = async (data: InvoiceData) => {
    setIsGenerating(true);
    setError(null);

    try {
      const blob = await PDFService.generateInvoicePDF(data);
      return blob;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate PDF');
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPDF = async (data: InvoiceData, filename?: string) => {
    setIsGenerating(true);
    setError(null);

    try {
      await PDFService.downloadInvoicePDF(data, filename);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to download PDF');
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  const previewPDF = async (data: InvoiceData) => {
    setIsGenerating(true);
    setError(null);

    try {
      const url = await PDFService.previewInvoicePDF(data);
      return url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to preview PDF');
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generatePDF,
    downloadPDF,
    previewPDF,
    isGenerating,
    error,
  };
};