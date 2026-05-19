import type { VoucherSummary } from "../types";
import VoucherStatCard from "./VoucherStatCard";

type VouchersSummarySectionProps = {
  summary: VoucherSummary;
};

export default function VouchersSummarySection({
  summary,
}: VouchersSummarySectionProps) {
  return (
    <section
      className="grid grid-cols-1 gap-3 sm:grid-cols-2"
      aria-label="Ringkasan voucher"
    >
      {summary.cards.map((card) => (
        <VoucherStatCard key={card.label} {...card} />
      ))}
    </section>
  );
}
