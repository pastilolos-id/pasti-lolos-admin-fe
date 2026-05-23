"use client";

import { Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type TryoutExamQuestionsBulkLinkButtonProps = {
  href: string;
};

export default function TryoutExamQuestionsBulkLinkButton({
  href,
}: TryoutExamQuestionsBulkLinkButtonProps) {
  return (
    <Button
      variant="primary"
      size="default"
      className="w-full rounded-full px-6 py-3 text-s1 text-white sm:w-auto"
      asChild
    >
      <Link href={href}>
        <Plus className="size-4" />
        Tambah Banyak Soal
      </Link>
    </Button>
  );
}
