import type { TryoutListItem, TryoutPageStats } from "./types";

/** Statistik halaman — nanti bisa dari GET /admin/tryouts/stats. */
export const tryoutPageStatsMock: TryoutPageStats = {
  label: "Jumlah Soal",
  totalQuestionsDisplay: "10.000",
  trendLabel: "7% vs bulan sebelumnya",
  trendPercent: 7,
};

/**
 * Daftar tryout mock — nanti dari GET /admin/tryouts.
 * Minimal 6 baris untuk uji grid desktop 3 kolom.
 */
export const tryoutListMock: TryoutListItem[] = [
  {
    id: "tryout-1",
    title: "Try Out Challenge 12",
    questionCount: 110,
    durationMinutes: 100,
    institution: "BUMN",
    price: 299_000,
  },
  {
    id: "tryout-2",
    title: "Try Out Challenge 12",
    questionCount: 110,
    durationMinutes: 100,
    institution: "CPNS",
    price: 249_000,
    specialPrice: 199_000,
    originalPrice: 249_000,
  },
  {
    id: "tryout-3",
    title: "Try Out Challenge 12",
    questionCount: 110,
    durationMinutes: 100,
    institution: "BUMN",
    price: 299_000,
  },
  {
    id: "tryout-4",
    title: "Try Out Challenge 12",
    questionCount: 110,
    durationMinutes: 100,
    institution: "CPNS",
    price: 299_000,
    specialPrice: 259_000,
    originalPrice: 299_000,
  },
  {
    id: "tryout-5",
    title: "Try Out Challenge 12",
    questionCount: 110,
    durationMinutes: 100,
    institution: "BUMN",
    price: 299_000,
  },
  {
    id: "tryout-6",
    title: "Try Out Challenge 12",
    questionCount: 110,
    durationMinutes: 100,
    institution: "CPNS",
    price: 299_000,
  },
];
