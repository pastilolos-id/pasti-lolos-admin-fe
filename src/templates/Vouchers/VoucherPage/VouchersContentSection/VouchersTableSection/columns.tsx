import type { TableCoulmnType, TableDataType } from "@/components/Table/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import type {
  VoucherDisplayStatus,
  VoucherRow,
  VoucherSortKey,
  VoucherSortState,
} from "../../types";
import VoucherActionsCell from "./VoucherActionsCell";
import VoucherSortableHeader from "./VoucherSortableHeader";

const statusLabel: Record<VoucherDisplayStatus, string> = {
  aktif: "Aktif",
  tidak_aktif: "Tidak Aktif",
};

function statusPillClass(status: VoucherDisplayStatus): string {
  switch (status) {
    case "aktif":
      return "border-transparent bg-green text-neutral-1 hover:bg-green/90";
    default:
      return "border-transparent bg-neutral-4 text-neutral-1 hover:bg-neutral-4/90";
  }
}

function asRow(row: TableDataType): VoucherRow {
  return row as unknown as VoucherRow;
}

type GetVoucherColumnsParams = {
  sortState: VoucherSortState;
  onSort: (key: VoucherSortKey) => void;
};

export function getVoucherColumns({
  sortState,
  onSort,
}: GetVoucherColumnsParams): TableCoulmnType[] {
  const activeKey = sortState?.key ?? null;
  const direction = sortState?.direction ?? null;

  return [
    {
      accessorKey: "_no",
      title: "No",
      textPosition: "center",
      className: "w-12 min-w-[3rem] align-middle",
      cell: (row) => <span className="tabular-nums">{asRow(row).rowNo}</span>,
    },
    {
      accessorKey: "judul",
      title: (
        <VoucherSortableHeader
          label="Judul"
          sortKey="judul"
          activeKey={activeKey}
          direction={direction}
          onSort={onSort}
        />
      ),
      textPosition: "left",
      className: "min-w-[9rem] max-w-[180px] align-middle",
      cell: (row) => (
        <span className="line-clamp-1 font-medium text-neutral-6">
          {asRow(row).judul}
        </span>
      ),
    },
    {
      accessorKey: "kode",
      title: "Kode",
      textPosition: "left",
      className: "min-w-[7rem] whitespace-nowrap align-middle",
    },
    {
      accessorKey: "startDateDisplay",
      title: (
        <VoucherSortableHeader
          label="Tgl Awal"
          sortKey="startDate"
          activeKey={activeKey}
          direction={direction}
          onSort={onSort}
        />
      ),
      textPosition: "left",
      className: "min-w-[7.5rem] whitespace-nowrap align-middle",
    },
    {
      accessorKey: "endDateDisplay",
      title: (
        <VoucherSortableHeader
          label="Tgl Akhir"
          sortKey="endDate"
          activeKey={activeKey}
          direction={direction}
          onSort={onSort}
        />
      ),
      textPosition: "left",
      className: "min-w-[7.5rem] whitespace-nowrap align-middle",
    },
    {
      accessorKey: "nilaiDisplay",
      title: "Nilai",
      textPosition: "left",
      className: "min-w-[6.5rem] whitespace-nowrap align-middle",
    },
    {
      accessorKey: "displayStatus",
      title: (
        <VoucherSortableHeader
          label="Status"
          sortKey="status"
          activeKey={activeKey}
          direction={direction}
          onSort={onSort}
        />
      ),
      textPosition: "center",
      className: "min-w-[7.5rem] align-middle",
      cell: (row) => {
        const r = asRow(row);
        return (
          <Badge
            variant="outline"
            className={cn(
              "h-6.25 min-w-27 justify-center rounded-xl border-0 px-3 text-xs font-semibold shadow-none",
              statusPillClass(r.displayStatus),
            )}
          >
            {statusLabel[r.displayStatus]}
          </Badge>
        );
      },
    },
    {
      accessorKey: "actions",
      title: "Action",
      textPosition: "center",
      className: "min-w-[7.5rem] w-[1%] align-middle",
      cell: (row) => {
        const r = asRow(row);
        return <VoucherActionsCell id={r.id} judul={r.judul} />;
      },
    },
  ];
}

export function rowsToTableData(rows: VoucherRow[]): TableDataType[] {
  return rows as unknown as TableDataType[];
}
