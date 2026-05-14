import type { TransactionListFilters, TransactionRow } from "../types";

function normalize(s: string): string {
  return s.trim().toLowerCase();
}

export function filterTransactions(
  rows: TransactionRow[],
  filters: TransactionListFilters,
): TransactionRow[] {
  const q = normalize(filters.search);
  return rows.filter((row) => {
    if (!q) {
      return true;
    }
    const fields = [row.buyerName, row.buyerEmail].map((v) =>
      normalize(String(v)),
    );
    return fields.some((f) => f.includes(q));
  });
}

export function paginateSlice<T>(
  items: T[],
  page: number,
  pageSize: number,
): T[] {
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

export function totalPages(count: number, pageSize: number): number {
  if (count <= 0) {
    return 1;
  }
  return Math.ceil(count / pageSize);
}
