import { apiFetch } from "@/lib/auth/api-client";

import type {
  TransactionsListParams,
  TransactionsListResponse,
  TransactionsSummaryResponse,
} from "./types";

function buildQueryString(params: TransactionsListParams): string {
  const searchParams = new URLSearchParams();

  if (params.type) {
    searchParams.set("type", params.type);
  }
  if (params.status) {
    searchParams.set("status", params.status);
  }
  if (params.search?.trim()) {
    searchParams.set("search", params.search.trim());
  }
  if (params.page != null) {
    searchParams.set("page", String(params.page));
  }
  if (params.limit != null) {
    searchParams.set("limit", String(params.limit));
  }

  const qs = searchParams.toString();
  return qs ? `?${qs}` : "";
}

export function getTransactions(params: TransactionsListParams = {}) {
  const query = buildQueryString(params);
  return apiFetch<TransactionsListResponse>(`/transactions${query}`, {
    method: "GET",
  });
}

export function getTransactionsSummary() {
  return apiFetch<TransactionsSummaryResponse>("/transactions/summary", {
    method: "GET",
  });
}
