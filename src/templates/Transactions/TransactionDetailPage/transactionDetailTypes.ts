import type { TransactionDisplayStatus } from "../types";

/** Alias untuk status yang sama dengan kolom tabel transaksi. */
export type TransactionDetailStatus = TransactionDisplayStatus;

export type TransactionDetail = {
  /** transactionId untuk URL dan key UI. */
  id: string;
  orderId: number;
  title: string;
  transactionCode: string;
  provider: string;
  providerLogo: string;
  paymentMethodLabel: string;
  accountNumber: string;
  accountName: string;
  transactionTime: string;
  detailStatus: TransactionDetailStatus;
  proofUrl: string | null;
  hasProof: boolean;
  originalPrice: number;
  discount: number;
  price: number;
  notes: string | null;
};
