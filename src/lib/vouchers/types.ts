/**
 * Expected REST shapes for voucher endpoints (illustrative).
 * Map to domain types in `@/templates/Vouchers/VoucherPage/types` via mapVoucher.
 */

export type VoucherApiListParams = {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "title" | "valid_from" | "valid_until" | "status";
  sortOrder?: "asc" | "desc";
};

export type VoucherApiItem = {
  /** UUID */
  id: string;
  /** e.g. "Ramadan Challenge 2026" */
  title: string;
  /** e.g. "RMDNCHL26" */
  code: string;
  /** ISO 8601 */
  valid_from: string;
  /** ISO 8601 */
  valid_until: string;
  /** Integer IDR */
  amount: number;
  is_active: boolean;
};

export type VoucherApiListMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type VoucherApiListResponse = {
  data: VoucherApiItem[];
  meta: VoucherApiListMeta;
};

export type VoucherApiSummaryResponse = {
  totalVouchers: number;
  activeVouchers: number;
  totalTrendPercent: number;
  activeTrendPercent: number;
};
