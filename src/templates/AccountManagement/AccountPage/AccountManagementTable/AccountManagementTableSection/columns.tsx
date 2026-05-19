import type { TableCoulmnType, TableDataType } from "@/components/Table/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import type {
  AccountDisplayStatus,
  AccountRow,
  AccountSortKey,
  AccountSortState,
} from "../../types";
import AccountManagementActionsCell from "./AccountManagementActionsCell";
import AccountManagementSortableHeader from "./AccountManagementSortableHeader";

const statusLabel: Record<AccountDisplayStatus, string> = {
  aktif: "Aktif",
  tidak_aktif: "Tidak Aktif",
};

function statusPillClass(status: AccountDisplayStatus): string {
  switch (status) {
    case "aktif":
      return "border-transparent bg-green text-neutral-1 hover:bg-green/90";
    default:
      return "border-transparent bg-neutral-4 text-neutral-1 hover:bg-neutral-4/90";
  }
}

function asRow(row: TableDataType): AccountRow {
  return row as unknown as AccountRow;
}

type GetAccountColumnsParams = {
  sortState: AccountSortState;
  onSort: (key: AccountSortKey) => void;
};

export function getAccountColumns({
  sortState,
  onSort,
}: GetAccountColumnsParams): TableCoulmnType[] {
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
      accessorKey: "nama",
      title: (
        <AccountManagementSortableHeader
          label="Nama"
          sortKey="nama"
          activeKey={activeKey}
          direction={direction}
          onSort={onSort}
        />
      ),
      textPosition: "left",
      className: "min-w-[9rem] max-w-[180px] align-middle",
      cell: (row) => (
        <span className="line-clamp-1 font-medium text-neutral-6">
          {asRow(row).nama}
        </span>
      ),
    },
    {
      accessorKey: "email",
      title: (
        <AccountManagementSortableHeader
          label="Email"
          sortKey="email"
          activeKey={activeKey}
          direction={direction}
          onSort={onSort}
        />
      ),
      textPosition: "left",
      className: "min-w-[10rem] max-w-[220px] align-middle",
      cell: (row) => (
        <span className="line-clamp-1 text-neutral-6">{asRow(row).email}</span>
      ),
    },
    {
      accessorKey: "createdAtDisplay",
      title: (
        <AccountManagementSortableHeader
          label="Tgl Buat"
          sortKey="createdAt"
          activeKey={activeKey}
          direction={direction}
          onSort={onSort}
        />
      ),
      textPosition: "left",
      className: "min-w-[7.5rem] whitespace-nowrap align-middle",
    },
    {
      accessorKey: "displayStatus",
      title: (
        <AccountManagementSortableHeader
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
        return <AccountManagementActionsCell id={r.id} nama={r.nama} />;
      },
    },
  ];
}

export function rowsToTableData(rows: AccountRow[]): TableDataType[] {
  return rows as unknown as TableDataType[];
}
