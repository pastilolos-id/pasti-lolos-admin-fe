import { parseDisplayDate } from "@/lib/date/displayDate";
import type { VoucherFormValues } from "@/templates/Vouchers/VoucherForm/voucherFormTypes";

import type { VoucherCreatePayload } from "./types";

/** Parses DD/MM/YYYY to ISO date string. Falls back to raw input if invalid. */
export function parseDdMmYyyyToIso(value: string): string {
  const parsed = parseDisplayDate(value);
  return parsed ? parsed.toISOString() : value.trim();
}

export function mapVoucherFormToCreatePayload(
  values: VoucherFormValues,
): VoucherCreatePayload {
  const amount = Number(values.nilai);
  return {
    title: values.judul.trim(),
    code: values.kode.trim(),
    valid_from: parseDdMmYyyyToIso(values.startDate),
    valid_until: parseDdMmYyyyToIso(values.endDate),
    amount: Number.isFinite(amount) ? amount : 0,
    is_active: values.status === "aktif",
  };
}
