"use client";

import Link from "next/link";

import Icon from "@/components/Icon";
import { Button } from "@/components/ui/button";

type TryoutExamQuestionsBackButtonProps = {
  href: string;
};

export default function TryoutExamQuestionsBackButton({
  href,
}: TryoutExamQuestionsBackButtonProps) {
  return (
    <Link href={href}>
      <Button
        variant="outline"
        size="default"
        className="w-full rounded-full border-primary-4/50 px-6 py-3 text-s1 sm:w-41 sm:justify-between"
      >
        <Icon
          name="arrow-left-circle-bg-blue"
          size={24}
          fill="#80B0FF"
          stroke="#80B0FF"
        />
        Kembali
      </Button>
    </Link>
  );
}
