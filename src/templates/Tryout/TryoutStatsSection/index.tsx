import Icon from "@/components/Icon";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type { TryoutPageStats } from "../types";
import TryoutStatsTrendBadge from "./TryoutStatsTrendBadge";

type TryoutStatsSectionProps = {
  stats: TryoutPageStats;
};

export default function TryoutStatsSection({ stats }: TryoutStatsSectionProps) {
  return (
    <Card
      className={cn(
        "relative gap-0 rounded-3xl border border-[#EEEEEE] bg-white p-4 shadow-none sm:flex sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5",
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-2 pr-14 sm:gap-3 sm:pr-0">
        <p className="text-b2 font-medium text-neutral-5">{stats.label}</p>
        <p className="text-h2 font-bold text-neutral-6 sm:text-[28px] sm:leading-tight">
          {stats.totalQuestionsDisplay}
        </p>
        <div className="mt-1 sm:mt-0">
          <TryoutStatsTrendBadge label={stats.trendLabel} />
        </div>
      </div>
      <div
        className="absolute right-4 top-4 flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-4/15 sm:static sm:size-14"
        aria-hidden
      >
        <Icon name="people-circle-fill" size={28} className="text-primary-4" />
      </div>
    </Card>
  );
}
