import { type NextRequest, NextResponse } from "next/server";

// Route configuration
const PUBLIC_ROUTES = ["/", "/signin", "/signup", "/forgot-password"];
const AUTH_ROUTES = ["/signin", "/signup", "/forgot-password"];
const PROTECTED_ROUTES = ["/dashboard", "/profile", "/settings", "/invoices"];
const DEFAULT_REDIRECT = "/dashboard";
const LOGIN_REDIRECT = "/signin";

// Session token names for different environments
const SESSION_COOKIE_NAMES = [
  "next-auth.session-token", // Production
  "__Secure-next-auth.session-token", // HTTPS
  "authjs.session-token", // Auth.js v5
];

/**
 * Check if user is authenticated by examining session cookies
 */
const isAuthenticated = (request: NextRequest): boolean => {
  // Check for any of the possible session cookie names
  for (const cookieName of SESSION_COOKIE_NAMES) {
    const sessionCookie = request.cookies.get(cookieName);
    if (
      sessionCookie?.value &&
      sessionCookie.value !== "undefined" &&
      sessionCookie.value !== "null"
    ) {
      return true;
    }
  }
  return false;
};

/**
 * Check if the current route is public (accessible without authentication)
 */
const isPublicRoute = (pathname: string): boolean => {
  return PUBLIC_ROUTES.some((route) => {
    if (route === pathname) return true;
    // Handle dynamic routes (e.g., /reset-password/[token])
    if (route.includes("[") || pathname.startsWith("/api/auth/")) return true;
    return false;
  });
};

/**
 * Check if the current route is an auth route (signin, signup, etc.)
 */
const isAuthRoute = (pathname: string): boolean => {
  return AUTH_ROUTES.includes(pathname);
};

/**
 * Check if the current route is a protected route
 */
const isProtectedRoute = (pathname: string): boolean => {
  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
};

/**
 * Create a redirect response with proper URL handling
 */
const createRedirect = (url: string, request: NextRequest): NextResponse => {
  const redirectUrl = new URL(url, request.url);

  // Preserve the original URL as a callback parameter for auth routes
  if (url === LOGIN_REDIRECT && !isPublicRoute(request.nextUrl.pathname)) {
    redirectUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
  }

  return NextResponse.redirect(redirectUrl);
};

/**
 * Main middleware function
 */
export default function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const isUserAuthenticated = isAuthenticated(request);

  // Handle API routes - let them pass through
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Handle authentication routes (signin, signup, etc.)
  if (isAuthRoute(pathname)) {
    if (isUserAuthenticated) {
      // Redirect authenticated users away from auth pages
      const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
      const redirectTo =
        callbackUrl && callbackUrl.startsWith("/")
          ? callbackUrl
          : DEFAULT_REDIRECT;
      return createRedirect(redirectTo, request);
    }
    // Allow unauthenticated users to access auth routes
    return NextResponse.next();
  }

  // Handle public routes
  if (isPublicRoute(pathname)) {
    if (isUserAuthenticated && pathname === "/") {
      // Redirect authenticated users from landing page to dashboard
      return createRedirect(DEFAULT_REDIRECT, request);
    }
    // Allow access to public routes
    return NextResponse.next();
  }

  // Handle protected routes
  if (isProtectedRoute(pathname) && !isUserAuthenticated) {
    // Redirect unauthenticated users to signin
    return createRedirect(LOGIN_REDIRECT, request);
  }

  // Allow authenticated users to access protected routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
