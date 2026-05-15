"use client";

import { useMemo, useState } from "react";

import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { mapTransactionApiItemToRow } from "@/lib/transactions/mapTransaction";
import { mapTransactionSummary } from "@/lib/transactions/mapTransactionSummary";
import {
  useTransactionsListQuery,
  useTransactionsSummaryQuery,
} from "@/lib/transactions/transactionsQuery";

import TransactionsContentSection from "./TransactionsContentSection";
import { rowsToTableData } from "./TransactionsContentSection/columns";
import TransactionsEmptySection from "./TransactionsContentSection/TransactionsEmptySection";
import TransactionsHeaderSection from "./TransactionsHeaderSection";
import TransactionsSummarySection from "./TransactionsSummarySection";
import type { TransactionListFilters } from "./types";

const defaultFilters: TransactionListFilters = {
  search: "",
  pageSize: 10,
};

function TransactionsSummaryErrorBanner() {
  return (
    <div
      className="rounded-xl border border-[#FF5649]/20 bg-[#FF5649]/8 px-4 py-3"
      role="alert"
    >
      <p className="text-sm font-semibold text-neutral-6">
        Gagal memuat ringkasan
      </p>
      <p className="text-c1 text-neutral-5">
        Periksa koneksi Anda dan coba lagi.
      </p>
    </div>
  );
}

function TransactionsErrorSection() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
      <p className="text-sm font-semibold text-neutral-6">
        Gagal memuat data transaksi
      </p>
      <p className="text-c1 text-neutral-5">
        Periksa koneksi Anda dan coba lagi.
      </p>
    </div>
  );
}

function TransactionsLoadingSection() {
  return (
    <div className="flex items-center justify-center py-16">
      <p className="text-sm font-medium text-neutral-5">Memuat…</p>
    </div>
  );
}

export default function TransactionsPage() {
  const [filters, setFilters] =
    useState<TransactionListFilters>(defaultFilters);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebouncedValue(filters.search, 400);

  const queryParams = useMemo(
    () => ({
      type: filters.type,
      status: filters.status,
      search: debouncedSearch.trim() || undefined,
      page,
      limit: filters.pageSize,
    }),
    [filters.type, filters.status, debouncedSearch, page, filters.pageSize],
  );

  const {
    data: summaryData,
    isLoading: isSummaryLoading,
    isError: isSummaryError,
  } = useTransactionsSummaryQuery();

  const { data, isLoading, isError, isFetching } =
    useTransactionsListQuery(queryParams);

  const mappedSummary = useMemo(
    () => (summaryData ? mapTransactionSummary(summaryData) : undefined),
    [summaryData],
  );

  const rows = useMemo(
    () => (data?.data ?? []).map(mapTransactionApiItemToRow),
    [data?.data],
  );

  const tableData = useMemo(() => rowsToTableData(rows), [rows]);

  const meta = data?.meta;
  const totalPages = meta?.totalPages ?? 1;
  const totalItems = meta?.total ?? 0;
  const currentPage = meta?.page ?? page;
  const pageSize = meta?.limit ?? filters.pageSize;

  const showTable = !isLoading && !isError && rows.length > 0;
  const showEmpty = !isLoading && !isError && rows.length === 0;

  let contentSlot = <TransactionsEmptySection />;
  if (isLoading || (isFetching && !data)) {
    contentSlot = <TransactionsLoadingSection />;
  } else if (isError) {
    contentSlot = <TransactionsErrorSection />;
  } else if (showEmpty) {
    contentSlot = <TransactionsEmptySection />;
  }

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <TransactionsHeaderSection />

      {isSummaryError ? <TransactionsSummaryErrorBanner /> : null}

      <TransactionsSummarySection
        isLoading={isSummaryLoading}
        summary={mappedSummary}
      />

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
        showTable={showTable}
        page={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={setPage}
        emptySlot={contentSlot}
      />
    </div>
  );
}
