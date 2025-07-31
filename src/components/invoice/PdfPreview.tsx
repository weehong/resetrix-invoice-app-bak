"use client";

import React from "react";

interface PdfPreviewProps {
  pdfUrl: string | null;
  isGenerating: boolean;
}

/**
 * PdfPreview - Component for displaying PDF preview
 *
 * Shows the generated PDF in an iframe or loading/placeholder states
 */
export function PdfPreview({ pdfUrl, isGenerating }: PdfPreviewProps) {
  if (pdfUrl) {
    return (
      <div className="overflow-hidden rounded-lg border border-gray-300">
        <div className="border-b bg-gray-100 px-4 py-2">
          <h2 className="text-lg font-semibold">PDF Preview</h2>
        </div>
        <div className="relative h-[calc(100vh-8rem)]">
          <iframe
            src={pdfUrl}
            width="100%"
            height="100%"
            className="border-0"
            title="PDF Preview"
          />
        </div>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center rounded-lg border border-gray-300">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Generating PDF...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] items-center justify-center rounded-lg border border-gray-300 text-gray-500">
      <p>Click &ldquo;Generate Preview&rdquo; to view the PDF</p>
    </div>
  );
}
