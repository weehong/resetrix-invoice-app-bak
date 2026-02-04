"use client";

import React, { useState, useEffect, useRef } from "react";

import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";

import { getCurrencyOptions } from "@/utils/currency";
import {
  ColumnConfig,
  addColumn,
  removeColumn,
  updateColumn,
  validateColumnKey,
  syncItemsWithColumns
} from "@/utils/column-management";

import { InvoiceFormData } from "../schemas/invoice-schema";

interface InvoiceDetailsFormProps {
  register: UseFormRegister<InvoiceFormData>;
  errors: FieldErrors<InvoiceFormData>;
  setValue: UseFormSetValue<InvoiceFormData>;
  watch: UseFormWatch<InvoiceFormData>;
}

/**
 * InvoiceDetailsForm - Form section for basic invoice details
 *
 * Handles invoice number, invoice date, due date, and currency fields
 */
export function InvoiceDetailsForm({
  register,
  errors,
  setValue,
  watch,
}: InvoiceDetailsFormProps) {
  const currencyOptions = getCurrencyOptions();
  const [newColumnLabel, setNewColumnLabel] = useState("");
  const [newColumnKey, setNewColumnKey] = useState("");
  const [newColumnType, setNewColumnType] = useState<"text" | "number" | "currency">("text");
  const [editingColumn, setEditingColumn] = useState<string | null>(null);

  const watchedColumns = watch("columns") || [];
  const watchedItems = watch("items") || [];
  const previousColumnsRef = useRef<ColumnConfig[]>(watchedColumns);

  // Synchronize items when columns change
  useEffect(() => {
    const currentColumns = watchedColumns;
    const previousColumns = previousColumnsRef.current;

    // Check if columns have actually changed
    if (JSON.stringify(currentColumns) !== JSON.stringify(previousColumns)) {
      const syncedItems = syncItemsWithColumns(watchedItems, previousColumns, currentColumns);
      setValue("items", syncedItems);
      previousColumnsRef.current = currentColumns;
    }
  }, [watchedColumns, watchedItems, setValue]);

  const handleAddColumn = () => {
    if (!newColumnLabel.trim() || !newColumnKey.trim()) return;

    const keyError = validateColumnKey(newColumnKey, watchedColumns);
    if (keyError) {
      alert(keyError);
      return;
    }

    const newColumns = addColumn(watchedColumns, {
      key: newColumnKey.trim(),
      label: newColumnLabel.trim(),
      type: newColumnType,
      required: false,
    });

    setValue("columns", newColumns);
    setNewColumnLabel("");
    setNewColumnKey("");
    setNewColumnType("text");
  };

  const handleRemoveColumn = (columnId: string) => {
    const column = watchedColumns.find(col => col.id === columnId);
    if (column?.required) {
      alert("Cannot remove required columns");
      return;
    }

    const newColumns = removeColumn(watchedColumns, columnId);
    setValue("columns", newColumns);
  };

  const handleUpdateColumn = (columnId: string, updates: Partial<ColumnConfig>) => {
    if (updates.key) {
      const keyError = validateColumnKey(updates.key, watchedColumns, columnId);
      if (keyError) {
        alert(keyError);
        return;
      }
    }

    const newColumns = updateColumn(watchedColumns, columnId, updates);
    setValue("columns", newColumns);
    setEditingColumn(null);
  };

  return (
    <div className="border-b border-white/10 pb-12">
      <h2 className="text-xl font-semibold text-indigo-600">Invoice Details</h2>
      <div className="mt-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="invoiceNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Invoice Number <span className="text-error-500">*</span>
            </label>
            <div className="mt-1">
              <input
                id="invoiceNumber"
                type="text"
                {...register("invoiceNumber")}
                className={`focus:border-accent-500 focus:ring-accent-500 block w-full rounded-md border-gray-300 text-sm shadow-sm ${errors.invoiceNumber ? "error-input" : ""
                  }`}
                placeholder="INV-001"
              />
              {errors.invoiceNumber && (
                <p className="text-error-600 mt-2 text-sm">
                  {errors.invoiceNumber.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="currency"
              className="block text-sm font-medium text-gray-700"
            >
              Currency <span className="text-error-500">*</span>
            </label>
            <div className="mt-1">
              <select
                id="currency"
                {...register("currency")}
                className={`focus:border-accent-500 focus:ring-accent-500 block w-full rounded-md border-gray-300 text-sm shadow-sm ${errors.currency ? "error-input" : ""
                  }`}
              >
                {currencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.currency && (
                <p className="text-error-600 mt-2 text-sm">
                  {errors.currency.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="invoiceDate"
              className="block text-sm font-medium text-gray-700"
            >
              Invoice Date <span className="text-error-500">*</span>
            </label>
            <div className="mt-1">
              <input
                id="invoiceDate"
                type="date"
                {...register("invoiceDate")}
                className={`focus:border-accent-500 focus:ring-accent-500 block w-full rounded-md border-gray-300 text-sm shadow-sm ${errors.invoiceDate ? "error-input" : ""
                  }`}
              />
              {errors.invoiceDate && (
                <p className="text-error-600 mt-2 text-sm">
                  {errors.invoiceDate.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700"
            >
              Due Date <span className="text-error-500">*</span>
            </label>
            <div className="mt-1">
              <input
                id="dueDate"
                type="date"
                {...register("dueDate")}
                className={`focus:border-accent-500 focus:ring-accent-500 block w-full rounded-md border-gray-300 text-sm shadow-sm ${errors.dueDate ? "error-input" : ""
                  }`}
              />
              {errors.dueDate && (
                <p className="text-error-600 mt-2 text-sm">
                  {errors.dueDate.message}
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Dynamic Column Management */}
        <div className="mt-8 pt-8">
          <h2 className="text-xl font-semibold text-indigo-600">
            Customize Table Columns
          </h2>

          {/* Existing Columns */}
          <div className="mt-4 space-y-3">
            {watchedColumns
              .sort((a, b) => a.order - b.order)
              .map((column) => (
                <div key={column.id} className="flex items-center gap-3 p-3 border rounded-md bg-gray-50">
                  <div className="flex-1">
                    {editingColumn === column.id ? (
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          defaultValue={column.label}
                          placeholder="Column Label"
                          className="px-2 py-1 border rounded text-sm"
                          onBlur={(e) => handleUpdateColumn(column.id, { label: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleUpdateColumn(column.id, { label: e.currentTarget.value });
                            }
                          }}
                        />
                        <input
                          type="text"
                          defaultValue={column.key}
                          placeholder="Column Key"
                          className="px-2 py-1 border rounded text-sm"
                          disabled={column.required}
                          onBlur={(e) => handleUpdateColumn(column.id, { key: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleUpdateColumn(column.id, { key: e.currentTarget.value });
                            }
                          }}
                        />
                        <select
                          defaultValue={column.type}
                          className="px-2 py-1 border rounded text-sm"
                          onChange={(e) => handleUpdateColumn(column.id, { type: e.target.value as any })}
                        >
                          <option value="text">Text</option>
                          <option value="number">Number</option>
                          <option value="currency">Currency</option>
                        </select>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{column.label}</span>
                        <span className="text-sm text-gray-500">({column.key})</span>
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                          {column.type}
                        </span>
                        {column.required && (
                          <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded">
                            Required
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingColumn(editingColumn === column.id ? null : column.id)}
                      className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      {editingColumn === column.id ? 'Done' : 'Edit'}
                    </button>
                    {!column.required && (
                      <button
                        type="button"
                        onClick={() => handleRemoveColumn(column.id)}
                        className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>

          {/* Add New Column */}
          <div className="mt-6 p-4 border-2 border-dashed border-gray-300 rounded-md">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Add New Column</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
              <input
                type="text"
                placeholder="Column Label"
                value={newColumnLabel}
                onChange={(e) => setNewColumnLabel(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm focus:border-accent-500 focus:ring-accent-500"
              />
              <input
                type="text"
                placeholder="Column Key (e.g., custom_field)"
                value={newColumnKey}
                onChange={(e) => setNewColumnKey(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm focus:border-accent-500 focus:ring-accent-500"
              />
              <select
                value={newColumnType}
                onChange={(e) => setNewColumnType(e.target.value as any)}
                className="px-3 py-2 border rounded-md text-sm focus:border-accent-500 focus:ring-accent-500"
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="currency">Currency</option>
              </select>
              <button
                type="button"
                onClick={handleAddColumn}
                disabled={!newColumnLabel.trim() || !newColumnKey.trim()}
                className="px-4 py-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Add Column
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
