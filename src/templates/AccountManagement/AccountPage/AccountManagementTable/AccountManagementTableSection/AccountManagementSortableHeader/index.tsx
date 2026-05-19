"use client";

import { ArrowUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import type { AccountSortDirection, AccountSortKey } from "../../../types";

type AccountManagementSortableHeaderProps = {
  label: string;
  sortKey: AccountSortKey;
  activeKey: AccountSortKey | null;
  direction: AccountSortDirection | null;
  onSort: (key: AccountSortKey) => void;
  className?: string;
};

export default function AccountManagementSortableHeader({
  label,
  sortKey,
  activeKey,
  direction,
  onSort,
  className,
}: AccountManagementSortableHeaderProps) {
  const isActive = activeKey === sortKey;

  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-1 font-semibold text-neutral-6 hover:text-neutral-6/80",
        className,
      )}
      onClick={() => onSort(sortKey)}
      aria-label={`Urutkan ${label}${isActive && direction ? `, ${direction}` : ""}`}
    >
      <span>{label}</span>
      <ArrowUpDown
        className={cn(
          "size-3.5 shrink-0 text-neutral-5",
          isActive && "text-primary-5",
        )}
        aria-hidden
      />
    </button>
  );
}
