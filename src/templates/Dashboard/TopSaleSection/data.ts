import type { TableCoulmnType, TableDataType } from "@/components/Table/types";

const topSaleColumns: TableCoulmnType[] = [
  { accessorKey: "name", title: "Nama", textPosition: "left" },
  { accessorKey: "sold", title: "Terjual", textPosition: "right" },
  { accessorKey: "profit", title: "Profit", textPosition: "right" },
];

const topSaleData: TableDataType[] = [
  { name: "Paket CPNS Premium", sold: 142, profit: "Rp 12.800.000" },
  { name: "Tryout BUMN 2026", sold: 98, profit: "Rp 8.820.000" },
  { name: "Materi SKD Lengkap", sold: 87, profit: "Rp 6.960.000" },
  { name: "Paket Bundling CPNS + BUMN", sold: 76, profit: "Rp 9.120.000" },
  { name: "Tryout CPNS Harian", sold: 65, profit: "Rp 3.250.000" },
];

export { topSaleColumns, topSaleData };
