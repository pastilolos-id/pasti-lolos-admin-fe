import TransactionDetailPage from "@/templates/Transactions/TransactionDetailPage";

interface TransactionDetailRouteProps {
  params: Promise<{ id: string }>;
}

export default async function TransactionDetailRoute({
  params,
}: TransactionDetailRouteProps) {
  await params;
  return <TransactionDetailPage />;
}
