"use client";

import { useEffect, useMemo, useState } from "react";

import { rowsToTableData } from "./TransactionsContentSection/columns";
import { filterTransactions, paginateSlice, totalPages } from "./TransactionsContentSection/filterUtils";
import { transactionsMock } from "./mockData";
import TransactionsContentSection from "./TransactionsContentSection";
import TransactionsEmptySection from "./TransactionsContentSection/TransactionsEmptySection";
import TransactionsHeaderSection from "./TransactionsHeaderSection";
import type { TransactionsSummary } from "./TransactionsSummarySection";
import TransactionsSummarySection from "./TransactionsSummarySection";
import type { TransactionListFilters } from "./types";

const defaultFilters: TransactionListFilters = {
  search: "",
  pageSize: 10,
};

function summarizeAll(): TransactionsSummary {
  const rows = transactionsMock;
  let success = 0;
  let pending = 0;
  for (const r of rows) {
    if (r.displayStatus === "aktif") {
      success += 1;
    } else {
      pending += 1;
    }
  }
  return {
    totalCount: rows.length,
    successCount: success,
    pendingCount: pending,
  };
}

const summaryStatic = summarizeAll();

export default function TransactionsPage() {
  const [filters, setFilters] =
    useState<TransactionListFilters>(defaultFilters);
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => filterTransactions(transactionsMock, filters),
    [filters],
  );

  const pages = useMemo(
    () => totalPages(filtered.length, filters.pageSize),
    [filtered.length, filters.pageSize],
  );

  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), pages));
  }, [pages]);

  const pageRows = useMemo(
    () => paginateSlice(filtered, page, filters.pageSize),
    [filtered, page, filters.pageSize],
  );

  const rowNumberOffset = (page - 1) * filters.pageSize;

  const tableData = useMemo(() => rowsToTableData(pageRows), [pageRows]);

  const hasRows = filtered.length > 0;

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <TransactionsHeaderSection />

      <TransactionsSummarySection summary={summaryStatic} />

      <TransactionsContentSection
        filters={filters}
        onFilterChange={(patch) => {
          setFilters((prev) => ({
            ...prev,
            ...patch,
          }));
          setPage(1);
        }}
        tableRows={tableData}
        showTable={hasRows}
        page={page}
        totalPages={pages}
        totalItems={filtered.length}
        pageSize={filters.pageSize}
        rowNumberOffset={rowNumberOffset}
        onPageChange={setPage}
        emptySlot={<TransactionsEmptySection />}
      />
    </div>
  );
}
