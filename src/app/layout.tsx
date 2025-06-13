import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmsans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Resetrix: Simple In-House Invoice & Purchase Receipt App",
  description: "Simplify your financial workflows with the Resetrix In-House App. This intuitive system, developed by Resetrix, enables effortless invoice generation and organized management of all your purchasing receipts, ensuring smooth operations.",
  openGraph: {
    title: "Resetrix: Simple In-House Invoice & Purchase Receipt App",
    description: "Simplify your financial workflows with the Resetrix In-House App. This intuitive system, developed by Resetrix, enables effortless invoice generation and organized management of all your purchasing receipts, ensuring smooth operations.",
    url: "https://resetrix-invoice-system.vercel.app",
    siteName: "Resetrix: Simple In-House Invoice & Purchase Receipt App",
    images: [
      {
        url: "https://resetrix-invoice-system.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Resetrix: Simple In-House Invoice & Purchase Receipt App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resetrix: Simple In-House Invoice & Purchase Receipt App",
    description: "Simplify your financial workflows with the Resetrix In-House App. This intuitive system, developed by Resetrix, enables effortless invoice generation and organized management of all your purchasing receipts, ensuring smooth operations.",
    images: [
      "https://resetrix-invoice-system.vercel.app/og-image.png",
    ],
    creator: "@resetrix",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ff2626" },
    { media: "(prefers-color-scheme: dark)", color: "#ff2626" },
  ],
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    noimageindex: false,
    noarchive: false,
    nosnippet: false,
  },
  keywords: [
    "invoice",
    "invoicing",
    "billing",
    "nextjs",
    "react",
    "typescript",
    "resetrix",
    "resetrix invoice system",
    "resetrix invoicing",
    "resetrix billing",
    "resetrix app",
    "resetrix app invoice",
    "resetrix app invoicing",
    "resetrix app billing",
  ],
  alternates: {
    canonical: "https://resetrix-invoice-system.vercel.app",
    types: {
      "application/rss+xml": "/feed.xml",
      "application/atom+xml": "/feed.atom",
      "application/json": "/feed.json",
      "application/ld+json": "/feed.jsonld",
    },
  },
  verification: {
    google: "google-site-verification=your-google-site-verification-code",
    yandex: "yandex-verification: your-yandex-verification-code",
    me: "me-verification: your-me-verification-code",
    other: {
      "custom-verification": "custom-verification-code",
    },
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
    date: false,
    url: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Resetrix: Simple In-House Invoice & Purchase Receipt App",
    startupImage: [
      "/apple-touch-startup-image-640x1136.png",
      "/apple-touch-startup-image-750x1334.png",
      "/apple-touch-startup-image-1242x2208.png",
      "/apple-touch-startup-image-1125x2436.png",
      "/apple-touch-startup-image-828x1792.png",
      "/apple-touch-startup-image-1242x2688.png",
    ],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
  applicationName: "Resetrix: Simple In-House Invoice & Purchase Receipt App",
  category: "Business",
  publisher: "Resetrix",
  creator: "Resetrix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmsans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
