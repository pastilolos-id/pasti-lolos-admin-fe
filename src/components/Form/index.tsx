"use client";

import {
  type DetailedHTMLProps,
  type FormHTMLAttributes,
  forwardRef,
  type ReactNode,
  useImperativeHandle,
  useMemo,
} from "react";
import {
  type FieldValues,
  type SubmitHandler,
  type UseFormClearErrors,
  type UseFormSetError,
  useForm,
} from "react-hook-form";
import { FieldGroup } from "@/components/ui";
import { cn } from "@/lib/utils";
import InputElement from "./InputElement";
import type { inputDataType } from "./InputElement/types";

export type FormHandle = {
  setError: UseFormSetError<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
};

export type formType = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> & {
  inputData: inputDataType[];
  onSubmitForm: (data: Record<string, unknown>) => void | Promise<void>;
  defaultValues?: Record<string, unknown>;
  error?: string | Record<string, string[]>;
  children?: ReactNode;
};

const Form = forwardRef<FormHandle, formType>(function Form(
  {
    inputData,
    onSubmitForm,
    defaultValues: defaultValuesProp,
    error: _error,
    children,
    className,
    ...props
  },
  ref,
) {
  const resolvedDefaultValues = useMemo(() => {
    const fromInputs: Record<string, unknown> = {};
    for (const input of inputData) {
      if ("defaultValue" in input && input.defaultValue !== undefined) {
        fromInputs[input.name] = input.defaultValue;
      }
    }
    return { ...fromInputs, ...defaultValuesProp };
  }, [inputData, defaultValuesProp]);

  const { control, handleSubmit, setError, clearErrors } = useForm<
    Record<string, unknown>
  >({
    mode: "onSubmit",
    defaultValues: resolvedDefaultValues,
  });

  useImperativeHandle(
    ref,
    () => ({
      setError,
      clearErrors,
    }),
    [setError, clearErrors],
  );

  const onSubmitHandler: SubmitHandler<Record<string, unknown>> = async (
    data: Record<string, unknown>,
  ) => {
    await onSubmitForm(data);
  };

  return (
    <form {...props} onSubmit={handleSubmit(onSubmitHandler)} noValidate>
      <FieldGroup className={cn("w-full", className)}>
        {inputData.map((input) => (
          <InputElement control={control} key={input.name} input={input} />
        ))}

        {children}
      </FieldGroup>
    </form>
  );
});

export default Form;
