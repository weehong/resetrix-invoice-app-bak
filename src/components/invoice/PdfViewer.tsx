"use client";

import React, { useCallback, useEffect, useState } from "react";

import { useFieldArray, useForm } from "react-hook-form";

import { useInvoicePersistence } from "@/hooks/useInvoicePersistence";
import { usePDF } from "@/hooks/usePDF";
import { InvoiceData } from "@/types/invoice-updated";
import { getDefaultColumns } from "@/utils/column-management";

// Import extracted components and utilities
import { ActionButtons } from "./ActionButtons";
import { PdfPreview } from "./PdfPreview";
import { defaultInvoiceData } from "./data/default-invoice-data";
import {
  ClientInformationForm,
  CompanyInformationForm,
  InvoiceDetailsForm,
  InvoiceItemsForm,
  PaymentScheduleForm,
} from "./forms";
import { type InvoiceFormData } from "./schemas/invoice-schema";

interface PdfViewerProps {
  /** Initial invoice data to populate the form */
  initialData?: Partial<InvoiceData>;
  /** Whether to show the payment schedule section by default */
  showPaymentSchedule?: boolean;
  /** Callback fired when invoice data changes */
  onDataChange?: (data: InvoiceData) => void;
  /** Custom className for styling */
  className?: string;
}

/**
 * PdfViewer - A comprehensive invoice PDF generator component
 *
 * This component provides a complete interface for creating, editing, and generating
 * invoice PDFs with real-time preview functionality. It includes form validation,
 * dynamic calculations, file upload support, and payment schedule management.
 *
 * @example
 * ```tsx
 * <PdfViewer
 *   initialData={customInvoiceData}
 *   showPaymentSchedule={true}
 *   onDataChange={(data) => console.log(data)}
 * />
 * ```
 */
export default function PdfViewer({
  initialData = {},
  showPaymentSchedule: initialShowPaymentSchedule = false,
  onDataChange,
  className: _className = "",
}: PdfViewerProps) {
  const { previewPDF, downloadPDF, isGenerating, error } = usePDF();
  const {
    saveToLocalStorage,
    loadFromLocalStorage,
    clearLocalStorage,
    exportToJsonFile,
    importFromJsonFile,
  } = useInvoicePersistence();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [showPaymentSchedule, setShowPaymentSchedule] = useState<boolean>(
    initialShowPaymentSchedule,
  );

  // Merge default data with initial data
  const mergedInitialData: InvoiceFormData = {
    ...defaultInvoiceData,
    ...initialData,
    currency: initialData?.currency || defaultInvoiceData.currency,
    columns: initialData?.columns || defaultInvoiceData.columns || getDefaultColumns(),
    company: {
      ...defaultInvoiceData.company,
      ...initialData?.company,
    },
    client: {
      ...defaultInvoiceData.client,
      ...initialData?.client,
    },
    items: initialData?.items || defaultInvoiceData.items,
    payment: initialData?.payment
      ? {
        ...defaultInvoiceData.payment,
        ...initialData.payment,
      }
      : defaultInvoiceData.payment,
    paymentSchedule:
      initialData?.paymentSchedule || defaultInvoiceData.paymentSchedule,
  };

  // Load saved draft from localStorage, falling back to merged initial data
  const [resolvedDefaults] = useState<InvoiceFormData>(() => {
    const saved = loadFromLocalStorage();
    return saved || mergedInitialData;
  });

  // Initialize React Hook Form
  const form = useForm<InvoiceFormData>({
    // resolver: zodResolver(invoiceSchema),
    defaultValues: resolvedDefaults,
    mode: "onChange",
  });

  const {
    control,
    register,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = form;

  // Set up field array for invoice items
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  // Set up field array for payment schedule
  const {
    fields: paymentFields,
    append: appendPayment,
    remove: removePayment,
  } = useFieldArray({
    control,
    name: "paymentSchedule",
  });

  // Watch items for real-time calculations
  const watchedItems = watch("items");
  const watchedTotal = watch("total");
  const watchedPaymentSchedule = watch("paymentSchedule");

  // Calculate total percentage for payment schedule
  const totalPercentage = React.useMemo(() => {
    if (!watchedPaymentSchedule || watchedPaymentSchedule.length === 0)
      return 0;
    return watchedPaymentSchedule.reduce(
      (sum, entry) => sum + (entry.percentage || 0),
      0,
    );
  }, [watchedPaymentSchedule]);

  // Calculate totals whenever items change
  useEffect(() => {
    if (watchedItems && watchedItems.length > 0) {
      const subtotal = watchedItems.reduce(
        (sum, item) => sum + (item.total || 0),
        0,
      );
      const taxAmount = subtotal * 0.07; // 7% tax
      const total = subtotal + taxAmount;

      setValue("subtotal", subtotal);
      setValue("tax.amount", taxAmount);
      setValue("total", total);
    }
  }, [watchedItems, setValue]);

  // Update payment schedule amounts when total changes
  useEffect(() => {
    if (watchedPaymentSchedule && watchedPaymentSchedule.length > 0) {
      watchedPaymentSchedule.forEach((entry, index) => {
        if (entry.percentage !== undefined && entry.percentage !== null) {
          const newAmount = ((watchedTotal || 0) * entry.percentage) / 100;
          setValue(`paymentSchedule.${index}.amount`, newAmount, {
            shouldValidate: false,
            shouldDirty: false,
            shouldTouch: false,
          });
        }
      });
    }
  }, [watchedTotal, watchedPaymentSchedule, setValue]);

  // Notify parent of data changes
  useEffect(() => {
    if (onDataChange) {
      const subscription = form.watch((value) => {
        onDataChange(value as InvoiceData);
      });
      return () => subscription.unsubscribe();
    }
  }, [form, onDataChange]);

  // Auto-save to localStorage on every form change (debounced)
  useEffect(() => {
    const subscription = form.watch((value) => {
      saveToLocalStorage(value as InvoiceFormData);
    });
    return () => subscription.unsubscribe();
  }, [form, saveToLocalStorage]);

  const handleExportJson = useCallback(() => {
    const data = form.getValues();
    exportToJsonFile(data);
  }, [form, exportToJsonFile]);

  const handleImportJson = useCallback(
    async (file: File) => {
      try {
        const data = await importFromJsonFile(file);
        form.reset(data);
      } catch (err) {
        console.error("Failed to import JSON:", err);
      }
    },
    [form, importFromJsonFile],
  );

  const handleClearDraft = useCallback(() => {
    clearLocalStorage();
    form.reset(mergedInitialData);
  }, [clearLocalStorage, form, mergedInitialData]);

  const handleGeneratePreview = async () => {
    try {
      const formData = getValues();
      const url = await previewPDF(
        formData as unknown as InvoiceData,
        showPaymentSchedule,
      );
      setPdfUrl(url);
    } catch (err) {
      console.error("Failed to generate PDF preview:", err);
    }
  };

  const handleDownload = async () => {
    try {
      const formData = getValues();
      await downloadPDF(
        formData as unknown as InvoiceData,
        `invoice-${formData.invoiceNumber}.pdf`,
        showPaymentSchedule,
      );
    } catch (err) {
      console.error("Failed to download PDF:", err);
    }
  };

  return (
    <>
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Create Invoice
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Generate professional invoices with our easy-to-use form builder
        </p>
      </div>

      <ActionButtons
        onGeneratePreview={handleGeneratePreview}
        onDownload={handleDownload}
        isGenerating={isGenerating}
        isDisabled={showPaymentSchedule && totalPercentage > 100}
        error={error}
        onExportJson={handleExportJson}
        onImportJson={handleImportJson}
        onClearDraft={handleClearDraft}
      />

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Invoice Form */}
        <div className="space-y-6">
          <InvoiceDetailsForm register={register} errors={errors} setValue={setValue} watch={watch} />

          <CompanyInformationForm
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />

          <ClientInformationForm register={register} errors={errors} />

          <InvoiceItemsForm
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            watch={watch}
            fields={fields}
            append={append}
            remove={remove}
          />

          <PaymentScheduleForm
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            watch={watch}
            showPaymentSchedule={showPaymentSchedule}
            setShowPaymentSchedule={setShowPaymentSchedule}
            paymentFields={paymentFields}
            appendPayment={appendPayment}
            removePayment={removePayment}
          />
        </div>

        {/* PDF Preview - Sticky */}
        <div className="space-y-6 lg:sticky lg:top-20 lg:self-start">
          <PdfPreview pdfUrl={pdfUrl} isGenerating={isGenerating} />
        </div>
      </div>
    </>
  );
}
