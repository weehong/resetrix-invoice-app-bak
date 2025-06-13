import type { Metadata } from "next";

import {
  APP_DESCRIPTION,
  APP_NAME,
  APP_URL,
  KEYWORDS,
  OG_IMAGE,
} from "@/constant/metadata.constants";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: APP_URL,
    siteName: APP_NAME,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [OG_IMAGE],
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
  keywords: KEYWORDS,
  alternates: {
    canonical: APP_URL,
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
    title: APP_NAME,
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
  applicationName: APP_NAME,
  category: "Business",
  publisher: "Resetrix",
  creator: "Resetrix",
};
