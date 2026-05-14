"use client";

import type { FormEvent } from "react";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

import TryoutFormFields from "./TryoutFormFields";
import TryoutFormFooter from "./TryoutFormFooter";
import TryoutFormHeader from "./TryoutFormHeader";
import { emptyTryoutFormValues } from "./tryoutFormMock";
import type { TryoutFormValues } from "./tryoutFormTypes";

export type TryoutFormProps =
  | { mode: "create" }
  | { mode: "edit" | "view"; initialData: TryoutFormValues };

export default function TryoutForm(props: TryoutFormProps) {
  const defaultValues = useMemo<TryoutFormValues>(() => {
    if (props.mode === "create") {
      return emptyTryoutFormValues;
    }
    return props.initialData;
  }, [props]);

  const methods = useForm<TryoutFormValues>({ defaultValues });
  const readOnly = props.mode === "view";

  const submit = methods.handleSubmit((data) => {
    // TODO: POST/PATCH /admin/tryouts — ganti console saat BE siap.
    console.log("TryoutForm submit (mock)", data);
  });

  const handleFormSubmit = readOnly
    ? (event: FormEvent<HTMLFormElement>) => event.preventDefault()
    : submit;

  const handleDelete = () => {
    if (
      typeof window !== "undefined" &&
      window.confirm("Hapus tryout ini? (mock — belum terhubung ke BE)")
    ) {
      // TODO: DELETE /admin/tryouts/:id
      console.log("TryoutForm delete (mock)");
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-6" onSubmit={handleFormSubmit} noValidate>
        <section className="space-y-6 rounded-card-medium border border-neutral-3 bg-neutral-1 p-4 sm:p-6">
          <TryoutFormHeader
            mode={props.mode}
            onDeleteClick={props.mode === "edit" ? handleDelete : undefined}
          />
          <TryoutFormFields
            control={methods.control}
            register={methods.register}
            readOnly={readOnly}
          />
        </section>
        <TryoutFormFooter mode={props.mode} />
      </form>
    </FormProvider>
  );
}
