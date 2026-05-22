import { vouchersListMock } from "@/templates/Vouchers/VoucherPage/mockData";

import type { VoucherRow } from "@/templates/Vouchers/VoucherPage/types";

/** Mock lookup until BE detail endpoint is wired. */
export function getVoucherMockById(id: string): VoucherRow | undefined {
  return vouchersListMock.find((row) => row.id === id);
}
