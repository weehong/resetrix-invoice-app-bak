import "@/style/globals.css";

import React from "react";

import { DM_Sans } from "next/font/google";

import Nav from "@/components/Nav";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { metadata, viewport } from "@/config/metadata.config";

const dmsans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export { metadata, viewport };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${dmsans.variable} h-full antialiased`}>
        <SessionProvider>
          <div className="min-h-full">{children}</div>
        </SessionProvider>
      </body>
    </html>
  );
}
