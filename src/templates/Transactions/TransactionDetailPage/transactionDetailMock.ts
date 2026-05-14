import { transactionsMock } from "../mockData";
import type { TransactionDetail } from "./transactionDetailTypes";

const PACKAGE_TITLE =
  "Curi Start Bimbel Persiapan Tes RBB 2026 (Tahap 1 dan Tahap 2) - Jenjang D3-S2 - Masa Aktif 1 Tahun";

const MONTHS_ID = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
] as const;

const PROVIDERS = ["BNI", "Dana", "Mandiri"] as const;

function formatTransactionTime(iso: string, index: number): string {
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) {
    return `Tgl : —, Jam —`;
  }
  const monthIdx = Number.parseInt(m, 10) - 1;
  const monthName =
    MONTHS_ID[monthIdx >= 0 && monthIdx < MONTHS_ID.length ? monthIdx : 0];
  const hour = 8 + (index % 12);
  const minute = (index * 7) % 60;
  return `Tgl : ${d} ${monthName} ${y}, Jam ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function buildDetailFromListRow(
  row: (typeof transactionsMock)[number],
  index: number,
): TransactionDetail {
  const provider = PROVIDERS[index % PROVIDERS.length] ?? "BNI";

  const originalPrice = Math.max(
    row.priceIdr * 2,
    row.priceIdr + 250_000,
  );
  const discount = Math.max(originalPrice - row.priceIdr, 0);

  return {
    id: row.id,
    title: PACKAGE_TITLE,
    transactionCode: row.transactionCode,
    provider,
    providerLogo: provider,
    accountNumber: `0${(310000000 + index).toString().slice(0, 10)}`,
    accountName: row.buyerName,
    transactionTime: formatTransactionTime(row.transactionDateIso, index),
    detailStatus: row.displayStatus,
    proofLabel: row.hasProofThumbnail === 1 ? "Lihat" : "Upload",
    hasProof: row.hasProofThumbnail === 1,
    originalPrice,
    discount,
    price: row.priceIdr,
  };
}

/**
 * Ambil detail transaksi (mock). Ganti implementasi ini saat integrasi BE.
 */
export function getTransactionDetailById(
  id: string,
): TransactionDetail | null {
  const row = transactionsMock.find((r) => r.id === id);
  if (!row) {
    return null;
  }
  const index =
    Number.parseInt(row.id.replace(/^trx-/, ""), 10) - 1;
  const safeIndex = Number.isFinite(index) && index >= 0 ? index : 0;
  return buildDetailFromListRow(row, safeIndex);
}
