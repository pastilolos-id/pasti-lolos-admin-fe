import Icon from "@/components/Icon";
import { cn } from "@/lib/utils";
import type { SummaryCardType } from "../data";

export default function SummaryCard({
  label,
  value,
  trendPercent,
  icon,
  iconBgClass,
}: SummaryCardType) {
  const isPositive = trendPercent >= 0;

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-card-border p-4">
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full size-12",
          iconBgClass,
        )}
      >
        <Icon name={icon} size={24} fill="currentColor" />
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-b3 text-neutral-5">{label}</p>
        <p className="text-s1 text-neutral-6">{value}</p>
        <span
          className={cn(
            "text-c1 font-semibold",
            isPositive ? "text-green" : "text-red",
          )}
        >
          {isPositive ? "+" : ""}
          {trendPercent}%
        </span>
      </div>
    </div>
  );
}
