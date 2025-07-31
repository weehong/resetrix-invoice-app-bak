"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface SessionProviderProps {
  children: ReactNode;
}

/**
 * Session Provider wrapper for NextAuth.js
 * 
 * Wraps the application with NextAuth SessionProvider to enable
 * authentication state management throughout the app
 */
export function SessionProvider({ children }: SessionProviderProps) {
  return (
    <NextAuthSessionProvider>
      {children}
    </NextAuthSessionProvider>
  );
}
