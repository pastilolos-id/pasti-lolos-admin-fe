"use client";

import { Clock, SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";

import Icon from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import type { TryoutListItem } from "../../../types";
import TryoutCardPricing from "./TryoutCardPricing";

type TryoutCardProps = {
  item: TryoutListItem;
};

export default function TryoutCard({ item }: TryoutCardProps) {
  const router = useRouter();

  return (
    <Card
      className={cn(
        "flex min-h-65 flex-col gap-3 rounded-3xl border border-[#EEEEEE] bg-white p-4 shadow-none",
      )}
    >
      <div className="flex items-start justify-between gap-3 border-b border-neutral-3 pb-3">
        <h3 className="text-h4 font-bold text-neutral-6">{item.title}</h3>
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-neutral-3 bg-neutral-1"
          aria-hidden
        >
          <SquarePen className="size-5 text-primary-4" />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-b3 font-medium text-neutral-5">
        <div className="flex items-center gap-1.5">
          <Icon
            name="exam-multiple-choice"
            size={20}
            className="text-neutral-5"
          />
          <span>{item.questionCount} Soal</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="size-5 shrink-0 text-neutral-5" aria-hidden />
          <span>{item.durationMinutes} Menit</span>
        </div>
      </div>

      <Separator className="bg-neutral-3" />

      <TryoutCardPricing item={item} />

      <Button
        type="button"
        variant="primary"
        size="sm"
        className="mt-auto h-11 w-full rounded-full text-sm font-bold text-white"
        onClick={() => router.push(`/tryout/${item.id}/edit`)}
      >
        <SquarePen className="size-4 shrink-0 opacity-90" aria-hidden />
        Ubah Tryout
      </Button>
    </Card>
  );
}
