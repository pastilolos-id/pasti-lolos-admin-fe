import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { mapTransactionDetailResponseToUi } from "./mapTransactionDetail";
import { resolveOrderIdByTransactionId } from "./resolveTransactionOrderId";
import {
  getTransactionDetail,
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
  detail: (transactionId: string) =>
    ["transactions", "detail", transactionId] as const,
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
  void queryClient.invalidateQueries({
    queryKey: ["transactions", "detail"],
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

export function useTransactionDetailQuery(transactionId: string) {
  const queryClient = useQueryClient();
  const trimmedId = transactionId.trim();

  return useQuery({
    queryKey: transactionsQueryKeys.detail(trimmedId),
    enabled: Boolean(trimmedId),
    queryFn: async () => {
      const orderId = await resolveOrderIdByTransactionId(
        trimmedId,
        queryClient,
      );
      const response = await getTransactionDetail(orderId);
      return mapTransactionDetailResponseToUi(response, trimmedId);
    },
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
