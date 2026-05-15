import { useQuery } from "@tanstack/react-query";

import { getTransactions, getTransactionsSummary } from "./transactionsApi";
import type { TransactionsListParams } from "./types";

export const transactionsQueryKeys = {
  list: (params: TransactionsListParams) =>
    ["transactions", "list", params] as const,
  summary: ["transactions", "summary"] as const,
};

export function useTransactionsListQuery(params: TransactionsListParams) {
  return useQuery({
    queryKey: transactionsQueryKeys.list(params),
    queryFn: () => getTransactions(params),
  });
}

export function useTransactionsSummaryQuery() {
  return useQuery({
    queryKey: transactionsQueryKeys.summary,
    queryFn: getTransactionsSummary,
  });
}
