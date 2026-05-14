import {
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { cn } from "@/lib/utils";

import type { TableCoulmnType, TableDataType } from "./types";

type TableProps = {
  columns: TableCoulmnType[];
  data: TableDataType[];
  caption?: string;
  withNumber?: boolean;
  /** Kelas tambahan pada `<thead>`. */
  headerClassName?: string;
} & React.ComponentProps<"table">;

export default function Table({
  columns,
  data,
  caption,
  withNumber,
  headerClassName,
  className,
  ...tableProps
}: TableProps) {
  return (
    <TableContainer className={className} {...tableProps}>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader className={headerClassName}>
        <TableRow>
          {withNumber && <TableHead className="w-1/12">No</TableHead>}
          {columns.map((column) => (
            <TableHead key={column.accessorKey} className={column.className}>
              {column.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: table rows use index as key
          <TableRow key={index}>
            {withNumber && (
              <TableCell className="font-medium">{index + 1}</TableCell>
            )}
            {columns.map((column) => (
              <TableCell
                key={column.accessorKey}
                textPosition={column.textPosition}
                className={cn(column.className, !column.cell && "font-medium")}
              >
                {column.cell
                  ? column.cell(row as TableDataType, index)
                  : (row as TableDataType)[column.accessorKey]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
}
