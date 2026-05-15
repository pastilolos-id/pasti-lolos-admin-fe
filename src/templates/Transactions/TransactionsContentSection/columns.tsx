import type { TableCoulmnType, TableDataType } from "@/components/Table/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { TransactionDisplayStatus, TransactionRow } from "../types";
import { TransactionActionsCell } from "./TransactionActionsCell";
import { TransferProofCell } from "./TransferProofCell";

const statusLabel: Record<TransactionDisplayStatus, string> = {
  berhasil: "Berhasil",
  gagal: "Ditolak",
  kadaluarsa: "Kadaluarsa",
  menunggu: "Menunggu",
};

function statusPillClass(status: TransactionDisplayStatus): string {
  switch (status) {
    case "berhasil":
      return "border-transparent bg-green text-neutral-1 hover:bg-green/90";
    case "gagal":
      return "border-transparent bg-red text-neutral-1 hover:bg-red/90";
    case "kadaluarsa":
      return "border-transparent bg-neutral-4 text-neutral-1 hover:bg-neutral-4/90";
    default:
      return "border-transparent bg-yellow text-neutral-6 hover:bg-yellow/90";
  }
}

function asRow(row: TableDataType): TransactionRow {
  return row as unknown as TransactionRow;
}

export function getTransactionColumns(): TableCoulmnType[] {
  return [
    {
      accessorKey: "_no",
      title: "No",
      textPosition: "center",
      className: "w-12 min-w-[3rem] align-middle",
      cell: (row) => <span className="tabular-nums">{asRow(row).rowNo}</span>,
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
            proofUrl={r.proofUrl}
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
      className: "min-w-[7.5rem] w-[1%] align-middle",
      cell: (row) => {
        const r = asRow(row);
        return (
          <TransactionActionsCell
            id={r.id}
            transactionCode={r.transactionCode}
            buyerEmail={r.buyerEmail}
            priceDisplay={r.priceDisplay}
          />
        );
      },
    },
  ];
}

export function rowsToTableData(rows: TransactionRow[]): TableDataType[] {
  return rows as unknown as TableDataType[];
}
