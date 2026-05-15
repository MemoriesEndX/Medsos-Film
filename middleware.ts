import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const ADMIN_PATH_PREFIX = "/dashboard/admin";

export async function middleware(request: Request) {
  const token = await getToken({ req: request as never });
  const pathname = new URL(request.url).pathname;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith(ADMIN_PATH_PREFIX) && token.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
