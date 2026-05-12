"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import {
  type RevenueFilterTab,
  revenueDataMap,
  revenueFilterTabs,
} from "./data";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--color-primary-5)",
  },
} satisfies ChartConfig;

function formatCurrency(value: number) {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}jt`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(0)}rb`;
  }
  return value.toString();
}

function formatFullCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function RevenueChartSection() {
  const [activeTab, setActiveTab] = useState<RevenueFilterTab>("Hari");

  const chartData = revenueDataMap[activeTab];
  const totalRevenue = chartData.reduce((sum, item) => sum + item.revenue, 0);

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-card-border p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-s1 text-neutral-6">Revenue</h3>
        <div className="flex gap-1 rounded-lg bg-neutral-2 p-1">
          {revenueFilterTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "rounded-md px-3 py-1 text-c1 font-semibold transition-colors cursor-pointer",
                activeTab === tab
                  ? "bg-white text-neutral-6 shadow-sm"
                  : "text-neutral-5 hover:text-neutral-6",
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-c1 text-neutral-5">Total Penjualan</p>
        <p className="text-h4 text-neutral-6">
          {formatFullCurrency(totalRevenue)}
        </p>
      </div>

      <ChartContainer config={chartConfig} className="h-[220px] w-full">
        <BarChart data={chartData} barCategoryGap="20%">
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={12}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={formatCurrency}
            fontSize={12}
            width={50}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value) => formatFullCurrency(value as number)}
              />
            }
          />
          <Bar
            dataKey="revenue"
            fill="var(--color-revenue)"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </section>
  );
}
