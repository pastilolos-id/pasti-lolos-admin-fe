import type { QueryClient } from "@tanstack/react-query";

import { ApiError } from "@/lib/auth/api-client";

import { getTransactions } from "./transactionsApi";
import type { TransactionsListResponse } from "./types";

export class TransactionNotFoundError extends Error {
  constructor(message = "Transaksi tidak ditemukan.") {
    super(message);
    this.name = "TransactionNotFoundError";
  }
}

function findOrderIdInListCache(
  queryClient: QueryClient,
  transactionId: string,
): number | null {
  const entries = queryClient.getQueriesData<TransactionsListResponse>({
    queryKey: ["transactions", "list"],
  });

  for (const [, data] of entries) {
    if (!data?.data) {
      continue;
    }
    const match = data.data.find(
      (item) => item.transactionId === transactionId,
    );
    if (match) {
      return match.orderId;
    }
  }

  return null;
}

export async function resolveOrderIdByTransactionId(
  transactionId: string,
  queryClient: QueryClient,
): Promise<number> {
  const trimmed = transactionId.trim();
  if (!trimmed) {
    throw new TransactionNotFoundError();
  }

  const fromCache = findOrderIdInListCache(queryClient, trimmed);
  if (fromCache != null) {
    return fromCache;
  }

  const listResponse = await getTransactions({
    search: trimmed,
    page: 1,
    limit: 1,
  });

  const first = listResponse.data[0];
  if (first && first.transactionId === trimmed) {
    return first.orderId;
  }

  throw new TransactionNotFoundError();
}

export function isTransactionNotFoundError(
  error: unknown,
): error is TransactionNotFoundError {
  return error instanceof TransactionNotFoundError;
}

export function transactionNotFoundApiError(): ApiError {
  return new ApiError(404, { message: "Transaksi tidak ditemukan." });
}
