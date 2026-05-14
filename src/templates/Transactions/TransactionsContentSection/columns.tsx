import { Trash2 } from "lucide-react";
import Icon from "@/components/Icon";
import type { TableCoulmnType, TableDataType } from "@/components/Table/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { TransferProofCell } from "./TransferProofCell";
import type { RowDisplayStatus, TransactionRow } from "../types";

const statusLabel: Record<RowDisplayStatus, string> = {
  aktif: "Aktif",
  tidak_aktif: "Tidak Aktif",
};

function statusPillClass(status: RowDisplayStatus): string {
  switch (status) {
    case "aktif":
      return "border-transparent bg-[#50AD54] text-white hover:bg-[#50AD54]/90";
    default:
      return "border-transparent bg-[#BEBEBE] text-white hover:bg-[#BEBEBE]/90";
  }
}

function asRow(row: TableDataType): TransactionRow {
  return row as unknown as TransactionRow;
}

export function getTransactionColumns(rowOffset: number): TableCoulmnType[] {
  return [
    {
      accessorKey: "_no",
      title: "No",
      textPosition: "center",
      className: "w-12 min-w-[3rem] align-middle",
      cell: (_row, rowIndex) => (
        <span className="tabular-nums">{rowOffset + rowIndex + 1}</span>
      ),
    },
    {
      accessorKey: "buyerName",
      title: "Nama",
      textPosition: "left",
      className: "min-w-[10rem] max-w-[220px] align-middle",
      cell: (row) => (
        <span className="line-clamp-1 font-medium text-neutral-6">
          {asRow(row).buyerName}
        </span>
      ),
    },
    {
      accessorKey: "buyerEmail",
      title: "Email",
      textPosition: "left",
      className: "min-w-[11rem] max-w-[240px] align-middle",
      cell: (row) => (
        <span className="line-clamp-1 text-neutral-6">
          {asRow(row).buyerEmail}
        </span>
      ),
    },
    {
      accessorKey: "proof",
      title: "Bukti Transfer",
      textPosition: "left",
      className: "min-w-[8.5rem] align-middle",
      cell: (row) => {
        const r = asRow(row);
        return (
          <TransferProofCell
            rowId={r.id}
            hasProof={r.hasProofThumbnail === 1}
          />
        );
      },
    },
    {
      accessorKey: "transactionDateDisplay",
      title: "Tgl. Transaksi",
      textPosition: "left",
      className: "min-w-[7.5rem] whitespace-nowrap align-middle",
    },
    {
      accessorKey: "priceDisplay",
      title: "Harga",
      textPosition: "right",
      className: "min-w-[6.5rem] align-middle",
    },
    {
      accessorKey: "displayStatus",
      title: "Status",
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
      className: "w-[1%] align-middle",
      cell: (row) => {
        const r = asRow(row);
        return (
          <div className="flex items-center justify-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              className="rounded-full bg-[#80B0FF]/25 text-[#448AFF] hover:bg-[#80B0FF]/40"
              aria-label="Lihat detail"
              onClick={() => {
                void r.id;
              }}
            >
              <Icon name="eye-open" size={20} className="size-5 shrink-0" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              className="rounded-full bg-[#FF5649]/20 text-[#FF5649] hover:bg-[#FF5649]/30"
              aria-label="Hapus"
              onClick={() => {
                void r.id;
              }}
            >
              <Trash2 className="size-4 shrink-0" strokeWidth={2.25} />
            </Button>
          </div>
        );
      },
    },
  ];
}

export function rowsToTableData(rows: TransactionRow[]): TableDataType[] {
  return rows as unknown as TableDataType[];
}
