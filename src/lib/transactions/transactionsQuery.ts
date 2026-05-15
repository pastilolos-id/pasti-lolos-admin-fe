import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getTransactions,
  getTransactionsSummary,
  rejectTransaction,
  verifyPayment,
} from "./transactionsApi";
import type {
  RejectTransactionRequest,
  TransactionsListParams,
  VerifyPaymentRequest,
} from "./types";

export const transactionsQueryKeys = {
  list: (params: TransactionsListParams) =>
    ["transactions", "list", params] as const,
  summary: ["transactions", "summary"] as const,
};

function invalidateTransactionsQueries(
  queryClient: ReturnType<typeof useQueryClient>,
) {
  void queryClient.invalidateQueries({
    queryKey: transactionsQueryKeys.summary,
  });
  void queryClient.invalidateQueries({
    queryKey: ["transactions", "list"],
  });
}

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

export function useVerifyPaymentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      orderId,
      body,
    }: {
      orderId: number;
      body: VerifyPaymentRequest;
    }) => verifyPayment(orderId, body),
    onSuccess: () => {
      invalidateTransactionsQueries(queryClient);
    },
  });
}

export function useRejectTransactionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      orderId,
      body,
    }: {
      orderId: number;
      body: RejectTransactionRequest;
    }) => rejectTransaction(orderId, body),
    onSuccess: () => {
      invalidateTransactionsQueries(queryClient);
    },
  });
}
