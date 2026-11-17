"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ApiError } from "@/lib/auth/api-client";
import { getMyProfile } from "@/lib/auth/authApi";
import { mapMyProfileToAuthUser } from "@/lib/auth/login-form-utils";
import {
  endVoluntaryLogout,
  handleSessionExpired,
} from "@/lib/auth/session-lifecycle";
import { ADMIN_ROLE_ID } from "@/lib/auth/types";
import { redirectNonAdminToUserApp } from "@/lib/auth/user-app-url";
import { useAuthStore } from "@/lib/store/auth-store";

type Phase = "checking" | "idle";

export default function TokenValidator() {
  const pathname = usePathname();
  const setUser = useAuthStore((state) => state.setUser);
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
          redirectNonAdminToUserApp();
          return;
        }

        endVoluntaryLogout();
        setUser(mapMyProfileToAuthUser(profile));
      } catch (err) {
        if (cancelled) {
          return;
        }
        if (err instanceof ApiError && err.status === 401) {
          void handleSessionExpired();
        }
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
  }, [pathname, setUser]);

  if (!hasValidatedOnce.current || phase === "checking") {
    return (
      <div className="fixed bottom-4 right-4 z-50 rounded-md bg-card px-3 py-2 text-xs text-foreground shadow-sm ring-1 ring-border">
        Memverifikasi sesi...
      </div>
    );
  }

  return null;
}
