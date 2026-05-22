import type { VoucherDisplayStatus } from "@/templates/Vouchers/VoucherPage/types";

import type { VoucherFormValues } from "./voucherFormTypes";

function parseStatus(value: unknown): VoucherDisplayStatus {
  return value === "tidak_aktif" ? "tidak_aktif" : "aktif";
}

export function parseVoucherFormValues(
  data: Record<string, unknown>,
): VoucherFormValues {
  return {
    judul: String(data.judul ?? ""),
    kode: String(data.kode ?? ""),
    startDate: String(data.startDate ?? ""),
    endDate: String(data.endDate ?? ""),
    nilai: String(data.nilai ?? ""),
    status: parseStatus(data.status),
  };
}
