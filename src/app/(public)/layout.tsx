import "@/style/globals.css";

import { DM_Sans } from "next/font/google";

import { metadata } from "@/config/metadata.config";

const dmsans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmsans.variable} antialiased`}>{children}</body>
    </html>
  );
}
