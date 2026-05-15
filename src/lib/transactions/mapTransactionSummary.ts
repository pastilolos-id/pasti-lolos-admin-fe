import type { TransactionsSummary } from "@/templates/Transactions/TransactionsSummarySection";

import type { TransactionsSummaryResponse } from "./types";

type TrendTone = "up" | "down";

function formatChangePercent(changePercent: number): {
  trendText: string;
  trendTone: TrendTone;
} {
  const rounded = Math.round(changePercent);
  const trendTone: TrendTone = rounded >= 0 ? "up" : "down";
  const absValue = Math.abs(rounded);
  const signPrefix = rounded < 0 ? "-" : "";
  const trendText = `${signPrefix}${absValue}% vs hari sebelumnya`;

  return { trendText, trendTone };
}

function mapMetric(
  label: string,
  metric: { value: number; changePercent: number },
): TransactionsSummary["cards"][number] {
  const { trendText, trendTone } = formatChangePercent(metric.changePercent);

  return {
    label,
    value: metric.value,
    trendText,
    trendTone,
  };
}

export function mapTransactionSummary(
  response: TransactionsSummaryResponse,
): TransactionsSummary {
  return {
    cards: [
      mapMetric("Total Transaksi", response.totalTransaksi),
      mapMetric("Transaksi Sukses", response.transaksiSukses),
      mapMetric("Transaksi Pending", response.transaksiPending),
    ],
  };
}

export const transactionsSummaryFallbackCards: TransactionsSummary["cards"] = [
  {
    label: "Total Transaksi",
    value: "—",
    trendText: "—",
    trendTone: "up",
  },
  {
    label: "Transaksi Sukses",
    value: "—",
    trendText: "—",
    trendTone: "up",
  },
  {
    label: "Transaksi Pending",
    value: "—",
    trendText: "—",
    trendTone: "up",
  },
];
