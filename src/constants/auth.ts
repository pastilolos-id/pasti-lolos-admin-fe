/** Cookie name set by backend for httpOnly session token. */
export const AUTH_TOKEN_COOKIE_NAME = "token";

export function hasAuthSessionCookie(
  value: string | null | undefined,
): boolean {
  return Boolean(value?.trim());
}
