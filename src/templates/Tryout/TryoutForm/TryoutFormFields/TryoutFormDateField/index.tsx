"use client";

import { format, isValid, parse } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";

import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import type { TryoutFormValues } from "../../tryoutFormTypes";

type TryoutFormDateFieldProps = {
  control: Control<TryoutFormValues>;
  readOnly: boolean;
  fieldClassName: string;
};

function parseLocalDate(iso: string): Date | undefined {
  if (!iso) {
    return undefined;
  }
  const d = parse(iso, "yyyy-MM-dd", new Date());
  return isValid(d) ? d : undefined;
}

function formatDeadlineLabel(iso: string): string {
  const d = parseLocalDate(iso);
  if (!d) {
    return "Pilih";
  }
  return format(d, "d MMM yyyy", { locale: localeId });
}

function TryoutFormDateFieldEditable({
  value,
  onChange,
  fieldClassName,
}: {
  value: string;
  onChange: (v: string) => void;
  fieldClassName: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = parseLocalDate(value);
  const display = formatDeadlineLabel(value);

  return (
    <div className="space-y-2">
      <Label className="text-b2 font-bold text-neutral-6">Batas Akhir</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "flex h-12 w-full items-center justify-between rounded-xl border border-neutral-3 bg-neutral-2 px-4 text-left text-b3 text-neutral-6 outline-none transition-shadow focus-visible:ring-[3px] focus-visible:ring-primary-4/35",
              !value && "text-neutral-5",
              fieldClassName,
            )}
          >
            <span>{display}</span>
            <CalendarIcon className="size-5 shrink-0 text-neutral-5" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={(date) => {
              if (date) {
                onChange(format(date, "yyyy-MM-dd"));
              } else {
                onChange("");
              }
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default function TryoutFormDateField({
  control,
  readOnly,
  fieldClassName,
}: TryoutFormDateFieldProps) {
  return (
    <Controller
      name="deadline"
      control={control}
      render={({ field }) => {
        const display = formatDeadlineLabel(field.value);

        if (readOnly) {
          return (
            <div className="space-y-2">
              <Label
                htmlFor="tryout-deadline"
                className="text-b2 font-bold text-neutral-6"
              >
                Batas Akhir
              </Label>
              <div className="relative">
                <input
                  id="tryout-deadline"
                  readOnly
                  value={display === "Pilih" ? "—" : display}
                  className={cn(
                    "h-12 w-full rounded-xl border border-neutral-3 bg-neutral-2 px-4 pr-11 text-b3 text-neutral-6 outline-none",
                    "tryout-form-view-input",
                    fieldClassName,
                  )}
                />
                <CalendarIcon
                  className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-neutral-5"
                  aria-hidden
                />
              </div>
            </div>
          );
        }

        return (
          <TryoutFormDateFieldEditable
            value={field.value}
            onChange={field.onChange}
            fieldClassName={fieldClassName}
          />
        );
      }}
    />
  );
}
