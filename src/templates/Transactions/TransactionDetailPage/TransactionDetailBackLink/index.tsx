import Link from "next/link";

import Icon from "@/components/Icon";
import { Button } from "@/components/ui/button";

export function TransactionDetailBackLink() {
  return (
    <Button
      variant="ghost"
      className="group inline-flex h-auto items-center gap-2 p-0 text-s1 text-neutral-6 hover:bg-transparent hover:text-neutral-6"
      asChild
    >
      <Link href="/transactions">
        <span className="bg-primary-4 group-hover:bg-primary-5 rounded-full p-2.25 transition-colors">
          <Icon name="arrow-left-circle" size={15} />
        </span>
        <span>Kembali</span>
      </Link>
    </Button>
  );
}
