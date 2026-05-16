"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";

import Form from "@/components/Form";
import { useExamPackageDetailQuery } from "@/lib/exams/examsQuery";
import { mapTryoutFormToCreatePayload } from "@/lib/exams/mapTryoutFormToCreatePayload";
import { parseExamApiError } from "@/lib/exams/parseExamApiError";
import { useTryoutStore } from "@/lib/store/tryout-store";
import {
  buildTryoutFormInputData,
  getDefaultFormValues,
  subjectNameToSubjectId,
} from "./buildTryoutFormInputData";
import TryoutFormActionDialogs, {
  type TryoutFormActionDialogKind,
} from "./TryoutFormActionDialogs";
import TryoutFormFooter from "./TryoutFormFooter";
import TryoutFormHeader from "./TryoutFormHeader";
import TryoutFormBackLink from "./TryoutFormHeader/TryoutFormBackLink";
import type { TryoutFormProps, TryoutFormValues } from "./tryoutFormTypes";

function parseFormValues(data: Record<string, unknown>): TryoutFormValues {
  return {
    examName: String(data.examName ?? ""),
    description: String(data.description ?? ""),
    subjectId: String(data.subjectId ?? ""),
    durationMinutes: String(data.durationMinutes ?? ""),
    status: (data.status as TryoutFormValues["status"]) || "published",
    passingScore: String(data.passingScore ?? ""),
    price: String(data.price ?? ""),
    attemptsAllowed: String(data.attemptsAllowed ?? ""),
    randomizeQuestions: data.randomizeQuestions === true,
  };
}

function isCreateMode(
  mode: TryoutFormProps["mode"],
): mode is "create-parent" | "create-child" {
  return mode === "create-parent" || mode === "create-child";
}

export default function TryoutForm(props: TryoutFormProps) {
  const router = useRouter();
  const institution = useTryoutStore((s) => s.institution);

  const mode = props.mode;
  const readOnly = mode === "view";
  const isCreate = isCreateMode(mode);

  const [formKey, setFormKey] = useState(0);
  const [dialogActive, setDialogActive] =
    useState<TryoutFormActionDialogKind>(null);
  const editSubmitConfirmedRef = useRef(false);
  const tryoutFormId = "tryout-form";

  const backHref = useMemo(() => {
    if (mode === "create-child") {
      return `/tryout/${props.packageId}/view`;
    }
    return "/tryout";
  }, [mode, props]);

  const createSuccessVariant = mode === "create-child" ? "child" : "parent";

  const parentPackageId =
    mode === "create-child" ? Number(props.packageId) : null;

  const {
    data: parentPackage,
    isLoading: isParentPackageLoading,
    isError: isParentPackageError,
    error: parentPackageError,
    refetch: refetchParentPackage,
  } = useExamPackageDetailQuery(parentPackageId);

  const lockedParentSubjectId = useMemo(() => {
    if (mode !== "create-child" || !parentPackage?.subject) {
      return undefined;
    }
    const subjectId = subjectNameToSubjectId(parentPackage.subject);
    return subjectId || undefined;
  }, [mode, parentPackage?.subject]);

  const defaultFormValues = useMemo(() => {
    if (mode === "edit" || mode === "view") {
      return props.initialData;
    }
    return getDefaultFormValues(mode, {
      institution: mode === "create-parent" ? institution : undefined,
      parentSubjectId: lockedParentSubjectId,
    });
  }, [mode, props, institution, lockedParentSubjectId]);

  const inputData = useMemo(
    () =>
      buildTryoutFormInputData({
        mode,
        readOnly,
        defaultSubjectId:
          mode === "create-parent" ? defaultFormValues.subjectId : undefined,
        lockedParentSubjectId,
        initialValues:
          mode === "edit" || mode === "view" ? props.initialData : undefined,
      }),
    [mode, readOnly, defaultFormValues.subjectId, lockedParentSubjectId, props],
  );

  const handleCreateSubmit = useCallback(
    (data: Record<string, unknown>) => {
      const values = parseFormValues(data);
      if (mode === "create-parent") {
        values.status = "draft";
      }
      if (mode === "create-child" && lockedParentSubjectId) {
        values.subjectId = lockedParentSubjectId;
      }
      const payload = mapTryoutFormToCreatePayload(
        values,
        mode === "create-child" ? { packageId: props.packageId } : undefined,
      );

      const logLabel =
        mode === "create-parent" ? "create-parent" : "create-child";
      console.log(`TryoutForm submit (${logLabel})`, payload);

      setDialogActive("create-success");
    },
    [mode, props, lockedParentSubjectId],
  );

  const handleEditSubmit = useCallback((data: Record<string, unknown>) => {
    const values = parseFormValues(data);
    console.log("TryoutForm submit (edit mock)", values);
  }, []);

  const onSubmitForm = useCallback(
    (data: Record<string, unknown>) => {
      if (isCreate) {
        handleCreateSubmit(data);
        return;
      }
      if (mode === "edit") {
        if (!editSubmitConfirmedRef.current) {
          setDialogActive("edit-save");
          return;
        }
        editSubmitConfirmedRef.current = false;
        handleEditSubmit(data);
      }
    },
    [isCreate, mode, handleCreateSubmit, handleEditSubmit],
  );

  const handleCreateSuccessClose = useCallback(() => {
    router.push("/tryout");
  }, [router]);

  const handleCreateSuccessAddNew = useCallback(() => {
    setFormKey((k) => k + 1);
  }, []);

  const submitTryoutForm = useCallback(() => {
    const el = document.getElementById(tryoutFormId);
    if (el instanceof HTMLFormElement) {
      el.requestSubmit();
    }
  }, []);

  const requestEditSave = useCallback(() => {
    submitTryoutForm();
  }, [submitTryoutForm]);

  const confirmEditSave = useCallback(() => {
    editSubmitConfirmedRef.current = true;
    submitTryoutForm();
  }, [submitTryoutForm]);

  const handleDeleteClick = useCallback(() => {
    if (mode === "edit") {
      setDialogActive("delete");
    }
  }, [mode]);

  const confirmDelete = useCallback(() => {
    console.log("TryoutForm delete (mock)");
  }, []);

  const formDefaultValues = useMemo(
    () => ({ ...defaultFormValues }) as Record<string, unknown>,
    [defaultFormValues],
  );

  if (mode === "create-child") {
    if (isParentPackageLoading) {
      return (
        <div className="rounded-card-medium border border-neutral-3 bg-neutral-1 p-6 text-b2 text-neutral-6">
          Memuat data paket tryout...
        </div>
      );
    }

    if (isParentPackageError || !lockedParentSubjectId) {
      return (
        <div className="space-y-4">
          <TryoutFormBackLink href={backHref} />
          <div className="rounded-card-medium border border-neutral-3 bg-neutral-1 p-6">
            <p className="text-b2 text-neutral-6">
              {isParentPackageError
                ? parseExamApiError(parentPackageError)
                : "Kategori paket tryout induk tidak valid."}
            </p>
            {isParentPackageError ? (
              <button
                type="button"
                onClick={() => void refetchParentPackage()}
                className="mt-4 rounded-full bg-red px-6 py-2 text-s1 text-white hover:bg-red/85"
              >
                Coba Lagi
              </button>
            ) : null}
          </div>
        </div>
      );
    }
  }

  return (
    <div className="space-y-6">
      <section className="space-y-6 rounded-card-medium border border-neutral-3 bg-neutral-1 p-4 sm:p-6">
        <TryoutFormHeader
          mode={mode}
          backHref={backHref}
          onDeleteClick={mode === "edit" ? handleDeleteClick : undefined}
        />

        <Form
          id={tryoutFormId}
          key={formKey}
          className="flex flex-col gap-5"
          inputData={inputData}
          defaultValues={formDefaultValues}
          onSubmitForm={onSubmitForm}
        >
          <TryoutFormFooter
            mode={mode}
            onSaveClick={mode === "edit" ? requestEditSave : undefined}
          />
        </Form>
      </section>

      <TryoutFormActionDialogs
        active={dialogActive}
        createSuccessVariant={createSuccessVariant}
        onActiveChange={setDialogActive}
        onCreateSuccessClose={handleCreateSuccessClose}
        onCreateSuccessAddNew={handleCreateSuccessAddNew}
        onEditSaveConfirm={confirmEditSave}
        onDeleteConfirm={confirmDelete}
      />
    </div>
  );
}
