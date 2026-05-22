import type { VoucherFormValues } from "@/templates/Vouchers/VoucherForm/voucherFormTypes";

import { mapVoucherFormToCreatePayload } from "./mapVoucherFormToCreatePayload";
import type { VoucherUpdatePayload } from "./types";

export function mapVoucherFormToUpdatePayload(
  values: VoucherFormValues,
): VoucherUpdatePayload {
  return mapVoucherFormToCreatePayload(values);
}
