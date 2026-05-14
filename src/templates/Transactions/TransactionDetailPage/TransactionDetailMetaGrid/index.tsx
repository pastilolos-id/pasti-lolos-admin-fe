import type { TransactionDetail } from "../transactionDetailTypes";
import { TransactionDetailPaymentSection } from "./TransactionDetailPaymentSection";
import { TransactionDetailStatusSection } from "./TransactionDetailStatusSection";
import { TransactionDetailTimeSection } from "./TransactionDetailTimeSection";

type TransactionDetailMetaGridProps = Pick<
  TransactionDetail,
  | "provider"
  | "providerLogo"
  | "accountNumber"
  | "accountName"
  | "transactionTime"
  | "detailStatus"
>;

export function TransactionDetailMetaGrid({
  provider,
  providerLogo,
  accountNumber,
  accountName,
  transactionTime,
  detailStatus,
}: TransactionDetailMetaGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <TransactionDetailPaymentSection
        provider={provider}
        providerLogo={providerLogo}
        accountNumber={accountNumber}
        accountName={accountName}
      />
      <TransactionDetailTimeSection transactionTime={transactionTime} />
      <TransactionDetailStatusSection detailStatus={detailStatus} />
    </div>
  );
}
