import type { TryoutListItem } from "../types";
import type { TryoutFormExamType, TryoutFormValues } from "./tryoutFormTypes";

/** Nilai awal mode create — selaras placeholder desain. */
export const emptyTryoutFormValues: TryoutFormValues = {
  examName: "",
  category: "",
  durationDisplay: "",
  startTime: "",
  endTime: "",
  totalQuestions: "",
  passingGrade: "",
  attempts: "",
  examType: "",
  priceAmount: "",
  deadline: "",
  description: "",
  notes: "",
};

/** Mock daftar untuk form view/edit hingga GET detail tersedia. */
const tryoutFormListMock: TryoutListItem[] = [
  {
    id: "20",
    title: "Paket Tryout BUMN 2026",
    questionCount: 275,
    durationMinutes: 120,
    institution: "BUMN",
    price: 39_000,
  },
  {
    id: "21",
    title: "Try Out Challenge CPNS",
    questionCount: 110,
    durationMinutes: 100,
    institution: "CPNS",
    price: 249_000,
    specialPrice: 199_000,
    originalPrice: 249_000,
  },
];

/**
 * Mock detail form per id daftar tryout.
 * TODO: ganti dengan `GET /exams/get/:id` saat BE siap.
 */
function buildMockValuesForId(id: string): TryoutFormValues | undefined {
  const item = tryoutFormListMock.find((row) => row.id === id);
  if (!item) {
    return undefined;
  }

  const n = Number.parseInt(id.replace(/\D/g, ""), 10) || 1;
  const examType: TryoutFormExamType = n % 2 === 0 ? "simulation" : "real";

  return {
    examName: item.title,
    category: item.institution,
    durationDisplay: `${item.durationMinutes} Menit`,
    startTime: "06:28:55",
    endTime: "18:30:00",
    totalQuestions: String(item.questionCount),
    passingGrade: String(75 + (n % 15)),
    attempts: String(1 + (n % 5)),
    examType,
    priceAmount: String(item.price),
    deadline: "2026-12-31",
    description:
      "Ujian ini tentang persiapan seleksi kompetensi. Data mock untuk slicing admin.",
    notes: "Catatan internal admin (mock).",
  };
}

export function getTryoutFormDetailById(
  id: string,
): TryoutFormValues | undefined {
  return buildMockValuesForId(decodeURIComponent(id));
}
