type TransactionDetailItemSectionProps = {
  title: string;
};

export function TransactionDetailItemSection({
  title,
}: TransactionDetailItemSectionProps) {
  return (
    <section>
      <h2 className="mb-2 text-s1 text-neutral-6">Nama paket</h2>
      <p className="max-w-4xl text-b3 text-neutral-5">{title}</p>
    </section>
  );
}
