"use client";

import { useMemo, useState } from "react";

import { useExamsListQuery } from "@/lib/exams/examsQuery";
import { mapExamsListResponseToTryoutItems } from "@/lib/exams/mapExamToTryoutListItem";

import { tryoutPageStatsMock } from "./mockData";
import TryoutHeaderSection from "./TryoutHeaderSection";
import TryoutListSection from "./TryoutListSection";
import TryoutStatsSection from "./TryoutStatsSection";
import type { TryoutListFilters, TryoutListItem } from "./types";

const defaultFilters: TryoutListFilters = {
  search: "",
  institution: "BUMN",
};

function filterTryouts(
  rows: TryoutListItem[],
  filters: TryoutListFilters,
): TryoutListItem[] {
  const q = filters.search.trim().toLowerCase();
  if (!q) return rows;
  return rows.filter(
    (row) =>
      row.title.toLowerCase().includes(q) || row.id.toLowerCase().includes(q),
  );
}

function TryoutLoadingSection() {
  return (
    <div className="flex items-center justify-center py-16">
      <p className="text-sm font-medium text-neutral-5">Memuat…</p>
    </div>
  );
}

function TryoutErrorSection() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
      <p className="text-sm font-semibold text-neutral-6">
        Gagal memuat data tryout
      </p>
      <p className="text-c1 text-neutral-5">
        Periksa koneksi Anda dan coba lagi.
      </p>
    </div>
  );
}

export default function TryoutPage() {
  const [filters, setFilters] = useState<TryoutListFilters>(defaultFilters);

  const { data, isLoading, isError, isFetching } = useExamsListQuery({
    category: filters.institution,
  });

  const apiItems = useMemo(
    () => (data ? mapExamsListResponseToTryoutItems(data) : []),
    [data],
  );

  const filtered = useMemo(
    () => filterTryouts(apiItems, filters),
    [apiItems, filters],
  );

  const isInitialLoading = isLoading || (isFetching && !data);

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <TryoutHeaderSection />

      <TryoutStatsSection stats={tryoutPageStatsMock} />

      <TryoutListSection
        search={filters.search}
        onSearchChange={(search) =>
          setFilters((prev) => ({
            ...prev,
            search,
          }))
        }
        institution={filters.institution}
        onInstitutionChange={(institution) =>
          setFilters((prev) => ({
            ...prev,
            institution,
          }))
        }
        items={filtered}
        isLoading={isInitialLoading}
        isError={isError}
        loadingSlot={<TryoutLoadingSection />}
        errorSlot={<TryoutErrorSection />}
      />
    </div>
  );
}
