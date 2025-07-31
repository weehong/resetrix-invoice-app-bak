"use client";

import dynamic from "next/dynamic";

// Import the PdfViewer component with dynamic loading for SSR compatibility
// Set ssr to false since this component uses client-side features like file uploads
const PdfViewer = dynamic(() => import("@/components/invoice/PdfViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
        <p className="mt-2 text-gray-600">Loading PDF Generator...</p>
      </div>
    </div>
  ),
});

/**
 * PDF Viewer Page (Protected)
 *
 * A thin wrapper around the PdfViewer component that handles invoice PDF generation.
 * This page uses dynamic imports with SSR disabled for optimal loading performance.
 * This page is now protected and requires authentication to access.
 */
export default function PDFViewerPage() {
  return <PdfViewer />;
}
