"use client";

import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import {
  formatTimeParts,
  pad2,
  parseTimeParts,
} from "../../../tryoutFormUtils";

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MIN_SEC = Array.from({ length: 60 }, (_, i) => i);

type TryoutFormTimePickerProps = {
  id: string;
  label: string;
  value: string;
  onChange: (next: string) => void;
  readOnly: boolean;
  triggerClassName: string;
};

function TimeColumn({
  label,
  items,
  selected,
  onSelect,
}: {
  label: string;
  items: number[];
  selected: number;
  onSelect: (n: number) => void;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-1">
      <span className="text-center text-xs font-semibold text-neutral-5">
        {label}
      </span>
      <div className="max-h-36 w-full overflow-y-auto rounded-lg border border-neutral-3 bg-neutral-1 py-1">
        {items.map((n) => {
          const active = n === selected;
          return (
            <button
              key={n}
              type="button"
              className={cn(
                "flex h-9 w-full items-center justify-center text-sm font-medium text-neutral-5 transition-colors",
                active && "bg-primary-4/10 text-primary-4 font-bold",
              )}
              onClick={() => onSelect(n)}
            >
              {pad2(n)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function TryoutFormTimePicker({
  id,
  label,
  value,
  onChange,
  readOnly,
  triggerClassName,
}: TryoutFormTimePickerProps) {
  const [open, setOpen] = useState(false);
  const parsed = parseTimeParts(value);
  const [draft, setDraft] = useState(parsed);

  useEffect(() => {
    if (open) {
      setDraft(parseTimeParts(value));
    }
  }, [open, value]);

  if (readOnly) {
    return (
      <div className="space-y-2">
        <Label htmlFor={id} className="text-b2 font-bold text-neutral-6">
          {label}
        </Label>
        <div className="relative">
          <Input
            id={id}
            readOnly
            value={value || "—"}
            className={cn(
              "h-12 rounded-xl border border-neutral-3 bg-neutral-2 pr-11 text-b3 text-neutral-6 shadow-none focus-visible:ring-0",
              "tryout-form-view-input",
              triggerClassName,
            )}
          />
          <Clock
            className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-neutral-5"
            aria-hidden
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label
        htmlFor={`${id}-trigger`}
        className="text-b2 font-bold text-neutral-6"
      >
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            id={`${id}-trigger`}
            className={cn(
              "flex h-12 w-full items-center justify-between rounded-xl border border-neutral-3 bg-neutral-2 px-4 text-left text-b3 text-neutral-6 outline-none transition-shadow focus-visible:ring-[3px] focus-visible:ring-primary-4/35",
              triggerClassName,
            )}
          >
            <span>{value || "Pilih"}</span>
            <Clock className="size-5 shrink-0 text-neutral-5" aria-hidden />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[min(100vw-2rem,20rem)] p-3" align="start">
          <div className="flex gap-2">
            <TimeColumn
              label="Jam"
              items={HOURS}
              selected={draft.h}
              onSelect={(h) => setDraft((d) => ({ ...d, h }))}
            />
            <TimeColumn
              label="Menit"
              items={MIN_SEC}
              selected={draft.m}
              onSelect={(m) => setDraft((d) => ({ ...d, m }))}
            />
            <TimeColumn
              label="Detik"
              items={MIN_SEC}
              selected={draft.s}
              onSelect={(s) => setDraft((d) => ({ ...d, s }))}
            />
          </div>
          <Button
            type="button"
            variant="primary"
            className="mt-3 h-10 w-full rounded-xl text-sm font-bold text-white"
            onClick={() => {
              onChange(formatTimeParts(draft.h, draft.m, draft.s));
              setOpen(false);
            }}
          >
            Pilih
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
