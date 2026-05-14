import Icon from "@/components/Icon";
import { cn } from "@/lib/utils";

export type TransactionsSummary = {
  totalCount: number;
  successCount: number;
  pendingCount: number;
};

type TransactionsSummarySectionProps = {
  summary: TransactionsSummary;
};

type TrendTone = "up" | "down";

function TrendPill({ text, tone }: { text: string; tone: TrendTone }) {
  const up = tone === "up";
  return (
    <span
      className={cn(
        "inline-flex w-fit max-w-full items-center rounded-full px-2.5 py-1 text-xs font-semibold leading-tight",
        up ? "bg-green/15 text-green" : "bg-[#FF5649]/12 text-[#FF5649]",
      )}
    >
      {text}
    </span>
  );
}

function StatCard({
  label,
  value,
  trendText,
  trendTone,
}: {
  label: string;
  value: string | number;
  trendText: string;
  trendTone: TrendTone;
}) {
  return (
    <div className="relative min-h-31 rounded-[23.5px] border border-[#F6F6F6] bg-white p-4 md:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <p className="text-c1 font-medium text-neutral-5">{label}</p>
          <p className="text-h3 font-bold tracking-tight text-neutral-6">
            {value}
          </p>
          <TrendPill text={trendText} tone={trendTone} />
        </div>
        <div
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-5/15 text-primary-5 md:size-12"
          aria-hidden
        >
          <Icon name="card" size={22} className="shrink-0" />
        </div>
      </div>
    </div>
  );
}

export default function TransactionsSummarySection({
  summary,
}: TransactionsSummarySectionProps) {
  const cards = [
    {
      label: "Total Transaksi",
      value: summary.totalCount,
      trendText: "-2% vs hari sebelumnya",
      trendTone: "down" as const,
    },
    {
      label: "Transaksi Sukses",
      value: summary.successCount,
      trendText: "2% vs hari sebelumnya",
      trendTone: "up" as const,
    },
    {
      label: "Transaksi Pending",
      value: summary.pendingCount,
      trendText: "-2% vs hari sebelumnya",
      trendTone: "down" as const,
    },
  ] as const;

  return (
    <section
      className="grid grid-cols-1 gap-3 sm:grid-cols-3"
      aria-label="Ringkasan transaksi"
    >
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </section>
  );
}
