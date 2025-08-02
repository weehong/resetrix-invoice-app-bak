"use client";

import React from "react";

import { FieldErrors, UseFormRegister } from "react-hook-form";

import { InvoiceFormData } from "../schemas/invoice-schema";

interface ClientInformationFormProps {
  register: UseFormRegister<InvoiceFormData>;
  errors: FieldErrors<InvoiceFormData>;
}

/**
 * ClientInformationForm - Form section for client details
 *
 * Handles all client-related fields including contact information
 */
export function ClientInformationForm({
  register,
  errors,
}: ClientInformationFormProps) {
  return (
    <div className="border-b border-white/10 pb-12">
      <div className="card-header">
        <h2 className="text-xl font-semibold text-indigo-600">
          Client Information
        </h2>
      </div>
      <div className="mt-8">
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Client Name <span className="text-gray-500">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="Client Name (Optional)"
              {...register("client.name")}
              className="w-full rounded border p-2 text-sm"
            />
            {errors.client?.name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.client.name.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Client Company Name{" "}
              <span className="text-gray-500">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="Client Company Name (Optional)"
              {...register("client.companyName")}
              className="w-full rounded border p-2 text-sm"
            />
            {errors.client?.companyName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.client.companyName.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Address{" "}
              <span className="text-gray-500">(Optional, Multi-line)</span>
            </label>
            <textarea
              placeholder="Client Address&#10;(Multi-line supported)"
              {...register("client.address")}
              rows={3}
              className="resize-vertical w-full rounded border p-2 text-sm"
            />
            {errors.client?.address && (
              <p className="mt-1 text-sm text-red-600">
                {errors.client.address.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Postal Code <span className="text-gray-500">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="Postal Code (Optional)"
              {...register("client.postalCode")}
              className="w-full rounded border p-2 text-sm"
            />
            {errors.client?.postalCode && (
              <p className="mt-1 text-sm text-red-600">
                {errors.client.postalCode.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Email <span className="text-gray-500">(Optional)</span>
              </label>
              <input
                type="email"
                placeholder="Email (Optional)"
                {...register("client.email")}
                className="w-full rounded border p-2 text-sm"
              />
              {errors.client?.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.client.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Phone <span className="text-gray-500">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="Phone (Optional)"
                {...register("client.phone")}
                className="w-full rounded border p-2 text-sm"
              />
              {errors.client?.phone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.client.phone.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Registration Number{" "}
              <span className="text-gray-500">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="Registration Number (Optional)"
              {...register("client.registrationNumber")}
              className="w-full rounded border p-2 text-sm"
            />
            {errors.client?.registrationNumber && (
              <p className="mt-1 text-sm text-red-600">
                {errors.client.registrationNumber.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
