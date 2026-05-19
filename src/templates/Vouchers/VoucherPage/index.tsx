"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { useDebouncedValue } from "@/hooks/useDebouncedValue";

import VouchersContentSection from "./VouchersContentSection";
import { rowsToTableData } from "./VouchersContentSection/VouchersTableSection/columns";
import VouchersEmptySection from "./VouchersContentSection/VouchersEmptySection";
import VouchersHeaderSection from "./VouchersHeaderSection";
import VouchersSummarySection from "./VouchersSummarySection";
import { vouchersListMock, vouchersSummaryMock } from "./mockData";
import type { VoucherListFilters, VoucherSortKey, VoucherSortState } from "./types";
import {
  filterVouchers,
  paginateVouchers,
  sortVouchers,
  toggleSortState,
} from "./voucherListLogic";

const defaultFilters: VoucherListFilters = {
  search: "",
  pageSize: 10,
};

export default function VoucherPage() {
  const [filters, setFilters] = useState<VoucherListFilters>(defaultFilters);
  const [page, setPage] = useState(1);
  const [sortState, setSortState] = useState<VoucherSortState>(null);

  const debouncedSearch = useDebouncedValue(filters.search, 400);

  const filtered = useMemo(
    () => filterVouchers(vouchersListMock, debouncedSearch),
    [debouncedSearch],
  );

  const sorted = useMemo(
    () => sortVouchers(filtered, sortState),
    [filtered, sortState],
  );

  const pagination = useMemo(
    () => paginateVouchers(sorted, page, filters.pageSize),
    [sorted, page, filters.pageSize],
  );

  const { rows, totalPages, page: currentPage } = pagination;

  const tableData = useMemo(() => rowsToTableData(rows), [rows]);
  const showTable = rows.length > 0;

  useEffect(() => {
    if (page !== pagination.page) {
      setPage(pagination.page);
    }
  }, [page, pagination.page]);

  const handleFilterChange = useCallback(
    (patch: Partial<VoucherListFilters>) => {
      setFilters((prev) => ({ ...prev, ...patch }));
      setPage(1);
    },
    [],
  );

  const handleSort = useCallback((key: VoucherSortKey) => {
    setSortState((prev) => toggleSortState(prev, key));
    setPage(1);
  }, []);

  const handlePageChange = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <VouchersHeaderSection />
      <VouchersSummarySection summary={vouchersSummaryMock} />
      <VouchersContentSection
        filters={filters}
        onFilterChange={handleFilterChange}
        tableRows={tableData}
        showTable={showTable}
        page={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        sortState={sortState}
        onSort={handleSort}
        emptySlot={<VouchersEmptySection />}
      />
    </div>
  );
}
