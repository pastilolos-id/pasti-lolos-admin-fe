/**
 * Domain types for the admin Account Management screens.
 *
 * Expected REST mapping (illustrative):
 * - `id` -> `id` (UUID)
 * - `nama` -> `name`
 * - `email` -> `email`
 * - `createdAtIso` -> `created_at` (ISO 8601)
 * - `displayStatus` -> `is_active`
 */

export type AccountRoleVariant = "admin" | "contributors" | "students";

export type AccountDisplayStatus = "aktif" | "tidak_aktif";

export type AccountRow = {
  id: string;
  nama: string;
  email: string;
  createdAtIso: string;
  /** Format DD/MM/YYYY for table display. */
  createdAtDisplay: string;
  displayStatus: AccountDisplayStatus;
  rowNo: number;
};

export type AccountListFilters = {
  search: string;
  pageSize: number;
};

export type AccountSortKey = "nama" | "email" | "createdAt" | "status";

export type AccountSortDirection = "asc" | "desc";

export type AccountSortState = {
  key: AccountSortKey;
  direction: AccountSortDirection;
} | null;

export type AccountSummary = {
  countDisplay: string;
};

export type AccountPageConfig = {
  pageTitle: string;
  summaryLabel: string;
  createButtonLabel: string;
  createHref: string;
};
