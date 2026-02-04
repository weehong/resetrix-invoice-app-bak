"use client";

import React, { useRef } from "react";

interface ActionButtonsProps {
  onGeneratePreview: () => void;
  onDownload: () => void;
  isGenerating: boolean;
  isDisabled: boolean;
  error?: string | null;
  onExportJson?: () => void;
  onImportJson?: (file: File) => void;
  onClearDraft?: () => void;
}

/**
 * ActionButtons - Component for PDF generation and download actions
 *
 * Handles the generate preview and download PDF buttons with loading states
 */
export function ActionButtons({
  onGeneratePreview,
  onDownload,
  isGenerating,
  isDisabled,
  error,
  onExportJson,
  onImportJson,
  onClearDraft,
}: ActionButtonsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImportJson) {
      onImportJson(file);
    }
    // Reset input so the same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="sticky top-0 z-50 mb-8 h-16 border-b border-gray-200 bg-white">
      <div className="flex h-16 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="bg-accent-100 flex h-8 w-8 items-center justify-center rounded-lg">
                <svg
                  className="text-accent-600 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {isGenerating ? "Generating PDF..." : "Ready to generate"}
              </p>
              <p className="text-sm text-gray-500">
                {isDisabled
                  ? "Fix validation errors to continue"
                  : "Fill out the form and generate your invoice"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {onExportJson && (
            <button
              onClick={onExportJson}
              className="btn btn-secondary"
              title="Save invoice data as JSON file"
            >
              Save JSON
            </button>
          )}

          {onImportJson && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn btn-secondary"
                title="Load invoice data from JSON file"
              >
                Load JSON
              </button>
            </>
          )}

          {onClearDraft && (
            <button
              onClick={onClearDraft}
              className="btn btn-secondary"
              title="Clear saved draft and reset form"
            >
              Clear Draft
            </button>
          )}

          <button
            onClick={onGeneratePreview}
            disabled={isGenerating || isDisabled}
            className="btn btn-secondary"
          >
            {isGenerating ? (
              <>
                <div className="loading-spinner mr-2 h-4 w-4"></div>
              </>
            ) : (
              <span>Preview</span>
            )}
          </button>

          <button
            onClick={onDownload}
            disabled={isGenerating || isDisabled}
            className="btn btn-primary"
          >
            {isGenerating ? (
              <>
                <div className="loading-spinner mr-2 h-4 w-4"></div>
              </>
            ) : (
              <span>Download PDF</span>
            )}
          </button>
        </div>
      </div>

      {/* Error and Warning Messages */}
      {isDisabled && (
        <div className="bg-warning-50 border-warning-200 mt-4 rounded-md border p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="text-warning-400 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-warning-800 text-sm font-medium">
                Validation Error
              </h3>
              <div className="text-warning-700 mt-2 text-sm">
                <p>
                  Total percentage exceeds 100%. Please adjust payment schedule
                  entries before generating the invoice.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-error-50 border-error-200 mt-4 rounded-md border p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="text-error-400 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-error-800 text-sm font-medium">
                Generation Error
              </h3>
              <div className="text-error-700 mt-2 text-sm">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
