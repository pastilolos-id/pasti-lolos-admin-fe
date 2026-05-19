"use client";

import { Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type AccountManagementCreateButtonProps = {
  label: string;
  href: string;
};

export default function AccountManagementCreateButton({
  label,
  href,
}: AccountManagementCreateButtonProps) {
  return (
    <Button
      type="button"
      variant="primary"
      size="sm"
      className="h-10 w-full shrink-0 rounded-full px-4 text-sm font-bold whitespace-nowrap text-white shadow-none sm:w-auto"
      asChild
    >
      <Link href={href}>
        <Plus className="size-4 shrink-0" aria-hidden />
        {label}
      </Link>
    </Button>
  );
}
