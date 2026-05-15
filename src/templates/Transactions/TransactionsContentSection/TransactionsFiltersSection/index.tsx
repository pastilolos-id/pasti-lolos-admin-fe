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

import type {
  TransactionApiFilterStatus,
  TransactionApiFilterType,
  TransactionListFilters,
} from "../../types";

type TransactionsFiltersSectionProps = {
  filters: TransactionListFilters;
  onChange: (next: Partial<TransactionListFilters>) => void;
};

const pageSizeOptions = [10, 25, 50] as const;

const ALL_VALUE = "__all__";

const typeOptions: { value: TransactionApiFilterType; label: string }[] = [
  { value: "question_bank", label: "Bank Soal" },
  { value: "exam", label: "Tryout" },
  { value: "course", label: "Kelas" },
];

const statusOptions: { value: TransactionApiFilterStatus; label: string }[] = [
  { value: "pending", label: "Menunggu" },
  { value: "failed", label: "Ditolak" },
  { value: "paid", label: "Berhasil" },
];

const selectTriggerClass =
  "h-9 w-full min-w-0 rounded-xl border-[#EEEEEE] bg-white text-sm font-semibold text-neutral-6 shadow-none lg:w-auto lg:min-w-[7.5rem]";

/** Grid placement: mobile stack | tablet 2×2 | desktop 1×4 */
const slotShowEntries =
  "md:col-start-1 md:row-start-1 lg:col-start-1 lg:row-start-1";
const slotType = "md:col-start-1 md:row-start-2 lg:col-start-2 lg:row-start-1";
const slotStatus =
  "md:col-start-2 md:row-start-2 lg:col-start-3 lg:row-start-1";
const slotSearch =
  "md:col-start-2 md:row-start-1 lg:col-start-4 lg:row-start-1";

export default function TransactionsFiltersSection({
  filters,
  onChange,
}: TransactionsFiltersSectionProps) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:grid-rows-2 md:items-center lg:grid-cols-[auto_auto_auto_minmax(12rem,1fr)] lg:grid-rows-1 lg:gap-x-4 lg:gap-y-0">
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

      <div className={`w-full min-w-0 ${slotType}`}>
        <Select
          value={filters.type ?? ALL_VALUE}
          onValueChange={(value) =>
            onChange({
              type:
                value === ALL_VALUE
                  ? undefined
                  : (value as TransactionApiFilterType),
            })
          }
        >
          <SelectTrigger
            id="tx-type-filter"
            className={selectTriggerClass}
            aria-label="Filter tipe item"
          >
            <SelectValue placeholder="Tipe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_VALUE}>Semua tipe</SelectItem>
            {typeOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className={`w-full min-w-0 ${slotStatus}`}>
        <Select
          value={filters.status ?? ALL_VALUE}
          onValueChange={(value) =>
            onChange({
              status:
                value === ALL_VALUE
                  ? undefined
                  : (value as TransactionApiFilterStatus),
            })
          }
        >
          <SelectTrigger
            id="tx-status-filter"
            className={selectTriggerClass}
            aria-label="Filter status"
          >
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_VALUE}>Semua status</SelectItem>
            {statusOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className={`relative min-w-0 w-full ${slotSearch}`}>
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
          className="h-10 w-full rounded-full border-[#EEEEEE] bg-white pl-10 pr-4 text-sm font-medium text-neutral-6 shadow-none placeholder:text-neutral-5 focus-visible:ring-[#80B0FF]/40 lg:max-w-none"
        />
      </div>
    </div>
  );
}
