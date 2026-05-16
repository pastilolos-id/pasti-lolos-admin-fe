import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getExamPackageDetail, getExams, updateExam } from "./examsApi";
import type { ExamsListParams } from "./types";
import type { UpdateExamParentRequest } from "./updateExamTypes";

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

export function useUpdateExamMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: UpdateExamParentRequest }) =>
      updateExam(id, body),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: examsQueryKeys.detail(variables.id),
      });
      void queryClient.invalidateQueries({
        queryKey: ["exams", "list"],
      });
    },
  });
}
