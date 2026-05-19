"use client";

import { Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function VouchersCreateButton() {
  return (
    <Button
      type="button"
      variant="primary"
      size="sm"
      className="h-10 w-full shrink-0 rounded-full px-4 text-sm font-bold whitespace-nowrap text-white shadow-none sm:w-auto"
      asChild
    >
      <Link href="/vouchers/create">
        <Plus className="size-4 shrink-0" aria-hidden />
        Buat Voucher
      </Link>
    </Button>
  );
}
