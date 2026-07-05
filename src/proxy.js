import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;

    // Protect /admin routes
    if (pathname.startsWith("/admin")) {
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      if (token.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // Protect /login and /signup routes if already authenticated
    if (pathname === "/login" || pathname === "/signup") {
      if (token) {
        if (token.role === "admin") {
          return NextResponse.redirect(new URL("/admin", req.url));
        }
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => true, // Let the middleware function handle the logic
    },
  }
)

export const config = {
  matcher: ["/admin/:path*", "/login", "/signup"],
}
