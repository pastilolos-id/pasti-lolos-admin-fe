import type { ReactNode } from "react";

type TransactionDetailInnerCardProps = {
  children: ReactNode;
};

export function TransactionDetailInnerCard({
  children,
}: TransactionDetailInnerCardProps) {
  return (
    <div className="rounded-3xl border border-neutral-3 p-4 sm:p-6">
      <div className="space-y-6">{children}</div>
    </div>
  );
}
