"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TransactionDetailInfoIconProps = {
  /** Teks tooltip / aria-label. */
  description: string;
};

export function TransactionDetailInfoIcon({
  description,
}: TransactionDetailInfoIconProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="inline-flex size-5 shrink-0 cursor-default items-center justify-center rounded-full bg-primary-4 text-c1 text-neutral-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80B0FF]/50"
            aria-label={description}
          >
            i
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={6}>
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
