"use client";

import { useState } from "react";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

/**
 * Authentication Button Component
 *
 * Displays Login or Logout button based on authentication status
 * Handles logout functionality with proper redirect
 */
export function AuthButton() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsSigningOut(true);
    try {
      await signOut({
        redirect: false, // Handle redirect manually
      });
      // Redirect to home page after logout
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="btn btn-secondary inline-flex cursor-not-allowed items-center opacity-50">
        <div className="loading-spinner mr-2 h-4 w-4"></div>
        Loading...
      </div>
    );
  }

  // Show logout button for authenticated users
  if (isAuthenticated) {
    return (
      <div className="flex items-center space-x-4">
        {/* Logout button */}
        <button
          onClick={handleLogout}
          disabled={isSigningOut}
          className="btn btn-secondary inline-flex items-center disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSigningOut ? (
            <>
              <div className="loading-spinner mr-2 h-4 w-4"></div>
              Signing out...
            </>
          ) : (
            "Logout"
          )}
        </button>
      </div>
    );
  }

  // Show login button for unauthenticated users
  return (
    <Link href="/signin" className="btn btn-primary inline-flex items-center">
      Login
    </Link>
  );
}

/**
 * Mobile Authentication Button Component
 *
 * Simplified version for mobile navigation
 */
export function MobileAuthButton() {
  const { isAuthenticated, isLoading } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsSigningOut(true);
    try {
      await signOut({
        redirect: false,
      });
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  if (isLoading) {
    return (
      <div className="block w-full border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium opacity-50">
        Loading...
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <button
        onClick={handleLogout}
        disabled={isSigningOut}
        className="focus:border-accent-500 focus:bg-accent-50 focus:text-accent-700 block w-full border-l-4 border-transparent py-2 pr-4 pl-3 text-left text-base font-medium transition-colors duration-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus:outline-none disabled:opacity-50"
      >
        {isSigningOut ? "Signing out..." : "Logout"}
      </button>
    );
  }

  return (
    <Link
      href="/signin"
      className="focus:border-accent-500 focus:bg-accent-50 focus:text-accent-700 block w-full border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium transition-colors duration-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
    >
      Login
    </Link>
  );
}
