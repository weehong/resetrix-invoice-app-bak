'use client';

import React, { useEffect, useState } from 'react';
import { InvoiceData } from '@/types/invoice';
import { usePDF } from '@/hooks/usePDF';

interface PDFPreviewProps {
  data: InvoiceData;
  className?: string;
}

export const PDFPreview: React.FC<PDFPreviewProps> = ({ data, className }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { previewPDF, isGenerating, error } = usePDF();

  useEffect(() => {
    const generatePreview = async () => {
      try {
        const url = await previewPDF(data);
        setPreviewUrl(url);
      } catch (err) {
        console.error('Failed to generate preview:', err);
      }
    };

    generatePreview();

    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [data]);

  if (isGenerating) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p>Generating preview...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="text-center text-red-600">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!previewUrl) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <p>No preview available</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <iframe
        src={previewUrl}
        className="w-full h-full border-0"
        title="PDF Preview"
      />
    </div>
  );
};