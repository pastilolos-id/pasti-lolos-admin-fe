import { TransactionDetailInfoIcon } from "./TransactionDetailInfoIcon";

type TransactionDetailCodeSectionProps = {
  transactionCode: string;
};

export function TransactionDetailCodeSection({
  transactionCode,
}: TransactionDetailCodeSectionProps) {
  return (
    <section>
      <h2 className="mb-2 text-s1 text-neutral-6">Kode transaksi</h2>
      <div className="flex items-center gap-2">
        <p className="text-b2 font-semibold text-neutral-6">
          {transactionCode}
        </p>
        <TransactionDetailInfoIcon description="Nomor referensi transaksi untuk verifikasi pembayaran." />
      </div>
    </section>
  );
}
