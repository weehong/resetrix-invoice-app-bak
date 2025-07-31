import { useState } from 'react';
import { PDFService } from '@/lib/pdf-service';
import { InvoiceData } from '@/types/invoice';

export const usePDF = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePDF = async (data: InvoiceData, showPaymentSchedule: boolean = true) => {
    setIsGenerating(true);
    setError(null);

    try {
      const blob = await PDFService.generateInvoicePDF(data, showPaymentSchedule);
      return blob;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate PDF');
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPDF = async (data: InvoiceData, filename?: string, showPaymentSchedule: boolean = true) => {
    setIsGenerating(true);
    setError(null);

    try {
      await PDFService.downloadInvoicePDF(data, filename, showPaymentSchedule);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to download PDF');
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  const previewPDF = async (data: InvoiceData, showPaymentSchedule: boolean = true) => {
    setIsGenerating(true);
    setError(null);

    try {
      const url = await PDFService.previewInvoicePDF(data, showPaymentSchedule);
      return url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate preview');
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
