import { formatVoucherDate, formatVoucherPrice } from "@/lib/vouchers/mapVoucher";

import type {
  VoucherDisplayStatus,
  VoucherRow,
  VoucherSummary,
} from "./types";

const startDates = ["2022-05-13", "2022-11-16"] as const;
const endDates = ["2022-11-16", "2022-05-13"] as const;

const statusCycle: VoucherDisplayStatus[] = [
  "aktif",
  "tidak_aktif",
  "aktif",
  "tidak_aktif",
  "aktif",
  "tidak_aktif",
  "aktif",
  "tidak_aktif",
  "aktif",
  "tidak_aktif",
];

export const vouchersSummaryMock: VoucherSummary = {
  cards: [
    {
      label: "Total Voucher",
      value: 1000,
      trendText: "-2% vs hari sebelumnya",
      trendTone: "down",
      iconTone: "primary",
    },
    {
      label: "Voucher Aktif",
      value: 700,
      trendText: "2% vs hari sebelumnya",
      trendTone: "up",
      iconTone: "success",
    },
  ],
};

export const vouchersListMock: VoucherRow[] = Array.from(
  { length: 30 },
  (_, i) => {
    const startIso = startDates[i % startDates.length] ?? "2022-05-13";
    const endIso = endDates[i % endDates.length] ?? "2022-11-16";
    const displayStatus = statusCycle[i % statusCycle.length] ?? "aktif";
    const nilaiIdr = 60000;

    return {
      id: `voucher-${i + 1}`,
      judul: "Ramadan Chall…",
      kode: "RMDNCHL26",
      startDateIso: startIso,
      endDateIso: endIso,
      startDateDisplay: formatVoucherDate(startIso),
      endDateDisplay: formatVoucherDate(endIso),
      nilaiIdr,
      nilaiDisplay: formatVoucherPrice(nilaiIdr),
      displayStatus,
      rowNo: i + 1,
    };
  },
);
