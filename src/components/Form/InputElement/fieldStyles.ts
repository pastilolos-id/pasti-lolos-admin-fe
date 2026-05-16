import { cn } from "@/lib/utils";

/** Base: bg neutral-2, border 1px neutral-3 */
export const fieldControlBase = cn(
  "border border-neutral-3 bg-neutral-2 shadow-none",
  "focus-visible:border-primary-4 focus-visible:ring-[3px] focus-visible:ring-primary-4/25",
);

/** Text, email, number, password, select, checkbox — rounded full */
export const fieldRoundedControlClassName = cn(
  fieldControlBase,
  "rounded-full",
);

export const fieldTextControlClassName = cn(
  fieldRoundedControlClassName,
  "h-12 px-4 text-b3 text-neutral-6 placeholder:text-neutral-5",
);

export const fieldSelectTriggerClassName = cn(
  fieldRoundedControlClassName,
  "h-12 w-full px-4 text-b3 text-neutral-6",
);

/** Textarea — rounded 16px */
export const fieldTextareaClassName = cn(
  fieldControlBase,
  "min-h-28 resize-y rounded-2xl px-4 py-3 text-b3 text-neutral-6 placeholder:text-neutral-5",
);

export const fieldCheckboxClassName = cn(
  fieldRoundedControlClassName,
  "size-5 shrink-0",
);
