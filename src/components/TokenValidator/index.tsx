"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { LOGIN_PATH } from "@/constants/routes";
import { getMyProfile, logout } from "@/lib/auth/authApi";
import { mapMyProfileToAuthUser } from "@/lib/auth/login-form-utils";
import { ADMIN_ROLE_ID } from "@/lib/auth/types";
import { removeToken } from "@/lib/cookies/tokenCookies";
import { useAuthStore } from "@/lib/store/auth-store";

type Phase = "checking" | "idle";

export default function TokenValidator() {
  const pathname = usePathname();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const hasValidatedOnce = useRef(false);
  const [phase, setPhase] = useState<Phase>("checking");

  useEffect(() => {
    let cancelled = false;

    async function validateSession() {
      if (!pathname) {
        return;
      }

      setPhase("checking");

      try {
        const profile = await getMyProfile();

        if (cancelled) {
          return;
        }

        if (profile.userRoleId !== ADMIN_ROLE_ID) {
          try {
            await logout();
          } catch {
            // best-effort
          }
          clearUser();
          removeToken();
          router.replace(LOGIN_PATH);
          return;
        }

        setUser(mapMyProfileToAuthUser(profile));
      } catch {
        if (cancelled) {
          return;
        }
        clearUser();
        removeToken();
        router.replace(LOGIN_PATH);
      } finally {
        if (!cancelled) {
          hasValidatedOnce.current = true;
          setPhase("idle");
        }
      }
    }

    void validateSession();

    return () => {
      cancelled = true;
    };
  }, [pathname, setUser, clearUser, router]);

  if (!hasValidatedOnce.current || phase === "checking") {
    return (
      <div className="fixed bottom-4 right-4 z-50 rounded-md bg-card px-3 py-2 text-xs text-foreground shadow-sm ring-1 ring-border">
        Memverifikasi sesi...
      </div>
    );
  }

  return null;
}
