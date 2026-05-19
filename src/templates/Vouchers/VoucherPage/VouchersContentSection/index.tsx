import type { ReactNode } from "react";

import type { TableDataType } from "@/components/Table/types";

import type {
  VoucherListFilters,
  VoucherSortKey,
  VoucherSortState,
} from "../types";
import VouchersEmptySection from "./VouchersEmptySection";
import VouchersFiltersSection from "./VouchersFiltersSection";
import VouchersPaginationSection from "./VouchersPaginationSection";
import VouchersTableSection from "./VouchersTableSection";

type VouchersContentSectionProps = {
  filters: VoucherListFilters;
  onFilterChange: (next: Partial<VoucherListFilters>) => void;
  tableRows: TableDataType[];
  showTable: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  sortState: VoucherSortState;
  onSort: (key: VoucherSortKey) => void;
  emptySlot?: ReactNode;
};

export default function VouchersContentSection({
  filters,
  onFilterChange,
  tableRows,
  showTable,
  page,
  totalPages,
  onPageChange,
  sortState,
  onSort,
  emptySlot = <VouchersEmptySection />,
}: VouchersContentSectionProps) {
  return (
    <section
      className="flex flex-col gap-4 rounded-[23.5px] border border-[#F6F6F6] bg-white p-3 sm:p-4 md:p-5"
      aria-label="Data voucher"
    >
      <h2 className="text-h4 font-bold text-neutral-6">Tabel Voucher</h2>

      <VouchersFiltersSection filters={filters} onChange={onFilterChange} />

      {showTable ? (
        <>
          <VouchersTableSection
            rows={tableRows}
            sortState={sortState}
            onSort={onSort}
          />
          <VouchersPaginationSection
            page={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </>
      ) : (
        emptySlot
      )}
    </section>
  );
}
