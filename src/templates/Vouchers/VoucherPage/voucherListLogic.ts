import type {
  VoucherRow,
  VoucherSortDirection,
  VoucherSortKey,
  VoucherSortState,
} from "./types";

export function filterVouchers(rows: VoucherRow[], search: string): VoucherRow[] {
  const q = search.trim().toLowerCase();
  if (!q) {
    return rows;
  }
  return rows.filter(
    (row) =>
      row.judul.toLowerCase().includes(q) ||
      row.kode.toLowerCase().includes(q),
  );
}

function compareStrings(a: string, b: string): number {
  return a.localeCompare(b, "id", { sensitivity: "base" });
}

function compareDates(aIso: string, bIso: string): number {
  const a = new Date(aIso).getTime();
  const b = new Date(bIso).getTime();
  return a - b;
}

function compareStatus(a: VoucherRow, b: VoucherRow): number {
  return compareStrings(a.displayStatus, b.displayStatus);
}

function applyDirection(
  result: number,
  direction: VoucherSortDirection,
): number {
  return direction === "asc" ? result : -result;
}

export function sortVouchers(
  rows: VoucherRow[],
  sortState: VoucherSortState,
): VoucherRow[] {
  if (!sortState) {
    return rows;
  }

  const { key, direction } = sortState;
  const sorted = [...rows];

  sorted.sort((a, b) => {
    let result = 0;
    switch (key) {
      case "judul":
        result = compareStrings(a.judul, b.judul);
        break;
      case "startDate":
        result = compareDates(a.startDateIso, b.startDateIso);
        break;
      case "endDate":
        result = compareDates(a.endDateIso, b.endDateIso);
        break;
      case "status":
        result = compareStatus(a, b);
        break;
      default:
        result = 0;
    }
    return applyDirection(result, direction);
  });

  return sorted;
}

export type PaginateVouchersResult = {
  rows: VoucherRow[];
  total: number;
  totalPages: number;
  page: number;
};

export function paginateVouchers(
  rows: VoucherRow[],
  page: number,
  pageSize: number,
): PaginateVouchersResult {
  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const slice = rows.slice(start, start + pageSize);

  const rowsWithNo = slice.map((row, index) => ({
    ...row,
    rowNo: start + index + 1,
  }));

  return {
    rows: rowsWithNo,
    total,
    totalPages,
    page: safePage,
  };
}

export function toggleSortState(
  current: VoucherSortState,
  key: VoucherSortKey,
): VoucherSortState {
  if (!current || current.key !== key) {
    return { key, direction: "asc" };
  }
  if (current.direction === "asc") {
    return { key, direction: "desc" };
  }
  return null;
}
