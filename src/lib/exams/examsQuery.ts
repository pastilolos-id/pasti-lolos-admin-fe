import { useQuery } from "@tanstack/react-query";

import { getExams } from "./examsApi";
import type { ExamsListParams } from "./types";

export const examsQueryKeys = {
  list: (params: ExamsListParams) => ["exams", "list", params] as const,
};

export function useExamsListQuery(params: ExamsListParams) {
  return useQuery({
    queryKey: examsQueryKeys.list(params),
    queryFn: () => getExams(params),
  });
}
