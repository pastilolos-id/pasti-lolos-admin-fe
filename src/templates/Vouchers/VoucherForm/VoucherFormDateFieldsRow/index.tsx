"use client";

import type { Control, FieldValues } from "react-hook-form";

import type { VoucherFormValues } from "../voucherFormTypes";
import VoucherFormDatePicker from "./VoucherFormDatePicker";

const dateFieldClassName = "col-span-12 w-full md:col-span-6";

type VoucherFormDateFieldsRowProps = {
  control: Control<FieldValues>;
  initialValues: VoucherFormValues;
  readOnly?: boolean;
};

export default function VoucherFormDateFieldsRow({
  control,
  initialValues,
  readOnly = false,
}: VoucherFormDateFieldsRowProps) {
  return (
    <>
      <VoucherFormDatePicker
        control={control}
        name="startDate"
        label="Tgl Awal"
        className={dateFieldClassName}
        required={!readOnly}
        readOnly={readOnly}
        defaultValue={initialValues.startDate}
      />
      <VoucherFormDatePicker
        control={control}
        name="endDate"
        label="Tgl Akhir"
        className={dateFieldClassName}
        required={!readOnly}
        readOnly={readOnly}
        defaultValue={initialValues.endDate}
      />
    </>
  );
}
