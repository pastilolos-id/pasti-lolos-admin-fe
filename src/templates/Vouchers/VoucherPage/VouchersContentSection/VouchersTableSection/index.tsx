import { useMemo } from "react";

import { Table } from "@/components";
import type { TableDataType } from "@/components/Table/types";

import type { VoucherSortKey, VoucherSortState } from "../../types";
import { getVoucherColumns } from "./columns";

type VouchersTableSectionProps = {
  rows: TableDataType[];
  sortState: VoucherSortState;
  onSort: (key: VoucherSortKey) => void;
};

export default function VouchersTableSection({
  rows,
  sortState,
  onSort,
}: VouchersTableSectionProps) {
  const columns = useMemo(
    () => getVoucherColumns({ sortState, onSort }),
    [sortState, onSort],
  );

  return (
    <section
      aria-label="Daftar voucher"
      className="w-full min-w-0 overflow-x-auto"
    >
      <Table
        columns={columns}
        data={rows}
        headerClassName="bg-[#F6F6F6] [&_th]:h-14 [&_th]:min-h-[56px] [&_th]:py-0 [&_th]:text-neutral-6"
        className="min-w-208 rounded-none border-0 bg-transparent text-left shadow-none [&_tbody_tr]:min-h-14 [&_tbody_tr:nth-child(even)]:bg-[#F6F6F6] [&_tbody_tr:nth-child(odd)]:bg-white [&_tbody_tr]:border-[#F0F0F0] [&_tbody_td]:py-2.5 hover:[&_tbody_tr]:bg-[#EFEFEF]/80"
      />
    </section>
  );
}
