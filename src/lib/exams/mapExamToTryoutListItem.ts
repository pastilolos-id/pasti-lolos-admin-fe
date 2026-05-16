import type {
  TryoutInstitution,
  TryoutListItem,
} from "@/templates/Tryout/types";

import type { ExamApiItem, ExamsListResponse } from "./types";

function parseInstitution(subjectName: string): TryoutInstitution | null {
  const normalized = subjectName.trim().toUpperCase();
  if (normalized === "BUMN" || normalized === "CPNS") {
    return normalized;
  }
  return null;
}

export function mapExamApiItemToTryoutListItem(
  item: ExamApiItem,
): TryoutListItem | null {
  if (item.examType !== "tryout") {
    return null;
  }

  const institution = parseInstitution(item.subject.subjectName);
  if (!institution) {
    return null;
  }

  return {
    id: String(item.id),
    title: item.examName,
    questionCount: item.jumlahSoal ?? item.totalQuestions,
    durationMinutes: item.durationMinutes,
    institution,
    price: item.price,
  };
}

export function mapExamsListResponseToTryoutItems(
  response: ExamsListResponse,
): TryoutListItem[] {
  return response.data
    .map(mapExamApiItemToTryoutListItem)
    .filter((item): item is TryoutListItem => item !== null);
}
