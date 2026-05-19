import type {
  VoucherDisplayStatus,
  VoucherRow,
} from "@/templates/Vouchers/VoucherPage/types";

import type { VoucherApiItem } from "./types";

export function formatVoucherDate(iso: string): string {
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

/** Design literal: `Rp. 60000` (no thousand separator). */
export function formatVoucherPrice(amountIdr: number): string {
  return `Rp. ${amountIdr}`;
}

export function mapApiStatusToDisplay(isActive: boolean): VoucherDisplayStatus {
  return isActive ? "aktif" : "tidak_aktif";
}

export function mapVoucherApiItemToRow(
  api: VoucherApiItem,
  rowNo: number,
): VoucherRow {
  return {
    id: api.id,
    judul: api.title,
    kode: api.code,
    startDateIso: api.valid_from,
    endDateIso: api.valid_until,
    startDateDisplay: formatVoucherDate(api.valid_from),
    endDateDisplay: formatVoucherDate(api.valid_until),
    nilaiIdr: api.amount,
    nilaiDisplay: formatVoucherPrice(api.amount),
    displayStatus: mapApiStatusToDisplay(api.is_active),
    rowNo,
  };
}
