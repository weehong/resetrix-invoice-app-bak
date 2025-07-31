import React from "react";

import { redirect } from "next/navigation";

import SideNav from "@/components/SideNav";
import { auth } from "@/lib/auth/auth";

/**
 * Protected Layout
 *
 * This layout wraps all protected routes and ensures users are authenticated.
 * If not authenticated, users are redirected to the signin page.
 */
export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  return <SideNav>{children}</SideNav>;
}
