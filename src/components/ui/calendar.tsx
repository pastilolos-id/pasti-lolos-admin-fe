"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type * as React from "react";
import { DayPicker } from "react-day-picker";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import "react-day-picker/style.css";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-2", className)}
      classNames={{
        root: "w-full",
        months: "flex flex-col gap-4 sm:flex-row",
        month: "relative flex flex-col gap-2",
        month_caption:
          "flex h-9 items-center justify-center px-1 pt-1 text-sm font-medium text-neutral-6",
        caption_label: "text-sm font-medium",
        nav: "absolute inset-x-0 top-1 flex items-center justify-between px-1",
        button_previous: cn(
          buttonVariants({ variant: "ghost" }),
          "size-7 p-0 text-neutral-6 hover:bg-neutral-2",
        ),
        button_next: cn(
          buttonVariants({ variant: "ghost" }),
          "size-7 p-0 text-neutral-6 hover:bg-neutral-2",
        ),
        weekdays: "flex",
        weekday:
          "w-8 text-[0.8rem] font-normal text-neutral-5 [&:nth-child(1)]:rounded-l-md [&:nth-child(7)]:rounded-r-md",
        week: "mt-2 flex w-full",
        day: "size-8 p-0 font-normal aria-selected:opacity-100",
        day_button: cn(
          "size-8 rounded-md p-0 font-normal text-neutral-6 transition-colors",
          "hover:bg-neutral-2 focus-visible:ring-2 focus-visible:ring-primary-4/40",
          "data-[selected-single=true]:bg-primary-4 data-[selected-single=true]:text-white data-[selected-single=true]:hover:bg-primary-5",
        ),
        selected:
          "rounded-md bg-primary-4 text-white hover:bg-primary-5 focus:bg-primary-5",
        today: "bg-neutral-2 text-neutral-6",
        outside:
          "text-neutral-4 aria-selected:bg-neutral-2 aria-selected:text-neutral-5",
        disabled: "text-neutral-4 opacity-50",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ className: chClassName, orientation, ...chevProps }) =>
          orientation === "left" ? (
            <ChevronLeft className={cn("size-4", chClassName)} {...chevProps} />
          ) : (
            <ChevronRight
              className={cn("size-4", chClassName)}
              {...chevProps}
            />
          ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
