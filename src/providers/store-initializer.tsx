"use client";

import { useEffect } from "react";

import { useAppStore } from "@/lib/store/app-store";

export function StoreInitializer() {
  const setHasHydrated = useAppStore((state) => state.setHasHydrated);

  useEffect(() => {
    setHasHydrated(true);
  }, [setHasHydrated]);

  return null;
}
