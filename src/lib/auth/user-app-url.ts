import { LOGIN_PATH } from "@/constants/routes";

export function getUserAppUrl(): string {
  return process.env.NEXT_PUBLIC_USER_APP_URL?.trim() ?? "";
}

/** Absolute URL for redirecting non-admin users to the student app. */
export function buildUserAppRedirectUrl(): string | null {
  const base = getUserAppUrl();
  if (!base) {
    return null;
  }
  try {
    return new URL(base).toString();
  } catch {
    return null;
  }
}

/** Non-admin redirect target; falls back to admin login when env is missing. */
export function getNonAdminRedirectTarget(): string {
  return buildUserAppRedirectUrl() ?? LOGIN_PATH;
}

/** Client-side full navigation to the student app (preserves session). */
export function redirectNonAdminToUserApp(): void {
  const url = buildUserAppRedirectUrl();
  if (url) {
    window.location.href = url;
    return;
  }
  window.location.assign(LOGIN_PATH);
}
