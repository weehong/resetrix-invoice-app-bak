import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Define public paths that don't require authentication
const publicPaths = [
  "/",
  "/auth/signin",
  "/auth/signup",
  "/auth/error",
  "/api/auth",
];

// Check if the request is for a public path
const isPublicPath = (path: string) => {
  return publicPaths.some((publicPath) => path.startsWith(publicPath));
};

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const path = req.nextUrl.pathname;

    // If user is authenticated and trying to access auth pages, redirect to home
    if (
      isAuth &&
      (path.startsWith("/auth/signin") || path.startsWith("/auth/signup"))
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // If user is trying to access admin routes but doesn't have admin role
    if (isAuth && path.startsWith("/admin") && token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Allow access to public paths without authentication
        if (isPublicPath(pathname)) {
          return true;
        }

        // Require authentication for protected paths
        return !!token;
      },
    },
  }
);

// Specify the paths that require middleware processing
export const config = {
  matcher: ["/", "/admin/:path*", "/profile/:path*", "/auth/:path*"],
};
