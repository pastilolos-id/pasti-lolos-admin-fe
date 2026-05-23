"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type QuestionsSectionAddOneButtonProps = {
  onClick: () => void;
};

export default function QuestionsSectionAddOneButton({
  onClick,
}: QuestionsSectionAddOneButtonProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="outline"
            onClick={onClick}
            className={cn(
              "flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-primary-4 bg-neutral-1 p-0 text-primary-4 transition-all hover:bg-primary-5/10 sm:size-12",
            )}
            aria-label="Tambah satu soal"
          >
            <Plus className="size-5" strokeWidth={2.25} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={6}>
          + Tambah Satu Soal
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
