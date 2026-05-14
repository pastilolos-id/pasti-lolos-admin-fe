"use client";

import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import type { TryoutInstitutionFilter } from "../../../types";

type TryoutInstansiFilterProps = {
  value: TryoutInstitutionFilter;
  onChange: (value: TryoutInstitutionFilter) => void;
};

const triggerLabel = (v: TryoutInstitutionFilter) => {
  if (v === "all") return "Instansi";
  return v;
};

export default function TryoutInstansiFilter({
  value,
  onChange,
}: TryoutInstansiFilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className={cn(
            "h-10 w-full min-w-0 shrink-0 rounded-full border-[#EEEEEE] px-4 text-sm font-semibold text-neutral-6 shadow-none sm:w-auto sm:min-w-30",
            "justify-between gap-2",
          )}
        >
          <span className="truncate">{triggerLabel(value)}</span>
          <ChevronDown className="size-4 shrink-0 text-neutral-5" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="min-w-36 rounded-2xl border border-[#EEEEEE] p-1 shadow-md"
      >
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(v) => onChange(v as TryoutInstitutionFilter)}
        >
          <DropdownMenuRadioItem
            value="all"
            className="cursor-pointer rounded-xl px-3 py-2.5 text-sm font-semibold text-neutral-6 focus:bg-neutral-2"
          >
            Semua
          </DropdownMenuRadioItem>
          <DropdownMenuSeparator className="my-1 bg-[#EEEEEE]" />
          <DropdownMenuRadioItem
            value="BUMN"
            className="cursor-pointer rounded-xl px-3 py-2.5 text-sm font-semibold text-neutral-6 focus:bg-neutral-2"
          >
            BUMN
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="CPNS"
            className="cursor-pointer rounded-xl px-3 py-2.5 text-sm font-semibold text-neutral-6 focus:bg-neutral-2"
          >
            CPNS
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
