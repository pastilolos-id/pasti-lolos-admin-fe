"use client";

import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";

import InputElement from "@/components/Form/InputElement";
import { FieldGroup } from "@/components/ui";
import { cn } from "@/lib/utils";
import { buildVoucherFormInputData, getDefaultVoucherFormValues } from "./buildVoucherFormInputData";
import { parseVoucherFormValues } from "./parseVoucherFormValues";
import type { VoucherFormProps } from "./voucherFormTypes";
import VoucherFormDateFieldsRow from "./VoucherFormDateFieldsRow";
import VoucherFormFooter from "./VoucherFormFooter";

const voucherFormId = "voucher-form";

export default function VoucherForm(props: VoucherFormProps) {
  const { mode, onSubmit } = props;
  const readOnly = false;

  const formRemountKey =
    props.mode === "create" ? String(props.formKey ?? 0) : props.voucherId;

  const initialValues = useMemo(
    () =>
      getDefaultVoucherFormValues(
        mode,
        props.mode === "edit" ? props.initialValues : undefined,
      ),
    [mode, props],
  );

  const inputData = useMemo(
    () =>
      buildVoucherFormInputData({
        initialValues,
        readOnly,
      }),
    [initialValues, readOnly],
  );

  const { control, handleSubmit } = useForm<Record<string, unknown>>({
    mode: "onSubmit",
    defaultValues: initialValues as unknown as Record<string, unknown>,
  });

  const handleValidSubmit = useCallback(
    (data: Record<string, unknown>) => {
      onSubmit(parseVoucherFormValues(data));
    },
    [onSubmit],
  );

  const topFields = inputData.slice(0, 2);
  const bottomFields = inputData.slice(2);

  return (
    <form
      id={voucherFormId}
      key={formRemountKey}
      noValidate
      onSubmit={handleSubmit(handleValidSubmit)}
    >
      <FieldGroup className={cn("w-full gap-5")}>
        {topFields.map((input) => (
          <InputElement control={control} key={input.name} input={input} />
        ))}

        <VoucherFormDateFieldsRow
          control={control}
          initialValues={initialValues}
          readOnly={readOnly}
        />

        {bottomFields.map((input) => (
          <InputElement control={control} key={input.name} input={input} />
        ))}

        <VoucherFormFooter />
      </FieldGroup>
    </form>
  );
}
