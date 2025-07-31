"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

/**
 * Custom hook to manage authentication state
 * 
 * Provides authentication status and user information
 * with proper loading states and session management
 */
export function useAuth() {
  const { data: session, status } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
      return;
    }

    setIsLoading(false);
    setIsAuthenticated(!!session?.user);
  }, [session, status]);

  return {
    isAuthenticated,
    isLoading,
    user: session?.user || null,
    session,
    status,
  };
}

/**
 * Hook to check authentication status without loading states
 * Useful for components that need quick authentication checks
 */
export function useAuthStatus() {
  const { data: session } = useSession();
  return {
    isAuthenticated: !!session?.user,
    user: session?.user || null,
  };
}
