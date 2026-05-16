import type { TryoutPageStats } from "./types";

/** Statistik halaman — nanti bisa dari endpoint stats terpisah. */
export const tryoutPageStatsMock: TryoutPageStats = {
  label: "Jumlah Soal",
  totalQuestionsDisplay: "10.000",
  trendLabel: "7% vs bulan sebelumnya",
  trendPercent: 7,
};
