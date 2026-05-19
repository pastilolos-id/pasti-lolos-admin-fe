"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { useDebouncedValue } from "@/hooks/useDebouncedValue";

import { accountsListMock } from "../mockData";
import type {
  AccountListFilters,
  AccountPageConfig,
  AccountSortKey,
  AccountSortState,
} from "../types";
import {
  filterAccounts,
  paginateAccounts,
  sortAccounts,
  toggleSortState,
} from "../accountListLogic";
import AccountManagementEmptySection from "./AccountManagementEmptySection";
import AccountManagementFiltersSection from "./AccountManagementFiltersSection";
import AccountManagementPaginationSection from "./AccountManagementPaginationSection";
import AccountManagementTableSection from "./AccountManagementTableSection";
import { rowsToTableData } from "./AccountManagementTableSection/columns";

const defaultFilters: AccountListFilters = {
  search: "",
  pageSize: 10,
};

type AccountManagementTableProps = Pick<
  AccountPageConfig,
  "createButtonLabel" | "createHref"
>;

export default function AccountManagementTable({
  createButtonLabel,
  createHref,
}: AccountManagementTableProps) {
  const [filters, setFilters] = useState<AccountListFilters>(defaultFilters);
  const [page, setPage] = useState(1);
  const [sortState, setSortState] = useState<AccountSortState>(null);

  const debouncedSearch = useDebouncedValue(filters.search, 400);

  const filtered = useMemo(
    () => filterAccounts(accountsListMock, debouncedSearch),
    [debouncedSearch],
  );

  const sorted = useMemo(
    () => sortAccounts(filtered, sortState),
    [filtered, sortState],
  );

  const pagination = useMemo(
    () => paginateAccounts(sorted, page, filters.pageSize),
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
    (patch: Partial<AccountListFilters>) => {
      setFilters((prev) => ({ ...prev, ...patch }));
      setPage(1);
    },
    [],
  );

  const handleSort = useCallback((key: AccountSortKey) => {
    setSortState((prev) => toggleSortState(prev, key));
    setPage(1);
  }, []);

  const handlePageChange = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const createLabel = createButtonLabel.startsWith("+")
    ? createButtonLabel
    : `${createButtonLabel}`;

  return (
    <section
      className="flex flex-col gap-4 rounded-[23.5px] border border-[#F6F6F6] bg-white p-3 sm:p-4 md:p-5"
      aria-label="Data akun"
    >
      <AccountManagementFiltersSection
        filters={filters}
        onChange={handleFilterChange}
        createButtonLabel={createLabel}
        createHref={createHref}
      />

      {showTable ? (
        <>
          <AccountManagementTableSection
            rows={tableData}
            sortState={sortState}
            onSort={handleSort}
          />
          <AccountManagementPaginationSection
            page={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <AccountManagementEmptySection />
      )}
    </section>
  );
}
