import { tryoutListMock } from "../mockData";
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

/**
 * Mock detail form per id daftar tryout.
 * TODO: ganti dengan `GET /admin/tryouts/:id` saat BE siap.
 */
function buildMockValuesForId(id: string): TryoutFormValues | undefined {
  const item = tryoutListMock.find((row) => row.id === id);
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
