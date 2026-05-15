"use client";

import type { FormEvent } from "react";
import { useCallback, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import TryoutFormActionDialogs, {
  type TryoutFormActionDialogKind,
} from "./TryoutFormActionDialogs";
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

  const [dialogActive, setDialogActive] =
    useState<TryoutFormActionDialogKind>(null);

  const runSaveMock = useCallback((data: TryoutFormValues) => {
    // TODO: POST/PATCH /admin/tryouts — ganti console saat BE siap.
    console.log("TryoutForm submit (mock)", data);
  }, []);

  const onCreateSubmit = methods.handleSubmit((data) => {
    runSaveMock(data);
    setDialogActive("create-success");
  });

  const requestEditSave = useCallback(() => {
    void methods.trigger().then((valid) => {
      if (valid) {
        setDialogActive("edit-save");
      }
    });
  }, [methods]);

  const confirmEditSave = useCallback(() => {
    void methods.handleSubmit((data) => {
      runSaveMock(data);
    })();
  }, [methods, runSaveMock]);

  const handleDeleteClick = useCallback(() => {
    if (props.mode === "edit") {
      setDialogActive("delete");
    }
  }, [props.mode]);

  const confirmDelete = useCallback(() => {
    // TODO: DELETE /admin/tryouts/:id
    console.log("TryoutForm delete (mock)");
  }, []);

  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      if (readOnly) {
        event.preventDefault();
        return;
      }
      if (props.mode === "edit") {
        event.preventDefault();
        requestEditSave();
        return;
      }
      onCreateSubmit(event);
    },
    [readOnly, props.mode, requestEditSave, onCreateSubmit],
  );

  return (
    <FormProvider {...methods}>
      <form className="space-y-6" onSubmit={handleFormSubmit} noValidate>
        <section className="space-y-6 rounded-card-medium border border-neutral-3 bg-neutral-1 p-4 sm:p-6">
          <TryoutFormHeader
            mode={props.mode}
            onDeleteClick={
              props.mode === "edit" ? handleDeleteClick : undefined
            }
          />
          <TryoutFormFields
            control={methods.control}
            register={methods.register}
            readOnly={readOnly}
          />
        </section>
        <TryoutFormFooter
          mode={props.mode}
          onSaveClick={props.mode === "edit" ? requestEditSave : undefined}
        />
      </form>
      <TryoutFormActionDialogs
        active={dialogActive}
        onActiveChange={setDialogActive}
        onEditSaveConfirm={confirmEditSave}
        onDeleteConfirm={confirmDelete}
      />
    </FormProvider>
  );
}
