import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, isLocale } from "@/content/i18n";
import { applySecurityHeaders } from "@/shared/lib/securityHeaders";

const PUBLIC_FILE = /\.[^/]+$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || PUBLIC_FILE.test(pathname)) {
    const response = NextResponse.next();
    applySecurityHeaders(response.headers);
    return response;
  }

  const firstSegment = pathname.split("/")[1];

  if (isLocale(firstSegment)) {
    const response = NextResponse.next();
    applySecurityHeaders(response.headers);
    return response;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.redirect(url);
  applySecurityHeaders(response.headers);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
