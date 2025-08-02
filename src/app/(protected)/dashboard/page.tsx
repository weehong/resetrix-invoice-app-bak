import React from "react";

import Link from "next/link";

import { auth } from "@/lib/auth/auth";

/**
 * Dashboard Page
 *
 * Main dashboard for authenticated users providing access to key features
 * and overview of recent activity.
 */
export default async function Dashboard() {
  const session = await auth();

  return (
    <div className="py-10">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Welcome back{session?.user?.name ? `, ${session.user.name}` : ""}!
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Manage your invoices and generate professional PDFs
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Create Invoice */}
          <Link
            href="/pdf-viewer"
            className="card group transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            <div className="mt-8">
              <div className="mb-4 flex items-center">
                <div className="flex-shrink-0">
                  <div className="bg-accent-600 group-hover:bg-accent-700 flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="group-hover:text-accent-600 text-lg font-semibold text-gray-900 transition-colors duration-200">
                    Create Invoice
                  </h3>
                </div>
              </div>
              <p className="text-gray-600">
                Generate a new professional invoice PDF with our easy-to-use
                form builder
              </p>
            </div>
          </Link>

          {/* View Invoices */}
          <Link
            href="/invoices"
            className="card group transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            <div className="mt-8">
              <div className="mb-4 flex items-center">
                <div className="flex-shrink-0">
                  <div className="bg-primary-600 group-hover:bg-primary-700 flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200">
                    <svg
                      className="h-6 w-6 text-white"
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
                <div className="ml-4">
                  <h3 className="group-hover:text-primary-600 text-lg font-semibold text-gray-900 transition-colors duration-200">
                    View Invoices
                  </h3>
                </div>
              </div>
              <p className="text-gray-600">
                Browse and manage your existing invoices with advanced filtering
                options
              </p>
            </div>
          </Link>

          {/* Settings */}
          <Link
            href="/settings"
            className="card group transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            <div className="mt-8">
              <div className="mb-4 flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-600 transition-colors duration-200 group-hover:bg-gray-700">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-200 group-hover:text-gray-600">
                    Settings
                  </h3>
                </div>
              </div>
              <p className="text-gray-600">
                Configure your account preferences and customize your invoice
                templates
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Activity
          </h2>
        </div>
        <div className="mt-8">
          <div className="text-center">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No recent activity
            </h3>
            <p className="mt-2 text-gray-500">
              Start by creating your first invoice to see your activity here
            </p>
            <div className="mt-8">
              <Link href="/pdf-viewer" className="btn btn-primary">
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create Your First Invoice
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
