import React from "react";

import Nav from "@/components/Nav";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}
