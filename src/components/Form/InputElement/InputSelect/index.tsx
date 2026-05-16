import { Controller } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import type { inputControlType } from "..";
import { fieldSelectTriggerClassName } from "../fieldStyles";
import type { inputSelectType } from "../types";

export default function InputSelect({
  control,
  label,
  ...input
}: inputSelectType & inputControlType) {
  return (
    <Controller
      name={input.name}
      control={control}
      defaultValue={input.defaultValue ?? ""}
      rules={{
        required: input.required ? `${label} wajib diisi` : false,
      }}
      render={({ field, fieldState }) => (
        <Field className={input.className} aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={input.name} aria-invalid={fieldState.invalid}>
            {label}
          </FieldLabel>
          <Select
            disabled={input.disabled}
            value={(field.value as string) || undefined}
            onValueChange={field.onChange}
          >
            <SelectTrigger
              id={input.name}
              aria-invalid={fieldState.invalid}
              className={fieldSelectTriggerClassName}
            >
              <SelectValue placeholder={input.placeholder ?? "Pilih"} />
            </SelectTrigger>
            <SelectContent>
              {input.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
