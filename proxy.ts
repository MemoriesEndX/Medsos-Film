import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

import { getRedirectPathByRole } from "@/src/lib/auth/redirect-by-role";

const protectedRoutes = ["/home", "/admin", "/competition"] as const;

function isProtectedPath(pathname: string): boolean {
  return protectedRoutes.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

function createRedirectUrl(pathname: string, request: NextRequest): URL {
  return new URL(pathname, request.url);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });

  if (!token) {
    const loginUrl = createRedirectUrl("/login", request);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = token.role;
  const roleHome = getRedirectPathByRole(typeof role === "string" ? role : "USER");

  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(createRedirectUrl(roleHome, request));
  }

  if (pathname.startsWith("/competition") && role !== "COMPETITION_JUDGE") {
    return NextResponse.redirect(createRedirectUrl(roleHome, request));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*", "/admin/:path*", "/competition/:path*"],
};
