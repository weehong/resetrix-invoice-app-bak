"use client";

import React, { useMemo } from "react";

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

import { InvoiceFormData } from "../schemas/invoice-schema";

interface PaymentScheduleFormProps {
  register: UseFormRegister<InvoiceFormData>;
  errors: FieldErrors<InvoiceFormData>;
  setValue: UseFormSetValue<InvoiceFormData>;
  getValues: UseFormGetValues<InvoiceFormData>;
  watch: UseFormWatch<InvoiceFormData>;
  showPaymentSchedule: boolean;
  setShowPaymentSchedule: (show: boolean) => void;
  paymentFields: FieldArrayWithId<InvoiceFormData, "paymentSchedule", "id">[];
  appendPayment: UseFieldArrayAppend<InvoiceFormData, "paymentSchedule">;
  removePayment: UseFieldArrayRemove;
}

/**
 * PaymentScheduleForm - Form section for managing payment schedule
 *
 * Handles payment schedule entries with percentage validation and bank details
 */
export function PaymentScheduleForm({
  register,
  errors,
  setValue,
  getValues: _getValues,
  watch,
  showPaymentSchedule,
  setShowPaymentSchedule,
  paymentFields,
  appendPayment,
  removePayment,
}: PaymentScheduleFormProps) {
  const watchedTotal = watch("total");
  const watchedPaymentSchedule = watch("paymentSchedule");
  const watchedCurrency = watch("currency");

  // Calculate total percentage for payment schedule
  const totalPercentage = useMemo(() => {
    if (!watchedPaymentSchedule || watchedPaymentSchedule.length === 0)
      return 0;
    return watchedPaymentSchedule.reduce(
      (sum, entry) => sum + (entry.percentage || 0),
      0,
    );
  }, [watchedPaymentSchedule]);

  // Calculate remaining percentage and amount
  const remainingPercentage = useMemo(() => {
    return 100 - totalPercentage;
  }, [totalPercentage]);

  // Payment schedule functions
  const addPaymentEntry = () => {
    const newEntry = {
      id: Date.now().toString(),
      description: "New payment term",
      percentage: 0,
      amount: 0,
    };
    appendPayment(newEntry);
  };

  const removePaymentEntry = (index: number) => {
    removePayment(index);
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Payment Schedule</h3>
          <div className="flex items-center gap-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="include-payment-schedule"
                name="paymentScheduleOption"
                checked={showPaymentSchedule === true}
                onChange={() => setShowPaymentSchedule(true)}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="include-payment-schedule"
                className="text-sm font-medium text-gray-700"
              >
                Include
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="skip-payment-schedule"
                name="paymentScheduleOption"
                checked={showPaymentSchedule === false}
                onChange={() => setShowPaymentSchedule(false)}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="skip-payment-schedule"
                className="text-sm font-medium text-gray-700"
              >
                Skip
              </label>
            </div>
          </div>
        </div>
      </div>

      {showPaymentSchedule && (
        <>
          <div className="card-body">
            <div className="space-y-4">
              <h4 className="text-md mb-3 font-medium">Bank Details</h4>
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Bank Name <span className="text-gray-500">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Bank Name"
                    {...register("payment.bankDetails.bankName")}
                    className="w-full rounded border p-2"
                  />
                  {errors.payment?.bankDetails?.bankName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.payment.bankDetails.bankName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Account Name{" "}
                    <span className="text-gray-500">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Account Name"
                    {...register("payment.bankDetails.accountName")}
                    className="w-full rounded border p-2"
                  />
                  {errors.payment?.bankDetails?.accountName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.payment.bankDetails.accountName.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Account Number{" "}
                      <span className="text-gray-500">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Account Number"
                      {...register("payment.bankDetails.accountNumber")}
                      className="w-full rounded border p-2"
                    />
                    {errors.payment?.bankDetails?.accountNumber && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.payment.bankDetails.accountNumber.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      SWIFT Code{" "}
                      <span className="text-gray-500">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="SWIFT Code"
                      {...register("payment.bankDetails.swiftCode")}
                      className="w-full rounded border p-2"
                    />
                    {errors.payment?.bankDetails?.swiftCode && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.payment.bankDetails.swiftCode.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="py-2"></div>

              {/* Editable Payment Schedule Entries */}
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-md font-medium">
                  Payment Schedule Entries
                </h4>
                <button
                  type="button"
                  onClick={addPaymentEntry}
                  className="bg-primary-700 rounded px-3 py-1 text-sm text-white"
                >
                  Add Entry
                </button>
              </div>
              <div className="space-y-3">
                {paymentFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-12 items-center gap-2"
                  >
                    <div className="col-span-5">
                      <input
                        type="text"
                        placeholder="Description (e.g., Upon signing)"
                        {...register(`paymentSchedule.${index}.description`)}
                        className="w-full rounded border p-2 text-sm"
                      />
                      {errors.paymentSchedule?.[index]?.description && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.paymentSchedule[index]?.description?.message}
                        </p>
                      )}
                    </div>
                    <div className="col-span-3">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Percentage"
                        {...register(`paymentSchedule.${index}.percentage`, {
                          valueAsNumber: true,
                        })}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value) || 0;

                          // Calculate what the total percentage would be with this new value
                          const currentTotal =
                            watchedPaymentSchedule?.reduce(
                              (sum, entry, idx) => {
                                if (idx === index) return sum; // Skip current field
                                return sum + (entry.percentage || 0);
                              },
                              0,
                            ) || 0;

                          // Cap the percentage to prevent total from exceeding 100%
                          const maxAllowedPercentage = 100 - currentTotal;
                          const cappedValue = Math.min(
                            value,
                            maxAllowedPercentage,
                          );

                          setValue(
                            `paymentSchedule.${index}.percentage`,
                            cappedValue,
                            {
                              shouldValidate: true,
                              shouldDirty: true,
                            },
                          );
                          // Trigger immediate amount calculation
                          const newAmount =
                            ((watchedTotal || 0) * cappedValue) / 100;
                          setValue(
                            `paymentSchedule.${index}.amount`,
                            newAmount,
                            {
                              shouldValidate: false,
                              shouldDirty: false,
                            },
                          );
                        }}
                        className={`w-full rounded border p-2 text-sm ${
                          (watchedPaymentSchedule?.[index]?.percentage || 0) >
                          100
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                      />
                      {errors.paymentSchedule?.[index]?.percentage && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.paymentSchedule[index]?.percentage?.message}
                        </p>
                      )}
                      {(watchedPaymentSchedule?.[index]?.percentage || 0) >
                        100 && (
                        <p className="mt-1 text-xs text-red-600">
                          Cannot exceed 100%
                        </p>
                      )}
                    </div>
                    <div className="col-span-3 p-2 text-right font-mono text-sm text-gray-600">
                      {watchedTotal && (
                        <span className="text-gray-600">
                          <CurrencyDisplay
                            amount={
                              ((watchedTotal || 0) *
                                (watchedPaymentSchedule?.[index]?.percentage ||
                                  0)) /
                              100
                            }
                            currency={watchedCurrency}
                          />
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removePaymentEntry(index)}
                      className="bg-primary-700 col-span-1 rounded px-2 py-1 text-sm text-white"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {/* Total percentage validation display */}
              {paymentFields.length > 0 && (
                <div className="mt-4 pt-4">
                  <div className="text-right">
                    <div className="text-sm">
                      <span
                        className={
                          totalPercentage > 100
                            ? "font-bold text-red-600"
                            : totalPercentage === 100
                              ? "font-bold text-green-600"
                              : "text-gray-600"
                        }
                      >
                        Total Percentage: {totalPercentage.toFixed(2)}%
                      </span>
                    </div>
                    <div
                      className={`text-sm font-medium ${
                        remainingPercentage < 0
                          ? "text-red-600"
                          : remainingPercentage === 0
                            ? "text-green-600"
                            : "text-gray-600"
                      }`}
                    >
                      {remainingPercentage >= 0
                        ? `Remaining: ${remainingPercentage.toFixed(2)}%`
                        : `Over by: ${Math.abs(remainingPercentage).toFixed(2)}%`}
                    </div>
                    {totalPercentage > 100 && (
                      <div className="mt-2 rounded-md border border-red-400 bg-red-100 px-3 py-2">
                        <p className="text-sm font-medium text-red-800">
                          Error: Total percentage exceeds 100%. Please adjust
                          your payment schedule entries.
                        </p>
                      </div>
                    )}
                    {errors.paymentSchedule && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.paymentSchedule.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
