"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function TokenValidator() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"checking" | "idle">("checking");

  useEffect(() => {
    void pathname;
    setPhase("checking");
    const timer = window.setTimeout(() => {
      setPhase("idle");
    }, 300);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  if (phase === "checking") {
    return (
      <div className="fixed bottom-4 right-4 z-50 rounded-md bg-card px-3 py-2 text-xs text-foreground shadow-sm ring-1 ring-border">
        Memverifikasi sesi...
      </div>
    );
  }

  return null;
}
