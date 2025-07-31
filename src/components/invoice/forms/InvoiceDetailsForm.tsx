"use client";

import React from "react";

import { FieldErrors, UseFormRegister } from "react-hook-form";

import { getCurrencyOptions } from "@/utils/currency";

import { InvoiceFormData } from "../schemas/invoice-schema";

interface InvoiceDetailsFormProps {
  register: UseFormRegister<InvoiceFormData>;
  errors: FieldErrors<InvoiceFormData>;
}

/**
 * InvoiceDetailsForm - Form section for basic invoice details
 *
 * Handles invoice number, invoice date, due date, and currency fields
 */
export function InvoiceDetailsForm({
  register,
  errors,
}: InvoiceDetailsFormProps) {
  const currencyOptions = getCurrencyOptions();

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-lg font-semibold text-gray-900">Invoice Details</h3>
      </div>
      <div className="card-body">
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
                className={`focus:border-accent-500 focus:ring-accent-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${
                  errors.invoiceNumber ? "error-input" : ""
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
                className={`focus:border-accent-500 focus:ring-accent-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${
                  errors.currency ? "error-input" : ""
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
                className={`focus:border-accent-500 focus:ring-accent-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${
                  errors.invoiceDate ? "error-input" : ""
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
                className={`focus:border-accent-500 focus:ring-accent-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${
                  errors.dueDate ? "error-input" : ""
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

        {/* Column Headers Customization */}
        <div className="mt-8 border-t border-gray-200 pt-8">
          <h4 className="mb-6 text-lg font-medium text-gray-900">
            Customize Table Column Headers
          </h4>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="descriptionColumn"
                className="block text-sm font-medium text-gray-700"
              >
                Description Column
              </label>
              <div className="mt-1">
                <input
                  id="descriptionColumn"
                  type="text"
                  {...register("columnHeaders.description")}
                  className={`focus:border-accent-500 focus:ring-accent-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${
                    errors.columnHeaders?.description ? "error-input" : ""
                  }`}
                  placeholder="Description"
                />
                {errors.columnHeaders?.description && (
                  <p className="text-error-600 mt-2 text-sm">
                    {errors.columnHeaders.description.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="quantityColumn"
                className="block text-sm font-medium text-gray-700"
              >
                Quantity Column
              </label>
              <div className="mt-1">
                <input
                  id="quantityColumn"
                  type="text"
                  {...register("columnHeaders.quantity")}
                  className={`focus:border-accent-500 focus:ring-accent-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${
                    errors.columnHeaders?.quantity ? "error-input" : ""
                  }`}
                  placeholder="Quantity"
                />
                {errors.columnHeaders?.quantity && (
                  <p className="text-error-600 mt-2 text-sm">
                    {errors.columnHeaders.quantity.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="rateColumn"
                className="block text-sm font-medium text-gray-700"
              >
                Rate Column
              </label>
              <div className="mt-1">
                <input
                  id="rateColumn"
                  type="text"
                  {...register("columnHeaders.rate")}
                  className={`focus:border-accent-500 focus:ring-accent-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${
                    errors.columnHeaders?.rate ? "error-input" : ""
                  }`}
                  placeholder="Rate"
                />
                {errors.columnHeaders?.rate && (
                  <p className="text-error-600 mt-2 text-sm">
                    {errors.columnHeaders.rate.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="totalColumn"
                className="block text-sm font-medium text-gray-700"
              >
                Total Column
              </label>
              <div className="mt-1">
                <input
                  id="totalColumn"
                  type="text"
                  {...register("columnHeaders.total")}
                  className={`focus:border-accent-500 focus:ring-accent-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${
                    errors.columnHeaders?.total ? "error-input" : ""
                  }`}
                  placeholder="Total"
                />
                {errors.columnHeaders?.total && (
                  <p className="text-error-600 mt-2 text-sm">
                    {errors.columnHeaders.total.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
