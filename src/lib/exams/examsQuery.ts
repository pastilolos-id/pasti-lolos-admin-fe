import { useQuery } from "@tanstack/react-query";

import { getExamPackageDetail, getExams } from "./examsApi";
import type { ExamsListParams } from "./types";

export const examsQueryKeys = {
  list: (params: ExamsListParams) => ["exams", "list", params] as const,
  detail: (id: number) => ["exams", "detail", id] as const,
};

export function useExamsListQuery(params: ExamsListParams) {
  return useQuery({
    queryKey: examsQueryKeys.list(params),
    queryFn: () => getExams(params),
  });
}

export function useExamPackageDetailQuery(examId: number | null) {
  return useQuery({
    queryKey: examsQueryKeys.detail(examId ?? 0),
    enabled: examId != null && examId > 0,
    queryFn: () => getExamPackageDetail(examId as number),
  });
}
