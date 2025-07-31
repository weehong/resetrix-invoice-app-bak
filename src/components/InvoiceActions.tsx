"use client";

import React from "react";

import { usePDF } from "@/hooks/usePDF";
import { InvoiceData } from "@/types/invoice";

interface InvoiceActionsProps {
  invoiceData: InvoiceData;
}

export const InvoiceActions: React.FC<InvoiceActionsProps> = ({
  invoiceData,
}) => {
  const { downloadPDF, isGenerating } = usePDF();

  const handleDownload = async () => {
    try {
      await downloadPDF(invoiceData);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className="bg-primary-800 hover:bg-primary-800 rounded px-4 py-2 text-white disabled:opacity-50"
      >
        {isGenerating ? "Generating..." : "Download PDF"}
      </button>
    </div>
  );
};
