import type { inputDataType } from "@/components/Form/InputElement/types";

import { emptyVoucherFormValues } from "./voucherFormMock";
import type { VoucherFormValues } from "./voucherFormTypes";

const fieldClassName = "col-span-12 w-full";

const STATUS_OPTIONS = [
  { value: "aktif", label: "Aktif" },
  { value: "tidak_aktif", label: "Tidak Aktif" },
] as const;

type BuildVoucherFormInputDataParams = {
  initialValues?: VoucherFormValues;
  readOnly?: boolean;
};

export function buildVoucherFormInputData({
  initialValues = emptyVoucherFormValues,
  readOnly = false,
}: BuildVoucherFormInputDataParams = {}): inputDataType[] {
  const v = initialValues;
  const disabled = readOnly;

  return [
    {
      name: "judul",
      type: "text",
      label: "Judul",
      className: fieldClassName,
      variant: "admin",
      required: !readOnly,
      disabled,
      placeholder: "Contoh: Ramadan Challenge 2026",
      defaultValue: v.judul,
    },
    {
      name: "kode",
      type: "text",
      label: "Kode",
      className: fieldClassName,
      variant: "admin",
      required: !readOnly,
      disabled,
      placeholder: "Contoh: RMDNCHL26",
      defaultValue: v.kode,
    },
    {
      name: "nilai",
      type: "number",
      label: "Nilai",
      className: fieldClassName,
      variant: "admin",
      required: !readOnly,
      disabled,
      placeholder: "Contoh: 60000",
      defaultValue: v.nilai,
    },
    {
      name: "status",
      type: "select",
      label: "Status",
      className: fieldClassName,
      variant: "admin",
      required: !readOnly,
      disabled,
      placeholder: "Pilih",
      defaultValue: v.status,
      options: [...STATUS_OPTIONS],
    },
  ];
}

export function getDefaultVoucherFormValues(_mode: "create"): VoucherFormValues {
  return { ...emptyVoucherFormValues };
}
