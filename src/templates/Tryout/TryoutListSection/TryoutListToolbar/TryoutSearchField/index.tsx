"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type TryoutSearchFieldProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export default function TryoutSearchField({
  id = "tryout-search",
  value,
  onChange,
  className,
}: TryoutSearchFieldProps) {
  return (
    <div className={cn("relative min-w-0 flex-1", className)}>
      <Label htmlFor={id} className="sr-only">
        Cari tryout
      </Label>
      <Search
        className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-5"
        aria-hidden
      />
      <Input
        id={id}
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-full border-[#EEEEEE] bg-white pl-10 pr-4 text-sm font-medium text-neutral-6 shadow-none placeholder:text-neutral-5 focus-visible:ring-[#80B0FF]/40"
      />
    </div>
  );
}
