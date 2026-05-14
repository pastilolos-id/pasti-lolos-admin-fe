import type { IconProps } from "@/components/Icon";

type SummaryCardType = {
  label: string;
  value: string;
  /** Jika diisi, persentase perubahan ditampilkan di bawah nilai. */
  trendPercent?: number;
  icon: IconProps["name"];
  iconBgClass: string;
  /** Kelas tambahan pada kartu (mis. radius/border khusus halaman). */
  className?: string;
};

const summaryCardsData: SummaryCardType[] = [
  {
    label: "Total User",
    value: "1.240",
    trendPercent: 12,
    icon: "people-circle-fill",
    iconBgClass: "bg-primary-5/15 text-primary-5",
  },
  {
    label: "Total Transaksi",
    value: "560",
    trendPercent: 8,
    icon: "card",
    iconBgClass: "bg-green/15 text-green",
  },
  {
    label: "Total Revenue",
    value: "Rp 45.200.000",
    trendPercent: -3,
    icon: "card",
    iconBgClass: "bg-yellow/15 text-yellow",
  },
];

export { summaryCardsData, type SummaryCardType };
