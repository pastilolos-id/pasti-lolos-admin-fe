import Link from "next/link";

import Icon from "@/components/Icon";
import { Button } from "@/components/ui/button";

export default function TryoutFormBackLink() {
  return (
    <Button
      variant="ghost"
      className="group inline-flex h-auto items-center gap-2 p-0 text-s1 text-neutral-6 hover:bg-transparent hover:text-neutral-6"
      asChild
    >
      <Link href="/tryout">
        <span className="rounded-full bg-primary-4 p-2.25 transition-colors group-hover:bg-primary-5">
          <Icon name="arrow-left-circle" size={15} />
        </span>
        <span>Kembali</span>
      </Link>
    </Button>
  );
}
