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

import type { TransactionListFilters } from "../../types";

type TransactionsFiltersSectionProps = {
  filters: TransactionListFilters;
  onChange: (next: Partial<TransactionListFilters>) => void;
};

const pageSizeOptions = [10, 25, 50] as const;

export default function TransactionsFiltersSection({
  filters,
  onChange,
}: TransactionsFiltersSectionProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4">
      <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-neutral-6">
        <span className="text-neutral-5">Show</span>
        <Select
          value={String(filters.pageSize)}
          onValueChange={(value) =>
            onChange({ pageSize: Number.parseInt(value, 10) })
          }
        >
          <SelectTrigger
            id="tx-page-size"
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

      <div className="relative w-full min-w-0 md:max-w-md">
        <Label htmlFor="tx-search" className="sr-only">
          Cari
        </Label>
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-5"
          aria-hidden
        />
        <Input
          id="tx-search"
          placeholder="Search…"
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
          className="h-10 rounded-full border-[#EEEEEE] bg-white pl-10 pr-4 text-sm font-medium text-neutral-6 shadow-none placeholder:text-neutral-5 focus-visible:ring-[#80B0FF]/40"
        />
      </div>
    </div>
  );
}
