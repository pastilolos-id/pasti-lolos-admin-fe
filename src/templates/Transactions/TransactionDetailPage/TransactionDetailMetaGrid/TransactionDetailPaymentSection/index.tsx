import { cn } from "@/lib/utils";

import { TransactionDetailInfoIcon } from "../../TransactionDetailCodeSection/TransactionDetailInfoIcon";

const providerStyles: Record<string, string> = {
  QRIS: "text-neutral-6",
  BNI: "text-orange-500",
  Dana: "text-blue-500",
  Mandiri: "text-yellow",
  BRI: "text-blue-700",
  BCA: "text-blue-500",
};

type TransactionDetailPaymentSectionProps = {
  provider: string;
  providerLogo: string;
  paymentMethodLabel: string;
  accountNumber: string;
  accountName: string;
};

export function TransactionDetailPaymentSection({
  provider,
  providerLogo,
  paymentMethodLabel,
  accountNumber,
  accountName,
}: TransactionDetailPaymentSectionProps) {
  const isQris = paymentMethodLabel.toLowerCase() === "qris";
  const displayProvider = providerLogo || provider;

  return (
    <section>
      <h2 className="mb-3 text-s1 text-neutral-6">Metode pembayaran</h2>
      <div className="flex max-w-sm items-center gap-4 rounded-2xl border border-neutral-3 p-4">
        <div
          className={cn(
            "text-s1 font-semibold",
            providerStyles[displayProvider] ?? "text-neutral-6",
          )}
        >
          {displayProvider}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-b2 font-semibold text-neutral-6">
            {paymentMethodLabel}
          </p>
          {isQris ? (
            <p className="text-b2 text-neutral-5">Pembayaran via QRIS</p>
          ) : (
            <>
              <p className="text-b2 font-semibold text-neutral-6">
                {accountNumber}
              </p>
              <p className="text-b2 text-neutral-5">{accountName}</p>
            </>
          )}
        </div>
        <TransactionDetailInfoIcon description="Rekening tujuan transfer sesuai instruksi pembayaran." />
      </div>
    </section>
  );
}
