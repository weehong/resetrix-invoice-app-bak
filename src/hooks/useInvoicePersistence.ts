"use client";

import { useCallback, useEffect, useRef } from "react";
import type { InvoiceFormData } from "@/components/invoice/schemas/invoice-schema";

const STORAGE_KEY = "invoice-draft";
const DEBOUNCE_MS = 1000;

export function useInvoicePersistence() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const saveToLocalStorage = useCallback((data: InvoiceFormData) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        console.error("Failed to save invoice draft:", e);
      }
    }, DEBOUNCE_MS);
  }, []);

  const loadFromLocalStorage = useCallback((): InvoiceFormData | null => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      // Basic shape validation
      if (parsed && parsed.invoiceNumber && parsed.items && parsed.company) {
        return parsed as InvoiceFormData;
      }
      return null;
    } catch {
      return null;
    }
  }, []);

  const clearLocalStorage = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const exportToJsonFile = useCallback(
    (data: InvoiceFormData, filename?: string) => {
      const name = filename || `invoice-${data.invoiceNumber || "draft"}.json`;
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    [],
  );

  const importFromJsonFile = useCallback(
    (file: File): Promise<InvoiceFormData> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const parsed = JSON.parse(e.target?.result as string);
            if (
              parsed &&
              parsed.invoiceNumber &&
              parsed.items &&
              parsed.company
            ) {
              resolve(parsed as InvoiceFormData);
            } else {
              reject(new Error("Invalid invoice JSON: missing required fields"));
            }
          } catch {
            reject(new Error("Failed to parse JSON file"));
          }
        };
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsText(file);
      });
    },
    [],
  );

  return {
    saveToLocalStorage,
    loadFromLocalStorage,
    clearLocalStorage,
    exportToJsonFile,
    importFromJsonFile,
  };
}
