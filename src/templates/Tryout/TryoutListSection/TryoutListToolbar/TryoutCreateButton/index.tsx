"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

/** Nanti: navigasi ke form buat tryout / panggilan API create. */
export default function TryoutCreateButton() {
  return (
    <Button
      type="button"
      variant="primary"
      size="sm"
      className="h-10 shrink-0 rounded-full px-4 text-sm font-bold whitespace-nowrap text-white shadow-none"
    >
      <Plus className="size-4 shrink-0" aria-hidden />
      Buat Tryout
    </Button>
  );
}
