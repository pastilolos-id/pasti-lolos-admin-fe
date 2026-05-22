"use client";

import { addMonths, format, subMonths } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  formatDisplayDate,
  parseDisplayDate,
} from "@/lib/date/displayDate";
import { cn } from "@/lib/utils";

export type DatePickerProps = {
  id: string;
  label: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  /** Applied to the Field grid cell (e.g. col-span-12 md:col-span-6). */
  className?: string;
  error?: string;
};

function CalendarNavButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
}) {
  const isNext = direction === "next";
  const Icon = isNext ? ChevronRight : ChevronLeft;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={isNext ? "Bulan berikutnya" : "Bulan sebelumnya"}
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full transition-colors cursor-pointer",
        "bg-primary-4 text-white hover:bg-primary-5 disabled:bg-neutral-4"
      )}
    >
      <Icon className="size-4" strokeWidth={2.5} aria-hidden />
    </button>
  );
}

export default function DatePicker({
  id,
  label,
  value,
  onChange,
  placeholder = "DD/MM/YYYY",
  required = false,
  disabled = false,
  readOnly = false,
  className,
  error,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const selectedDate = parseDisplayDate(value);
  const [month, setMonth] = useState<Date>(selectedDate ?? new Date());

  useEffect(() => {
    if (open) {
      setMonth(selectedDate ?? new Date());
    }
  }, [open, selectedDate]);

  const handleSelect = (date: Date | undefined) => {
    if (!date) {
      return;
    }
    onChange(formatDisplayDate(date));
  };

  const triggerLabel = value || placeholder;
  const isPlaceholder = !value;

  if (readOnly) {
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <label htmlFor={id} className="text-b2 font-bold text-neutral-6">
          {label}
        </label>
        <div className="relative">
          <input
            id={id}
            readOnly
            value={value || "—"}
            className="h-12 w-full rounded-xl border border-neutral-3 bg-neutral-2 px-4 pr-11 text-b3 text-neutral-6 shadow-none"
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
    <div className={cn("col-span-12 flex flex-col gap-2", className)}>
      <label
        htmlFor={`${id}-trigger`}
        className="text-b2 font-bold text-neutral-6"
      >
        {label}
        {required ? <span className="text-red"> *</span> : null}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            id={`${id}-trigger`}
            disabled={disabled}
            className={cn(
              "flex h-12 w-full items-center justify-between rounded-xl border border-neutral-3 bg-neutral-2 px-4 text-left text-b3 outline-none transition-shadow",
              "focus-visible:ring-[3px] focus-visible:ring-primary-4/25",
              isPlaceholder && "text-neutral-5",
              !isPlaceholder && "text-neutral-6",
              error && "border-red",
              disabled && "cursor-not-allowed opacity-60",
            )}
          >
            <span>{triggerLabel}</span>
            <CalendarIcon className="size-5 shrink-0 text-neutral-5" aria-hidden />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          sideOffset={8}
          className={cn(
            "w-[min(100vw-2rem,20.5rem)] rounded-[20px] border border-[#F6F6F6] bg-white p-4 shadow-[0_4px_24px_rgba(0,0,0,0.08)]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
          )}
        >
          <div className="mb-4 flex items-center justify-between gap-2">
            <span className="text-base font-bold text-neutral-6">
              {format(month, "MMMM yyyy")}
            </span>
            <div className="flex items-center gap-2">
              <CalendarNavButton
                direction="prev"
                onClick={() => setMonth((m) => subMonths(m, 1))}
              />
              <CalendarNavButton
                direction="next"
                onClick={() => setMonth((m) => addMonths(m, 1))}
              />
            </div>
          </div>
          <Calendar
            mode="single"
            month={month}
            onMonthChange={setMonth}
            selected={selectedDate}
            onSelect={handleSelect}
            showOutsideDays
            weekStartsOn={0}
            className="p-0"
            classNames={{
              months: "w-full",
              month: "w-full",
              month_caption: "hidden",
              nav: "hidden",
              weekdays: "flex w-full justify-between",
              weekday:
                "w-9 text-center text-sm font-bold text-neutral-6",
              week: "mt-2 gap-1 flex w-full justify-between",
              day: "p-0",
              selected:
              "rounded-full bg-primary-4 text-white hover:bg-primary-5 focus:bg-primary-5",
              day_button: cn(
                "flex size-9 items-center justify-center rounded-full border border-[#EEEEEE] text-sm font-medium transition-colors cursor-pointer",
                "hover:border-primary-4/40 hover:bg-primary-4/5",
                "data-[selected-single=true]:border-primary-4 data-[selected-single=true]:bg-primary-4 data-[selected-single=true]:text-white data-[selected-single=true]:hover:bg-primary-5",
              ),
              outside:
                "text-neutral-4 [&_button]:border-[#F0F0F0] [&_button]:text-neutral-4",
              disabled: "opacity-40",
              today: "font-bold",
            }}
          />
        </PopoverContent>
      </Popover>
      {error ? (
        <p className="text-c1 font-medium text-red">{error}</p>
      ) : null}
    </div>
  );
}
