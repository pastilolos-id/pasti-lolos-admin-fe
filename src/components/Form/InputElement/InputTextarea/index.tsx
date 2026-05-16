import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel, Textarea } from "@/components/ui";
import type { inputControlType } from "..";
import { fieldTextareaClassName } from "../fieldStyles";
import type { inputTextareaType } from "../types";

export default function InputTextarea({
  control,
  label,
  ...input
}: inputTextareaType & inputControlType) {
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
          <Textarea
            {...field}
            id={input.name}
            readOnly={input.readOnly}
            disabled={input.disabled}
            rows={input.rows ?? 4}
            placeholder={input.placeholder}
            aria-invalid={fieldState.invalid}
            className={fieldTextareaClassName}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
