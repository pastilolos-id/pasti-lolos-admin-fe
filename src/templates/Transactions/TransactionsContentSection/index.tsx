import type { ReactNode } from "react";

import type { TableDataType } from "@/components/Table/types";

import TransactionsFiltersSection from "./TransactionsFiltersSection";
import TransactionsPaginationSection from "./TransactionsPaginationSection";
import TransactionsTableSection from "./TransactionsTableSection";
import type { TransactionListFilters } from "../types";

type TransactionsContentSectionProps = {
  filters: TransactionListFilters;
  onFilterChange: (next: Partial<TransactionListFilters>) => void;
  tableRows: TableDataType[];
  showTable: boolean;
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  rowNumberOffset: number;
  onPageChange: (page: number) => void;
  /** Konten ketika tidak ada baris (tetap di dalam panel putih). */
  emptySlot?: ReactNode;
};

export default function TransactionsContentSection({
  filters,
  onFilterChange,
  tableRows,
  showTable,
  page,
  totalPages,
  totalItems,
  pageSize,
  rowNumberOffset,
  onPageChange,
  emptySlot,
}: TransactionsContentSectionProps) {
  return (
    <section
      className="flex flex-col gap-4 rounded-[23.5px] border border-[#F6F6F6] bg-white p-3 sm:p-4 md:p-5"
      aria-label="Data transaksi"
    >
      <h2 className="text-h4 font-bold text-neutral-6">Tabel Transaksi</h2>

      <TransactionsFiltersSection filters={filters} onChange={onFilterChange} />

      {showTable ? (
        <>
          <TransactionsTableSection
            rows={tableRows}
            rowNumberOffset={rowNumberOffset}
          />
          <TransactionsPaginationSection
            page={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={onPageChange}
          />
        </>
      ) : (
        emptySlot
      )}
    </section>
  );
}
