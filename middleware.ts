import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;
  const isLoginOrRegisterOrTransactionDetail =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/transactiondetail");

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const userRoles = session.user?.roles;
    const hasTenantRole = Array.isArray(userRoles)
      ? userRoles.includes("TENANT")
      : userRoles === "TENANT";

    if (!hasTenantRole) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
    console.log("User is TENANT, allowing access to dashboard");
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/finish-payment")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const userRoles = session.user?.roles;
    const hasUserRole = Array.isArray(userRoles)
      ? userRoles.includes("USER")
      : userRoles === "USER";

    if (!hasUserRole) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  }

  if (request.nextUrl.pathname === "/") {
    if (session) {
      const userRoles = session.user?.roles;
      const hasUserRole = Array.isArray(userRoles)
        ? userRoles.includes("TENANT")
        : userRoles === "TENANT";

      if (hasUserRole) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/checkout")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const userRoles = session.user?.roles;
    const hasUserRole = Array.isArray(userRoles)
      ? userRoles.includes("USER")
      : userRoles === "USER";

    if (!hasUserRole) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/user-profile")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/checkout/:path*",
    "/login",
    "/register",
    "/user/:path*",
    "/transactiondetail/:path*",
    "/",
    "/finish-payment/:path*",
    "/user-profile",
  ],
};
