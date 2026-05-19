import type { ReactNode } from "react";

type TableCoulmnType = {
  accessorKey: string;
  title: ReactNode;
  className?: string;
  textPosition?: "left" | "center" | "right";
  /** When set, replaces plain text rendering for this column (e.g. badges, actions). */
  cell?: (row: TableDataType, rowIndex: number) => ReactNode;
};

type TableDataType = {
  [key: string]: string | number;
};

export type { TableCoulmnType, TableDataType };
