"use client";

import { useMemo, useState } from "react";
import { tryoutListMock, tryoutPageStatsMock } from "./mockData";
import TryoutHeaderSection from "./TryoutHeaderSection";
import TryoutListSection from "./TryoutListSection";
import TryoutStatsSection from "./TryoutStatsSection";
import type { TryoutListFilters, TryoutListItem } from "./types";

const defaultFilters: TryoutListFilters = {
  search: "",
  institution: "all",
};

function filterTryouts(
  rows: TryoutListItem[],
  filters: TryoutListFilters,
): TryoutListItem[] {
  const q = filters.search.trim().toLowerCase();
  return rows.filter((row) => {
    if (
      filters.institution !== "all" &&
      row.institution !== filters.institution
    ) {
      return false;
    }
    if (!q) return true;
    return (
      row.title.toLowerCase().includes(q) || row.id.toLowerCase().includes(q)
    );
  });
}

export default function TryoutPage() {
  const [filters, setFilters] = useState<TryoutListFilters>(defaultFilters);

  const filtered = useMemo(
    () => filterTryouts(tryoutListMock, filters),
    [filters],
  );

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
      />
    </div>
  );
}
