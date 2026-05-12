type RevenueFilterTab = "Hari" | "Bulan" | "Tahun";

type RevenueDataPoint = {
  label: string;
  revenue: number;
};

const revenueFilterTabs: RevenueFilterTab[] = ["Hari", "Bulan", "Tahun"];

const revenueDataMap: Record<RevenueFilterTab, RevenueDataPoint[]> = {
  Hari: [
    { label: "Sen", revenue: 4800000 },
    { label: "Sel", revenue: 3200000 },
    { label: "Rab", revenue: 6500000 },
    { label: "Kam", revenue: 5100000 },
    { label: "Jum", revenue: 7200000 },
    { label: "Sab", revenue: 8900000 },
    { label: "Min", revenue: 9500000 },
  ],
  Bulan: [
    { label: "Jan", revenue: 32000000 },
    { label: "Feb", revenue: 28000000 },
    { label: "Mar", revenue: 35000000 },
    { label: "Apr", revenue: 41000000 },
    { label: "Mei", revenue: 38000000 },
    { label: "Jun", revenue: 45200000 },
  ],
  Tahun: [
    { label: "2023", revenue: 320000000 },
    { label: "2024", revenue: 410000000 },
    { label: "2025", revenue: 480000000 },
    { label: "2026", revenue: 245000000 },
  ],
};

export {
  revenueFilterTabs,
  revenueDataMap,
  type RevenueFilterTab,
  type RevenueDataPoint,
};
