import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import type { TransactionDetailStatus } from "../../transactionDetailTypes";

const statusConfig: Record<
  TransactionDetailStatus,
  { label: string; className: string }
> = {
  berhasil: { label: "Berhasil", className: "bg-green text-neutral-1" },
  gagal: { label: "Ditolak", className: "bg-red text-neutral-1" },
  kadaluarsa: {
    label: "Kadaluarsa",
    className: "bg-neutral-4 text-neutral-1",
  },
  menunggu: { label: "Menunggu", className: "bg-yellow text-neutral-6" },
};

type TransactionDetailStatusSectionProps = {
  detailStatus: TransactionDetailStatus;
};

export function TransactionDetailStatusSection({
  detailStatus,
}: TransactionDetailStatusSectionProps) {
  const status = statusConfig[detailStatus];

  return (
    <section>
      <h2 className="mb-3 text-s1 text-neutral-6">Status</h2>
      <Badge
        variant="outline"
        className={cn(
          "h-auto rounded-full border-0 px-4 py-1 text-c1 font-normal shadow-none hover:bg-transparent",
          status.className,
        )}
      >
        {status.label}
      </Badge>
    </section>
  );
}
