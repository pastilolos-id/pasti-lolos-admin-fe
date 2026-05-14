/**
 * Domain types for the admin Transactions screen (PNG reference).
 *
 * Expected REST shape (illustrative):
 * - `id` -> `id` (UUID)
 * - `buyerName` -> `user.full_name`
 * - `buyerEmail` -> `user.email`
 * - `proofUrl` -> `payment_proof.url` (optional)
 * - `transactionDateIso` -> `created_at` (ISO 8601)
 * - `priceIdr` -> `amount` (integer IDR)
 * - `displayStatus` -> `user.is_active` or domain-specific flag
 */

/** Tampilan status baris seperti desain: pill Aktif / Tidak Aktif. */
export type RowDisplayStatus = "aktif" | "tidak_aktif";

export type TransactionRow = {
  id: string;
  buyerName: string;
  buyerEmail: string;
  /** 1 = tampilkan thumbnail bukti (API bisa boolean; disimpan angka agar kompatibel dengan tabel generik). */
  hasProofThumbnail: 0 | 1;
  transactionDateIso: string;
  /** Format DD/MM/YYYY untuk tampilan tabel. */
  transactionDateDisplay: string;
  priceIdr: number;
  /** Contoh desain: `Rp. 60.000` */
  priceDisplay: string;
  displayStatus: RowDisplayStatus;
};

export type TransactionListFilters = {
  search: string;
  pageSize: number;
};
