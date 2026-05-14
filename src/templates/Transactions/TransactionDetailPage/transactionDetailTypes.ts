/**
 * Domain detail transaksi (admin) — selaras layout referensi purchases user.
 *
 * Mapping REST (illustratif, untuk integrasi BE nanti):
 * - `id` -> `id` (UUID / string)
 * - `title` -> `product.name` atau gabungan paket
 * - `transactionCode` -> `transaction_code`
 * - `provider` / `providerLogo` -> `payment_method.bank_code` / label tampilan
 * - `accountNumber` / `accountName` -> rekening tujuan / atas nama
 * - `transactionTime` -> string terformat dari `paid_at` / `created_at`
 * - `detailStatus` -> sama dengan `displayStatus` pada baris daftar
 * - `proofLabel` -> label aksi bukti (upload / lihat)
 * - `hasProof` -> ada file `payment_proof`
 * - `originalPrice` / `discount` / `price` -> breakdown nominal IDR
 */

import type { TransactionDisplayStatus } from "../types";

/** Alias untuk status yang sama dengan kolom tabel transaksi. */
export type TransactionDetailStatus = TransactionDisplayStatus;

export type TransactionDetail = {
  id: string;
  title: string;
  transactionCode: string;
  provider: string;
  /** Teks singkat logo / brand (contoh: "BNI"). */
  providerLogo: string;
  accountNumber: string;
  accountName: string;
  /** String siap tampil, contoh: "Tgl : 28 Januari 2026, Jam 10:20". */
  transactionTime: string;
  detailStatus: TransactionDetailStatus;
  proofLabel: string;
  hasProof: boolean;
  originalPrice: number;
  discount: number;
  price: number;
};
