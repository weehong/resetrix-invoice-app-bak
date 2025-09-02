"use client";

import React, { useEffect } from "react";

import {
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import { CurrencyDisplay } from "@/components/CurrencyDisplay";
import { InvoiceItem } from "@/types/invoice-updated";

import { InvoiceFormData } from "../schemas/invoice-schema";

interface InvoiceItemsFormProps {
  register: UseFormRegister<InvoiceFormData>;
  errors: FieldErrors<InvoiceFormData>;
  setValue: UseFormSetValue<InvoiceFormData>;
  getValues: UseFormGetValues<InvoiceFormData>;
  watch: UseFormWatch<InvoiceFormData>;
  fields: FieldArrayWithId<InvoiceFormData, "items", "id">[];
  append: UseFieldArrayAppend<InvoiceFormData, "items">;
  remove: UseFieldArrayRemove;
}

/**
 * InvoiceItemsForm - Form section for managing invoice items
 *
 * Handles adding, removing, and updating invoice items with automatic calculations
 */
export function InvoiceItemsForm({
  register,
  errors,
  setValue,
  getValues,
  watch,
  fields,
  append,
  remove,
}: InvoiceItemsFormProps) {
  const watchedItems = watch("items");
  const watchedTax = watch("tax");
  const watchedCurrency = watch("currency");

  // Calculate item total based on quantity and rate
  const calculateItemTotal = (quantity: number, rate: number) => {
    return (quantity || 0) * (rate || 0);
  };

  // Calculate real-time subtotal from watched items
  const calculatedSubtotal =
    watchedItems?.reduce((sum, item) => {
      return sum + calculateItemTotal(item.quantity || 0, item.unitPrice || 0);
    }, 0) || 0;

  // Calculate real-time tax amount with validation
  const calculatedTaxAmount = watchedTax?.enabled
    ? calculatedSubtotal * Math.max(0, Math.min(1, watchedTax.rate || 0))
    : 0;

  // Calculate real-time total
  const calculatedTotal = calculatedSubtotal + calculatedTaxAmount;

  // Auto-update form values to keep them in sync with calculated values
  useEffect(() => {
    setValue("subtotal", calculatedSubtotal);
    setValue("tax.amount", calculatedTaxAmount);
    setValue("total", calculatedTotal);
  }, [calculatedSubtotal, calculatedTaxAmount, calculatedTotal, setValue]);

  const addItem = () => {
    const newItem = {
      id: Date.now().toString(),
      description: "New Service",
      quantity: 1,
      unitPrice: 0,
      total: 0,
    };
    append(newItem);
  };

  const updateItem = (
    index: number,
    field: keyof InvoiceItem,
    value: string | number,
  ) => {
    const currentItems = getValues("items");
    const updatedItem = {
      ...currentItems[index],
      [field]: value,
    };

    // Calculate total for this item if quantity or unitPrice changed
    if (field === "quantity" || field === "unitPrice") {
      const quantity =
        field === "quantity" ? Number(value) : updatedItem.quantity;
      const unitPrice =
        field === "unitPrice" ? Number(value) : updatedItem.unitPrice;
      updatedItem.total = quantity * unitPrice;
    }

    // Update the specific item
    setValue(`items.${index}`, updatedItem);
  };

  const removeItem = (index: number) => {
    remove(index);
  };

  return (
    <div className="border-b border-white/10 pb-12">
      <div className="card-header">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-indigo-600">
            Invoice Items
          </h2>
          <button onClick={addItem} className="btn">
            Add Item
          </button>
        </div>
      </div>
      <div className="mt-8">
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-12 items-center gap-2"
            >
              <div className="col-span-5">
                <textarea
                  rows={1}
                  placeholder="Description"
                  {...register(`items.${index}.description`)}
                  className="w-full rounded border p-2 text-sm resize-y min-h-[2.5rem]"
                  style={{ overflow: 'hidden' }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = target.scrollHeight + 'px';
                  }}
                />
                {errors.items?.[index]?.description && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.items[index]?.description?.message}
                  </p>
                )}
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  placeholder="Qty"
                  {...register(`items.${index}.quantity`, {
                    valueAsNumber: true,
                    onChange: (e) =>
                      updateItem(
                        index,
                        "quantity",
                        parseInt(e.target.value) || 0,
                      ),
                  })}
                  className="w-full rounded border p-2 text-sm"
                />
                {errors.items?.[index]?.quantity && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.items[index]?.quantity?.message}
                  </p>
                )}
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  {...register(`items.${index}.unitPrice`, {
                    valueAsNumber: true,
                    onChange: (e) =>
                      updateItem(
                        index,
                        "unitPrice",
                        parseFloat(e.target.value) || 0,
                      ),
                  })}
                  className="w-full rounded border p-2 text-sm"
                />
                {errors.items?.[index]?.unitPrice && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.items[index]?.unitPrice?.message}
                  </p>
                )}
              </div>
              <div className="col-span-2 p-2 text-sm font-medium">
                <CurrencyDisplay
                  amount={calculateItemTotal(
                    watchedItems?.[index]?.quantity || 0,
                    watchedItems?.[index]?.unitPrice || 0,
                  )}
                  currency={watchedCurrency}
                />
              </div>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="bg-primary-700 col-span-1 rounded px-2 py-1 text-sm text-white"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="card-footer">
        <div className="mt-4 border-t pt-4">
          <div className="grid grid-cols-4 space-y-3">
            {/* Tax Toggle Section */}
            <div>
              <input
                type="checkbox"
                {...register("tax.enabled")}
                className="text-primary-600 focus:ring-primary-500 h-4 w-4 rounded border-gray-300"
              />
              <label className="text-sm font-medium">Enable Tax</label>
            </div>
            <div className="col-span-2">
              <label className="text-sm">Tax Rate (%):</label>
            </div>
            <div>
              {watchedTax?.enabled && (
                <>
                  <div className="flex items-center justify-between">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      {...register("tax.rate", {
                        valueAsNumber: true,
                        validate: {
                          positive: (value) => {
                            // Value is already in decimal form (0-1)
                            return value >= 0 || "Tax rate cannot be negative";
                          },
                          maximum: (value) => {
                            // Value is already in decimal form (0-1)
                            return value <= 1 || "Tax rate cannot exceed 100%";
                          },
                        },
                        setValueAs: (value) => {
                          // Convert percentage input to decimal for storage (0-1)
                          const numValue = parseFloat(value);
                          if (isNaN(numValue)) return 0;
                          // Clamp the value between 0 and 100 (percentage), then convert to decimal
                          const clampedValue = Math.max(
                            0,
                            Math.min(100, numValue),
                          );
                          return clampedValue / 100;
                        },
                      })}
                      className={`rounded border p-1 text-sm ${errors.tax?.rate ? "border-red-500" : ""
                        }`}
                      placeholder="7"
                      defaultValue={
                        watchedTax?.rate
                          ? (watchedTax.rate * 100).toString()
                          : ""
                      }
                    />
                    <input
                      type="text"
                      {...register("tax.label")}
                      className="rounded border p-1 text-sm"
                      placeholder="GST"
                    />
                  </div>
                  {errors.tax?.rate && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.tax.rate.message}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4">
            <div></div>

            {/* Totals Section */}
            <div className="col-span-2 space-y-1 text-right">
              <div className="text-sm">Subtotal: </div>
            </div>
            <div>
              <div>
                <CurrencyDisplay
                  amount={calculatedSubtotal}
                  currency={watchedCurrency}
                />
              </div>
              {watchedTax?.enabled && (
                <div className="text-sm">
                  {watchedTax?.label || "Tax"} (
                  {Math.max(
                    0,
                    Math.min(100, (watchedTax?.rate || 0) * 100),
                  ).toFixed(0)}
                  %):{" "}
                  <CurrencyDisplay
                    amount={calculatedTaxAmount}
                    currency={watchedCurrency}
                  />
                </div>
              )}
              <div className="text-sm font-bold">
                Total:{" "}
                <CurrencyDisplay
                  amount={calculatedTotal}
                  currency={watchedCurrency}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
