/** Default destination after successful auth. */
export const DASHBOARD_PATH = "/dashboard";

export const LOGIN_PATH = "/login";

/**
 * Route prefixes treated as public (unauthenticated entry).
 * Used by proxy and client guards; keep in sync when adding auth pages.
 */
export const PUBLIC_ROUTE_PREFIXES: readonly string[] = [LOGIN_PATH];

/**
 * Route prefixes for the private app shell. Keep aligned with
 * `src/app/(private-route)` and `sidebarData.ts` menu hrefs.
 */
export const PRIVATE_ROUTE_PREFIXES: readonly string[] = [
  DASHBOARD_PATH,
  "/courses",
  "/tryout",
  "/question-bank",
  "/contributors",
  "/vouchers",
  "/transactions",
];

export function pathnameMatchesAnyPrefix(
  pathname: string,
  prefixes: readonly string[],
): boolean {
  return prefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
