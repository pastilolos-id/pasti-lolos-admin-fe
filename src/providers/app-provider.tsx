"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import { createQueryClient } from "@/lib/query/query-client";
import { StoreInitializer } from "@/providers/store-initializer";

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <StoreInitializer />
      {children}
    </QueryClientProvider>
  );
}
