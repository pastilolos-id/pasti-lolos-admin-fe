import type {
  TransactionDisplayStatus,
  TransactionRow,
} from "@/templates/Transactions/types";

import type { TransactionApiItem, TransactionApiStatus } from "./types";

function toDMY(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    const [y, m, d] = iso.split("-");
    if (y && m && d) {
      return `${d}/${m}/${y}`;
    }
    return iso;
  }
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = String(date.getFullYear());
  return `${d}/${m}/${y}`;
}

function formatPriceTable(amountIdr: number): string {
  return `Rp. ${amountIdr.toLocaleString("id-ID")}`;
}

export function mapApiStatusToDisplay(
  status: TransactionApiStatus | string,
): TransactionDisplayStatus {
  switch (status) {
    case "paid":
      return "berhasil";
    case "failed":
      return "gagal";
    case "pending":
      return "menunggu";
    default:
      return "menunggu";
  }
}

export function mapTransactionApiItemToRow(
  item: TransactionApiItem,
): TransactionRow {
  const proofUrl = item.buktiTransfer?.trim() || null;

  return {
    id: item.transactionId,
    orderId: item.orderId,
    transactionCode: item.transactionId,
    buyerName: item.nama,
    buyerEmail: item.email,
    hasProofThumbnail: proofUrl ? 1 : 0,
    proofUrl,
    transactionDateIso: item.tanggalTransaksi,
    transactionDateDisplay: toDMY(item.tanggalTransaksi),
    priceIdr: item.harga,
    priceDisplay: formatPriceTable(item.harga),
    displayStatus: mapApiStatusToDisplay(item.status),
    rowNo: item.no,
  };
}
