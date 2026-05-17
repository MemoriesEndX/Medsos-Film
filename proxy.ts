import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

import { getDashboardUrlByRole } from "@/lib/auth/get-dashboard-url";

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

  const role = typeof token.role === "string" ? token.role : "USER";
  const roleHome = getDashboardUrlByRole(role);
  const isAdmin = role === "ADMIN";
  const isCompetitionRole = role === "CREATOR" || role === "COMPETITION_JUDGE";

  console.log(`[PROXY] Pathname: ${pathname}, Token Role: ${token.role}, Resolved Role: ${role}, Type: ${typeof role}`);
  console.log(`[PROXY] isAdmin: ${isAdmin}, isCompetitionRole: ${isCompetitionRole}, roleHome: ${roleHome}`);

  if (pathname.startsWith("/admin") && !isAdmin) {
    console.log(`[PROXY] User role ${role} not ADMIN, redirecting to ${roleHome}`);
    return NextResponse.redirect(createRedirectUrl(roleHome, request));
  }

  if (pathname.startsWith("/competition") && !isCompetitionRole) {
    console.log(`[PROXY] User role ${role} not COMPETITION_JUDGE/CREATOR, redirecting to ${roleHome}`);
    return NextResponse.redirect(createRedirectUrl(roleHome, request));
  }

  console.log(`[PROXY] Access allowed for role ${role} to ${pathname}`);
  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*", "/admin/:path*", "/competition/:path*"],
};
