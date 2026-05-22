"use client";

import type { Control, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import DatePicker from "@/components/DatePicker";

type VoucherFormDatePickerProps = {
  control: Control<FieldValues>;
  name: string;
  label: string;
  className?: string;
  required?: boolean;
  readOnly?: boolean;
  defaultValue?: string;
};

export default function VoucherFormDatePicker({
  control,
  name,
  label,
  className,
  required = false,
  readOnly = false,
  defaultValue = "",
}: VoucherFormDatePickerProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{
        required: required ? `${label} wajib diisi` : false,
      }}
      render={({ field, fieldState }) => (
        <DatePicker
          id={name}
          label={label}
          value={String(field.value ?? "")}
          onChange={field.onChange}
          className={className}
          required={required}
          readOnly={readOnly}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
