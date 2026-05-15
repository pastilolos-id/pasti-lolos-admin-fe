"use client";

import { useParams } from "next/navigation";

import { parseTransactionApiError } from "@/lib/transactions/parseTransactionApiError";
import { useTransactionDetailQuery } from "@/lib/transactions/transactionsQuery";

import { TransactionDetailBackLink } from "./TransactionDetailBackLink";
import { TransactionDetailCodeSection } from "./TransactionDetailCodeSection";
import { TransactionDetailInnerCard } from "./TransactionDetailInnerCard";
import { TransactionDetailItemSection } from "./TransactionDetailItemSection";
import { TransactionDetailMetaGrid } from "./TransactionDetailMetaGrid";
import { TransactionDetailPageTitle } from "./TransactionDetailPageTitle";
import { TransactionDetailProofSection } from "./TransactionDetailProofSection";
import { TransactionDetailSummarySection } from "./TransactionDetailSummarySection";

export type { TransactionDetail } from "./transactionDetailTypes";

export default function TransactionDetailPage() {
  const params = useParams<{ id: string }>();
  const rawId = params?.id ?? "";
  const transactionId = decodeURIComponent(rawId).trim();

  const {
    data: transaction,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useTransactionDetailQuery(transactionId);

  const isInitialLoading = isLoading || (isFetching && !transaction);

  return (
    <section className="space-y-4">
      <div className="space-y-6 rounded-card-medium border border-neutral-3 bg-neutral-1 p-4 sm:p-6">
        <TransactionDetailBackLink />
        <TransactionDetailPageTitle />

        {!transactionId ? (
          <div className="rounded-3xl border border-neutral-3 p-6">
            <p className="text-b2 text-neutral-6">ID transaksi tidak valid.</p>
          </div>
        ) : isInitialLoading ? (
          <div className="rounded-3xl border border-neutral-3 p-6 text-b2 text-neutral-6">
            Memuat detail transaksi...
          </div>
        ) : isError || !transaction ? (
          <div className="rounded-3xl border border-neutral-3 p-6">
            <p className="text-b2 text-neutral-6">
              {parseTransactionApiError(error)}
            </p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-4 rounded-full bg-red px-6 py-2 text-s1 text-white hover:bg-red/85"
            >
              Coba Lagi
            </button>
          </div>
        ) : (
          <TransactionDetailInnerCard>
            <TransactionDetailItemSection title={transaction.title} />
            <TransactionDetailCodeSection
              transactionCode={transaction.transactionCode}
            />
            <TransactionDetailMetaGrid
              provider={transaction.provider}
              providerLogo={transaction.providerLogo}
              paymentMethodLabel={transaction.paymentMethodLabel}
              accountNumber={transaction.accountNumber}
              accountName={transaction.accountName}
              transactionTime={transaction.transactionTime}
              detailStatus={transaction.detailStatus}
              notes={transaction.notes}
            />
            <TransactionDetailProofSection
              proofUrl={transaction.proofUrl}
              hasProof={transaction.hasProof}
              rowId={transaction.id}
            />
            <TransactionDetailSummarySection
              originalPrice={transaction.originalPrice}
              discount={transaction.discount}
              price={transaction.price}
            />
          </TransactionDetailInnerCard>
        )}
      </div>
    </section>
  );
}
