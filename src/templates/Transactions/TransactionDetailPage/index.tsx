import { TransactionDetailBackLink } from "./TransactionDetailBackLink";
import { TransactionDetailCodeSection } from "./TransactionDetailCodeSection";
import { TransactionDetailInnerCard } from "./TransactionDetailInnerCard";
import { TransactionDetailItemSection } from "./TransactionDetailItemSection";
import { TransactionDetailMetaGrid } from "./TransactionDetailMetaGrid";
import { TransactionDetailPageTitle } from "./TransactionDetailPageTitle";
import { TransactionDetailProofSection } from "./TransactionDetailProofSection";
import { TransactionDetailSummarySection } from "./TransactionDetailSummarySection";
import type { TransactionDetail } from "./transactionDetailTypes";

export { getTransactionDetailById } from "./transactionDetailMock";
export type { TransactionDetail } from "./transactionDetailTypes";

type TransactionDetailPageProps = {
  transaction: TransactionDetail;
};

export default function TransactionDetailPage({
  transaction,
}: TransactionDetailPageProps) {
  return (
    <section className="space-y-4">
      <div className="space-y-6 rounded-card-medium border border-neutral-3 bg-neutral-1 p-4 sm:p-6">
        <TransactionDetailBackLink />
        <TransactionDetailPageTitle />
        <TransactionDetailInnerCard>
          <TransactionDetailItemSection title={transaction.title} />
          <TransactionDetailCodeSection
            transactionCode={transaction.transactionCode}
          />
          <TransactionDetailMetaGrid
            provider={transaction.provider}
            providerLogo={transaction.providerLogo}
            accountNumber={transaction.accountNumber}
            accountName={transaction.accountName}
            transactionTime={transaction.transactionTime}
            detailStatus={transaction.detailStatus}
          />
          <TransactionDetailProofSection
            proofLabel={transaction.proofLabel}
            hasProof={transaction.hasProof}
            rowId={transaction.id}
          />
          <TransactionDetailSummarySection
            originalPrice={transaction.originalPrice}
            discount={transaction.discount}
            price={transaction.price}
          />
        </TransactionDetailInnerCard>
      </div>
    </section>
  );
}
