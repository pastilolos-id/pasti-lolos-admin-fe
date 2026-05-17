import type { ComponentProps } from "react";
import type { IconProps } from "@/components/Icon";

type inputType = {
  name: string;
  className: string;
  label: string;
  description?: string;
  helperText?: string;
  error?: boolean;
  required?: boolean;
  defaultValue?: string | number | boolean;
  leftIcon?: IconProps["name"];
  rightIcon?: IconProps["name"];
  /** Auth login/register pages use translucent inputs; admin forms use neutral fields. */
  variant?: "auth" | "admin";
};

export type inputTextFieldType = ComponentProps<"input"> &
  inputType & {
    type: "text" | "email" | "number";
  };

export type inputPasswordFieldType = ComponentProps<"input"> &
  inputType & {
    type: "password";
  };

export type inputCheckboxType = ComponentProps<"input"> &
  inputType & {
    type: "checkbox";
    trueValue: string | boolean | number;
    falseValue: string | boolean | number;
  };

export type SelectOption = {
  value: string;
  label: string;
};

export type inputSelectType = inputType & {
  type: "select";
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
};

export type inputTextareaType = ComponentProps<"textarea"> &
  inputType & {
    type: "textarea";
  };

export type inputDataType =
  | inputTextFieldType
  | inputPasswordFieldType
  | inputCheckboxType
  | inputSelectType
  | inputTextareaType;
