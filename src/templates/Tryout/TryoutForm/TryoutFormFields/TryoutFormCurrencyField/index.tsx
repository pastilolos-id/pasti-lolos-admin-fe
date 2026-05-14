"use client";

import type { UseFormRegisterReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type TryoutFormCurrencyFieldProps = {
  id: string;
  label: string;
  hint?: string;
  register: UseFormRegisterReturn<"priceAmount">;
  readOnly: boolean;
  inputClassName: string;
};

export default function TryoutFormCurrencyField({
  id,
  label,
  hint,
  register,
  readOnly,
  inputClassName,
}: TryoutFormCurrencyFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-b2 font-bold text-neutral-6">
        {label}
        {hint ? (
          <span className="font-medium text-neutral-5"> {hint}</span>
        ) : null}
      </Label>
      <div
        className={cn(
          "flex h-12 items-center gap-2 rounded-xl border border-neutral-3 bg-neutral-2 px-4",
          readOnly && "tryout-form-view-field",
        )}
      >
        <span className="shrink-0 text-b3 font-semibold text-neutral-5">
          Rp.
        </span>
        <Input
          id={id}
          inputMode="numeric"
          readOnly={readOnly}
          className={cn(
            "h-full min-w-0 flex-1 border-0 bg-transparent px-0 text-b3 text-neutral-6 shadow-none focus-visible:ring-0",
            inputClassName,
          )}
          {...register}
        />
      </div>
    </div>
  );
}
