/** Cookie name for mock/session token (must match login `Cookies.set`). */
export const AUTH_TOKEN_COOKIE_NAME = "token";

const MOCK_ADMIN_TOKEN_PREFIX = "mock-admin-token";

/** Mock gate until real API validates JWT/session. */
export function isValidMockSessionToken(
  value: string | null | undefined,
): boolean {
  const trimmed = value?.trim();
  if (!trimmed) {
    return false;
  }
  return trimmed.startsWith(MOCK_ADMIN_TOKEN_PREFIX);
}
