"use client";

import React, { useState } from "react";

import Image from "next/image";

import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import { InvoiceFormData } from "../schemas/invoice-schema";
import { convertFileToBase64, validateImageFile } from "../utils/file-utils";

interface CompanyInformationFormProps {
  register: UseFormRegister<InvoiceFormData>;
  errors: FieldErrors<InvoiceFormData>;
  setValue: UseFormSetValue<InvoiceFormData>;
  watch: UseFormWatch<InvoiceFormData>;
}

/**
 * CompanyInformationForm - Form section for company details and logo upload
 *
 * Handles all company-related fields including logo upload functionality
 */
export function CompanyInformationForm({
  register,
  errors,
  setValue,
  watch,
}: CompanyInformationFormProps) {
  const [logoError, setLogoError] = useState<string | null>(null);
  const watchedLogo = watch("company.logo");

  // Handle logo upload
  const handleLogoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLogoError(null);

    const validationError = validateImageFile(file);
    if (validationError) {
      setLogoError(validationError);
      return;
    }

    try {
      const base64String = await convertFileToBase64(file);
      setValue("company.logo", base64String);
    } catch (error) {
      setLogoError("Failed to upload image. Please try again.");
      console.error("Logo upload error:", error);
    }
  };

  // Remove logo
  const handleRemoveLogo = () => {
    setValue("company.logo", "");
    setLogoError(null);
  };

  return (
    <div className="border-b border-white/10 pb-12">
      <div className="card-header">
        <h2 className="text-xl font-semibold text-indigo-600">
          Company Information
        </h2>
      </div>
      <div className="mt-8">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="companyOwnerName"
              className="block text-sm font-medium text-gray-700"
            >
              Company Owner Name{" "}
              <span className="text-gray-500">(Optional)</span>
            </label>
            <div className="mt-1">
              <input
                id="companyOwnerName"
                type="text"
                placeholder="Company Owner Name (Optional)"
                {...register("company.ownerName")}
                className={`focus:border-accent-500 focus:ring-accent-500 block w-full rounded-md border-gray-300 text-sm shadow-sm ${
                  errors.company?.ownerName ? "error-input" : ""
                }`}
              />
              {errors.company?.ownerName && (
                <p className="text-error-600 mt-2 text-sm">
                  {errors.company.ownerName.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-gray-700"
            >
              Company Name <span className="text-error-500">*</span>
            </label>
            <div className="mt-1">
              <input
                id="companyName"
                type="text"
                placeholder="Company Name"
                {...register("company.name")}
                className={`focus:border-accent-500 focus:ring-accent-500 block w-full rounded-md border-gray-300 text-sm shadow-sm ${
                  errors.company?.name ? "error-input" : ""
                }`}
              />
              {errors.company?.name && (
                <p className="text-error-600 mt-2 text-sm">
                  {errors.company.name.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="companyRegistrationNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Company Registration Number{" "}
              <span className="text-gray-500">(Optional)</span>
            </label>
            <div className="mt-1">
              <input
                id="companyRegistrationNumber"
                type="text"
                placeholder="Company Registration Number (Optional)"
                {...register("company.registrationNumber")}
                className={`focus:border-accent-500 focus:ring-accent-500 block w-full rounded-md border-gray-300 text-sm shadow-sm ${
                  errors.company?.registrationNumber ? "error-input" : ""
                }`}
              />
              {errors.company?.registrationNumber && (
                <p className="text-error-600 mt-2 text-sm">
                  {errors.company.registrationNumber.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="companyAddress"
              className="block text-sm font-medium text-gray-700"
            >
              Company Address <span className="text-error-500">*</span>
            </label>
            <div className="mt-1">
              <textarea
                id="companyAddress"
                placeholder="Company Address&#10;(Multi-line supported)"
                {...register("company.address")}
                rows={3}
                className={`focus:border-accent-500 focus:ring-accent-500 block w-full resize-y rounded-md border-gray-300 text-sm shadow-sm ${
                  errors.company?.address ? "error-input" : ""
                }`}
              />
              {errors.company?.address && (
                <p className="text-error-600 mt-2 text-sm">
                  {errors.company.address.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="companyPostalCode"
              className="block text-sm font-medium text-gray-700"
            >
              Postal Code <span className="text-gray-500">(Optional)</span>
            </label>
            <div className="mt-1">
              <input
                id="companyPostalCode"
                type="text"
                placeholder="Postal Code (Optional)"
                {...register("company.postalCode")}
                className={`focus:border-accent-500 focus:ring-accent-500 block w-full rounded-md border-gray-300 text-sm shadow-sm ${
                  errors.company?.postalCode ? "error-input" : ""
                }`}
              />
              {errors.company?.postalCode && (
                <p className="text-error-600 mt-2 text-sm">
                  {errors.company.postalCode.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="companyEmail"
                className="block text-sm font-medium text-gray-700"
              >
                Email <span className="text-error-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="companyEmail"
                  type="email"
                  placeholder="Email"
                  {...register("company.email")}
                  className={`focus:border-accent-500 focus:ring-accent-500 block w-full rounded-md border-gray-300 text-sm shadow-sm ${
                    errors.company?.email ? "error-input" : ""
                  }`}
                />
                {errors.company?.email && (
                  <p className="text-error-600 mt-2 text-sm">
                    {errors.company.email.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="companyPhone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone <span className="text-error-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="companyPhone"
                  type="text"
                  placeholder="Phone"
                  {...register("company.phone")}
                  className={`focus:border-accent-500 focus:ring-accent-500 block w-full rounded-md border-gray-300 text-sm shadow-sm ${
                    errors.company?.phone ? "error-input" : ""
                  }`}
                />
                {errors.company?.phone && (
                  <p className="text-error-600 mt-2 text-sm">
                    {errors.company.phone.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Logo Upload Section */}
          <div>
            <label className="mb-4 block text-sm font-medium text-gray-700">
              Company Logo <span className="text-gray-500">(Optional)</span>
            </label>
            <div className="space-y-4">
              {watchedLogo ? (
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    <Image
                      src={watchedLogo}
                      alt="Company Logo"
                      className="h-20 w-20 rounded-lg border border-gray-300 bg-gray-50 object-contain"
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Logo uploaded successfully
                    </p>
                    <p className="text-sm text-gray-500">
                      Your logo will appear on generated invoices
                    </p>
                    <button
                      type="button"
                      onClick={handleRemoveLogo}
                      className="text-error-600 hover:text-error-700 mt-2 text-sm font-medium transition-colors duration-200"
                    >
                      Remove Logo
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 transition-colors duration-200 hover:border-gray-400">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="logo-upload"
                        className="text-accent-600 hover:text-accent-500 focus-within:ring-accent-500 relative cursor-pointer rounded-md bg-white font-medium focus-within:ring-2 focus-within:ring-offset-2 focus-within:outline-none"
                      >
                        <span>Upload a file</span>
                        <input
                          id="logo-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, SVG up to 5MB
                    </p>
                  </div>
                </div>
              )}
              {logoError && (
                <p className="text-error-600 bg-error-50 border-error-200 rounded-md border p-3 text-sm">
                  {logoError}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
