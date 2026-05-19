import type {
  AccountRow,
  AccountSortDirection,
  AccountSortKey,
  AccountSortState,
} from "./types";

export function filterAccounts(rows: AccountRow[], search: string): AccountRow[] {
  const q = search.trim().toLowerCase();
  if (!q) {
    return rows;
  }
  return rows.filter(
    (row) =>
      row.nama.toLowerCase().includes(q) ||
      row.email.toLowerCase().includes(q),
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

function compareStatus(a: AccountRow, b: AccountRow): number {
  return compareStrings(a.displayStatus, b.displayStatus);
}

function applyDirection(
  result: number,
  direction: AccountSortDirection,
): number {
  return direction === "asc" ? result : -result;
}

export function sortAccounts(
  rows: AccountRow[],
  sortState: AccountSortState,
): AccountRow[] {
  if (!sortState) {
    return rows;
  }

  const { key, direction } = sortState;
  const sorted = [...rows];

  sorted.sort((a, b) => {
    let result = 0;
    switch (key) {
      case "nama":
        result = compareStrings(a.nama, b.nama);
        break;
      case "email":
        result = compareStrings(a.email, b.email);
        break;
      case "createdAt":
        result = compareDates(a.createdAtIso, b.createdAtIso);
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

export type PaginateAccountsResult = {
  rows: AccountRow[];
  total: number;
  totalPages: number;
  page: number;
};

export function paginateAccounts(
  rows: AccountRow[],
  page: number,
  pageSize: number,
): PaginateAccountsResult {
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
  current: AccountSortState,
  key: AccountSortKey,
): AccountSortState {
  if (!current || current.key !== key) {
    return { key, direction: "asc" };
  }
  if (current.direction === "asc") {
    return { key, direction: "desc" };
  }
  return null;
}
