import { subjectNameToSubjectId } from "@/templates/Tryout/TryoutForm/buildTryoutFormInputData";
import type { TryoutParentFormValues } from "@/templates/Tryout/TryoutForm/tryoutFormTypes";

import type { ExamPackageDetailResponse } from "./types";

export function mapExamPackageDetailToTryoutFormValues(
  detail: ExamPackageDetailResponse,
): TryoutParentFormValues {
  return {
    examName: detail.examName,
    description: detail.description ?? "",
    subjectId: subjectNameToSubjectId(detail.subject),
    durationMinutes: String(detail.totalDuration),
    price: String(detail.price),
  };
}
