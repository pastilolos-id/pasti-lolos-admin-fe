"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { AccountListFilters } from "../../types";
import AccountManagementCreateButton from "./AccountManagementCreateButton";

type AccountManagementFiltersSectionProps = {
  filters: AccountListFilters;
  onChange: (next: Partial<AccountListFilters>) => void;
  createButtonLabel: string;
  createHref: string;
};

const pageSizeOptions = [10, 25, 50] as const;

const slotShowEntries =
  "md:col-start-1 md:row-start-1 lg:col-start-1 lg:row-start-1";
const slotSearch =
  "md:col-start-1 md:row-start-2 lg:col-start-2 lg:row-start-1";
const slotCreate =
  "md:col-start-2 md:row-start-2 lg:col-start-3 lg:row-start-1";

export default function AccountManagementFiltersSection({
  filters,
  onChange,
  createButtonLabel,
  createHref,
}: AccountManagementFiltersSectionProps) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:grid-rows-2 md:items-center lg:grid-cols-[auto_minmax(12rem,1fr)_auto] lg:grid-rows-1 lg:gap-x-4 lg:gap-y-0">
      <div
        className={`flex flex-wrap items-center gap-2 text-sm font-medium text-neutral-6 ${slotShowEntries}`}
      >
        <span className="text-neutral-5">Show</span>
        <Select
          value={String(filters.pageSize)}
          onValueChange={(value) =>
            onChange({ pageSize: Number.parseInt(value, 10) })
          }
        >
          <SelectTrigger
            id="account-page-size"
            className="h-9 w-17 rounded-xl border-[#EEEEEE] bg-white text-sm font-semibold text-neutral-6 shadow-none"
            aria-label="Jumlah baris per halaman"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((n) => (
              <SelectItem key={n} value={String(n)}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-neutral-5">entries</span>
      </div>

      <div className={`relative min-w-0 w-full ${slotSearch}`}>
        <Label htmlFor="account-search" className="sr-only">
          Cari
        </Label>
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-5"
          aria-hidden
        />
        <Input
          id="account-search"
          placeholder="Search…"
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
          className="h-10 w-full rounded-full border-[#EEEEEE] bg-white pl-10 pr-4 text-sm font-medium text-neutral-6 shadow-none placeholder:text-neutral-5 focus-visible:ring-[#80B0FF]/40"
        />
      </div>

      <div className={`w-full min-w-0 ${slotCreate}`}>
        <AccountManagementCreateButton
          label={createButtonLabel}
          href={createHref}
        />
      </div>
    </div>
  );
}
