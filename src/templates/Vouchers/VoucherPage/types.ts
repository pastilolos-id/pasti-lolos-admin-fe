/**
 * Domain types for the admin Vouchers screen (PNG reference).
 *
 * Expected REST mapping (illustrative):
 * - `id` -> `id` (UUID)
 * - `judul` -> `title`
 * - `kode` -> `code`
 * - `startDateIso` -> `valid_from` (ISO 8601)
 * - `endDateIso` -> `valid_until` (ISO 8601)
 * - `nilaiIdr` -> `amount` (integer IDR)
 * - `displayStatus` -> `is_active`
 */

export type VoucherDisplayStatus = "aktif" | "tidak_aktif";

export type VoucherRow = {
  id: string;
  judul: string;
  kode: string;
  startDateIso: string;
  endDateIso: string;
  /** Format DD/MM/YYYY for table display. */
  startDateDisplay: string;
  endDateDisplay: string;
  nilaiIdr: number;
  /** Design literal: `Rp. 60000` */
  nilaiDisplay: string;
  displayStatus: VoucherDisplayStatus;
  rowNo: number;
};

export type VoucherListFilters = {
  search: string;
  pageSize: number;
};

export type VoucherSortKey = "judul" | "startDate" | "endDate" | "status";

export type VoucherSortDirection = "asc" | "desc";

export type VoucherSortState = {
  key: VoucherSortKey;
  direction: VoucherSortDirection;
} | null;

export type VoucherSummaryCard = {
  label: string;
  value: string | number;
  trendText: string;
  trendTone: "up" | "down";
  iconTone: "primary" | "success";
};

export type VoucherSummary = {
  cards: VoucherSummaryCard[];
};
