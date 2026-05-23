"use client";

import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type QuestionsSectionEditButtonProps = {
  onClick: () => void;
};

export default function QuestionsSectionEditButton({
  onClick,
}: QuestionsSectionEditButtonProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={onClick}
            className="size-9 shrink-0 cursor-pointer rounded-full bg-[#80B0FF]/25 text-[#448AFF] hover:bg-[#80B0FF]/40"
            aria-label="Edit soal ini"
          >
            <Pencil className="size-4 shrink-0" strokeWidth={2.25} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={6}>
          Edit Soal Ini
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
