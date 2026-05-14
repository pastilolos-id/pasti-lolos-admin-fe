import { notFound } from "next/navigation";

import TransactionDetailPage from "@/templates/Transactions/TransactionDetailPage";
import { getTransactionDetailById } from "@/templates/Transactions/TransactionDetailPage/transactionDetailMock";

interface TransactionDetailRouteProps {
  params: Promise<{ id: string }>;
}

export default async function TransactionDetailRoute({
  params,
}: TransactionDetailRouteProps) {
  const { id } = await params;
  const detail = getTransactionDetailById(decodeURIComponent(id));

  if (!detail) {
    notFound();
  }

  return <TransactionDetailPage transaction={detail} />;
}
