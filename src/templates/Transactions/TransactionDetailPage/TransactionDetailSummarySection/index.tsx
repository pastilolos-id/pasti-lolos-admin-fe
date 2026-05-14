import { formatIdr } from "@/lib/utils";

type TransactionDetailSummarySectionProps = {
  originalPrice: number;
  discount: number;
  price: number;
};

export function TransactionDetailSummarySection({
  originalPrice,
  discount,
  price,
}: TransactionDetailSummarySectionProps) {
  return (
    <section className="pb-4">
      <h2 className="mb-3 text-s1 text-neutral-6">Ringkasan transaksi</h2>
      <div className="space-y-2 border-b border-neutral-3 pb-4 text-b2">
        <div className="flex items-center justify-between gap-4">
          <span className="text-neutral-5">Harga paket</span>
          <span className="font-semibold text-neutral-6">
            {formatIdr(originalPrice)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-neutral-5">Diskon</span>
          <span className="font-semibold text-neutral-6">
            {formatIdr(discount)}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 border-b border-neutral-3 py-4">
        <span className="text-s1 text-neutral-6">Total pembayaran</span>
        <span className="text-h4 text-red">{formatIdr(price)}</span>
      </div>
    </section>
  );
}
