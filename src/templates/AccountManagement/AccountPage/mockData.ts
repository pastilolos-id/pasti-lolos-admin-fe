import { formatAccountCount, formatAccountDate } from "@/lib/account-management/mapAccount";

import type {
  AccountDisplayStatus,
  AccountRow,
  AccountSummary,
} from "./types";

const createdDates = ["2022-05-13", "2022-11-16"] as const;

const statusCycle: AccountDisplayStatus[] = [
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

export const accountSummaryMock: AccountSummary = {
  countDisplay: formatAccountCount(10000),
};

export const accountsListMock: AccountRow[] = Array.from(
  { length: 30 },
  (_, i) => {
    const createdIso = createdDates[i % createdDates.length] ?? "2022-05-13";
    const displayStatus = statusCycle[i % statusCycle.length] ?? "aktif";

    return {
      id: `account-${i + 1}`,
      nama: "Ramadan Chall…",
      email: "ramadan@gmail.com",
      createdAtIso: createdIso,
      createdAtDisplay: formatAccountDate(createdIso),
      displayStatus,
      rowNo: i + 1,
    };
  },
);
