import { TrendingDown, TrendingUp } from "lucide-react";

import Icon from "@/components/Icon";
import { cn } from "@/lib/utils";

import type { VoucherSummaryCard } from "../../types";

type VoucherStatCardProps = VoucherSummaryCard;

function TrendPill({ text, tone }: { text: string; tone: "up" | "down" }) {
  const up = tone === "up";
  return (
    <span
      className={cn(
        "inline-flex w-fit max-w-full items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold leading-tight",
        up ? "bg-green/15 text-green" : "bg-[#FF5649]/12 text-[#FF5649]",
      )}
    >
      {up ? (
        <TrendingUp className="size-3.5 shrink-0" aria-hidden />
      ) : (
        <TrendingDown className="size-3.5 shrink-0" aria-hidden />
      )}
      {text}
    </span>
  );
}

export default function VoucherStatCard({
  label,
  value,
  trendText,
  trendTone,
  iconTone,
}: VoucherStatCardProps) {
  const isSuccess = iconTone === "success";

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
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-full md:size-12",
            isSuccess
              ? "bg-green/15 text-green"
              : "bg-primary-5/15 text-primary-5",
          )}
          aria-hidden
        >
          <Icon name="discount" size={22} className="shrink-0" />
        </div>
      </div>
    </div>
  );
}
