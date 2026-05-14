"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { isValidMockSessionToken } from "@/constants/auth";
import { LOGIN_PATH } from "@/constants/routes";
import { getToken, removeToken } from "@/lib/cookies/tokenCookies";

const MOCK_VALIDATE_MS = 300;

type Phase = "checking" | "idle";

export default function TokenValidator() {
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("checking");
  const cancelled = useRef(false);

  useEffect(() => {
    cancelled.current = false;
    setPhase("checking");
    void pathname;

    const timer = window.setTimeout(() => {
      if (cancelled.current) {
        return;
      }

      const raw = getToken();
      if (!isValidMockSessionToken(raw)) {
        removeToken();
        router.replace(LOGIN_PATH);
        setPhase("idle");
        return;
      }

      setPhase("idle");
    }, MOCK_VALIDATE_MS);

    return () => {
      cancelled.current = true;
      window.clearTimeout(timer);
    };
  }, [pathname, router]);

  if (phase === "checking") {
    return (
      <div className="fixed bottom-4 right-4 z-50 rounded-md bg-card px-3 py-2 text-xs text-foreground shadow-sm ring-1 ring-border">
        Memverifikasi sesi...
      </div>
    );
  }

  return null;
}
