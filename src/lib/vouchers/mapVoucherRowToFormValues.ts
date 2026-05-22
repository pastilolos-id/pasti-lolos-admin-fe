import type { VoucherRow } from "@/templates/Vouchers/VoucherPage/types";
import type { VoucherFormValues } from "@/templates/Vouchers/VoucherForm/voucherFormTypes";

export function mapVoucherRowToFormValues(row: VoucherRow): VoucherFormValues {
  return {
    judul: row.judul,
    kode: row.kode,
    startDate: row.startDateDisplay,
    endDate: row.endDateDisplay,
    nilai: String(row.nilaiIdr),
    status: row.displayStatus,
  };
}
