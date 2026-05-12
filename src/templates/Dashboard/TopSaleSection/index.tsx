import { Table } from "@/components";
import { topSaleColumns, topSaleData } from "./data";

export default function TopSaleSection() {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-card-border p-4">
      <h3 className="text-s1 text-neutral-6">Top Sale</h3>
      <Table columns={topSaleColumns} data={topSaleData} withNumber />
    </section>
  );
}
