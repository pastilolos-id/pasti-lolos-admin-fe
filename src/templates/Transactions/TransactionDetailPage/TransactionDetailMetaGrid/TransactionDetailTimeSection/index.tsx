type TransactionDetailTimeSectionProps = {
  transactionTime: string;
};

export function TransactionDetailTimeSection({
  transactionTime,
}: TransactionDetailTimeSectionProps) {
  return (
    <section>
      <h2 className="mb-3 text-s1 text-neutral-6">Waktu transaksi</h2>
      <p className="text-b2 text-neutral-5">{transactionTime}</p>
    </section>
  );
}
