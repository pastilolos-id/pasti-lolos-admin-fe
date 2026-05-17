// Next.js 16: edge entry is `proxy.ts` (see pasti-lolos-fe).

import { type NextRequest, NextResponse } from "next/server";

import { AUTH_TOKEN_COOKIE_NAME } from "@/constants/auth";
import {
  DASHBOARD_PATH,
  LOGIN_PATH,
  PRIVATE_ROUTE_PREFIXES,
  PUBLIC_ROUTE_PREFIXES,
  pathnameMatchesAnyPrefix,
} from "@/constants/routes";
import { parseSessionFromToken } from "@/lib/auth/jwt-cookie";
import { buildUserAppRedirectUrl } from "@/lib/auth/user-app-url";

function redirectTo(request: NextRequest, target: string): NextResponse {
  if (target.startsWith("http://") || target.startsWith("https://")) {
    return NextResponse.redirect(target);
  }
  const url = request.nextUrl.clone();
  url.pathname = target;
  url.search = "";
  return NextResponse.redirect(url);
}

function redirectNonAdmin(request: NextRequest): NextResponse {
  const userAppUrl = buildUserAppRedirectUrl();
  return redirectTo(request, userAppUrl ?? LOGIN_PATH);
}

function shouldRedirectNonAdmin(pathname: string): boolean {
  return (
    pathname === "/" ||
    pathname === "" ||
    pathnameMatchesAnyPrefix(pathname, PRIVATE_ROUTE_PREFIXES) ||
    pathnameMatchesAnyPrefix(pathname, PUBLIC_ROUTE_PREFIXES)
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const raw = request.cookies.get(AUTH_TOKEN_COOKIE_NAME)?.value;
  const session = parseSessionFromToken(raw);

  if (
    session.isValid &&
    session.isNonAdmin &&
    shouldRedirectNonAdmin(pathname)
  ) {
    return redirectNonAdmin(request);
  }

  const hasAdminSession = session.isValid && session.isAdmin;

  if (pathname === "/" || pathname === "") {
    return redirectTo(request, hasAdminSession ? DASHBOARD_PATH : LOGIN_PATH);
  }

  if (
    pathnameMatchesAnyPrefix(pathname, PUBLIC_ROUTE_PREFIXES) &&
    hasAdminSession
  ) {
    return redirectTo(request, DASHBOARD_PATH);
  }

  if (
    pathnameMatchesAnyPrefix(pathname, PRIVATE_ROUTE_PREFIXES) &&
    !hasAdminSession
  ) {
    return redirectTo(request, LOGIN_PATH);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|static/).*)"],
};
