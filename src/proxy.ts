// Next.js 16: edge entry is `proxy.ts` (see pasti-lolos-fe).

import { type NextRequest, NextResponse } from "next/server";

import {
  AUTH_TOKEN_COOKIE_NAME,
  isValidMockSessionToken,
} from "@/constants/auth";
import {
  DASHBOARD_PATH,
  LOGIN_PATH,
  PRIVATE_ROUTE_PREFIXES,
  PUBLIC_ROUTE_PREFIXES,
  pathnameMatchesAnyPrefix,
} from "@/constants/routes";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const raw = request.cookies.get(AUTH_TOKEN_COOKIE_NAME)?.value;
  const hasValidMockSession = isValidMockSessionToken(raw);

  if (pathname === "/" || pathname === "") {
    const url = request.nextUrl.clone();
    url.pathname = hasValidMockSession ? DASHBOARD_PATH : LOGIN_PATH;
    return NextResponse.redirect(url);
  }

  if (
    pathnameMatchesAnyPrefix(pathname, PUBLIC_ROUTE_PREFIXES) &&
    hasValidMockSession
  ) {
    const url = request.nextUrl.clone();
    url.pathname = DASHBOARD_PATH;
    return NextResponse.redirect(url);
  }

  if (
    pathnameMatchesAnyPrefix(pathname, PRIVATE_ROUTE_PREFIXES) &&
    !hasValidMockSession
  ) {
    const url = request.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|static/).*)"],
};
