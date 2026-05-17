import { LOGIN_PATH } from "@/constants/routes";
import { logout } from "@/lib/auth/authApi";
import { removeToken } from "@/lib/cookies/tokenCookies";
import { useAuthStore } from "@/lib/store/auth-store";
import { useSessionStore } from "@/lib/store/session-store";

export const SESSION_EXPIRED_MESSAGE =
  "Sesi anda telah habis, silakan logout kembali";

export const SESSION_EXPIRED_REDIRECT_MS = 2500;

let sessionExpiredRedirect: (() => void) | null = null;

export function setSessionExpiredRedirect(redirect: () => void): void {
  sessionExpiredRedirect = redirect;
}

function redirectToLogin(): void {
  if (sessionExpiredRedirect) {
    sessionExpiredRedirect();
    return;
  }
  if (typeof window !== "undefined") {
    window.location.assign(LOGIN_PATH);
  }
}

export async function handleSessionExpired(): Promise<void> {
  const sessionStore = useSessionStore.getState();
  if (sessionStore.isHandlingSessionExpiry) {
    return;
  }

  sessionStore.setHandling(true);
  sessionStore.openSessionExpiredModal();

  try {
    await logout();
  } catch {
    // best-effort: clear httpOnly cookie via server
  }

  useAuthStore.getState().clearUser();
  removeToken();

  window.setTimeout(() => {
    useSessionStore.getState().closeSessionExpiredModal();
    useSessionStore.getState().setHandling(false);
    redirectToLogin();
  }, SESSION_EXPIRED_REDIRECT_MS);
}

export function shouldTriggerSessionExpired(path: string): boolean {
  const normalized = path.split("?")[0] ?? path;
  if (normalized === "/auth/login" || normalized === "/auth/logout") {
    return false;
  }
  return true;
}
