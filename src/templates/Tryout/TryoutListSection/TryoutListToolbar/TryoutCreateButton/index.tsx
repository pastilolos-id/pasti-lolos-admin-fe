"use client";

import { Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function TryoutCreateButton() {
  return (
    <Button
      type="button"
      variant="primary"
      size="sm"
      className="h-10 shrink-0 rounded-full px-4 text-sm font-bold whitespace-nowrap text-white shadow-none"
      asChild
    >
      <Link href="/tryout/create">
        <Plus className="size-4 shrink-0" aria-hidden />
        Buat Paket Tryout
      </Link>
    </Button>
  );
}
