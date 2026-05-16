import { apiFetch } from "@/lib/auth/api-client";

import type {
  ExamPackageDetailResponse,
  ExamsListParams,
  ExamsListResponse,
} from "./types";
import type {
  UpdateExamParentRequest,
  UpdateExamResponse,
} from "./updateExamTypes";

function buildQueryString(params: ExamsListParams): string {
  const searchParams = new URLSearchParams();
  searchParams.set("category", params.category);
  const qs = searchParams.toString();
  return qs ? `?${qs}` : "";
}

export function getExams(params: ExamsListParams) {
  const query = buildQueryString(params);
  return apiFetch<ExamsListResponse>(`/exams${query}`, {
    method: "GET",
  });
}

export function getExamPackageDetail(id: number) {
  return apiFetch<ExamPackageDetailResponse>(`/exams/package-detail/${id}`, {
    method: "GET",
  });
}

export function updateExam(id: number, body: UpdateExamParentRequest) {
  return apiFetch<UpdateExamResponse>(`/exams/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}
