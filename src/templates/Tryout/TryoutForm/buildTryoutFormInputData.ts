import type { inputDataType } from "@/components/Form/InputElement/types";
import type { TryoutInstitution } from "../types";
import {
  emptyTryoutFormValues,
  emptyTryoutFormValuesForChild,
} from "./tryoutFormMock";
import type { TryoutFormMode, TryoutFormValues } from "./tryoutFormTypes";

const fieldClassName = "w-full";

const SUBJECT_OPTIONS = [
  { value: "1", label: "BUMN" },
  { value: "2", label: "CPNS" },
] as const;

const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "closed", label: "Closed" },
  { value: "archived", label: "Archived" },
] as const;

function institutionToSubjectId(institution: TryoutInstitution): string {
  return institution === "BUMN" ? "1" : "2";
}

export function subjectNameToSubjectId(subjectName: string): string {
  const normalized = subjectName.trim().toUpperCase();
  if (normalized === "BUMN") return "1";
  if (normalized === "CPNS") return "2";
  return "";
}

function getSubjectOption(subjectId: string) {
  return SUBJECT_OPTIONS.find((option) => option.value === subjectId);
}

type BuildTryoutFormInputDataParams = {
  mode: TryoutFormMode;
  readOnly?: boolean;
  defaultSubjectId?: string;
  lockedParentSubjectId?: string;
  initialValues?: TryoutFormValues;
};

export function buildTryoutFormInputData({
  mode,
  readOnly = false,
  defaultSubjectId,
  lockedParentSubjectId,
  initialValues,
}: BuildTryoutFormInputDataParams): inputDataType[] {
  const disabled = readOnly;
  const v = initialValues;
  const isChildSubjectLocked =
    mode === "create-child" && Boolean(lockedParentSubjectId);
  const lockedSubjectOption = lockedParentSubjectId
    ? getSubjectOption(lockedParentSubjectId)
    : undefined;

  return [
    {
      name: "examName",
      type: "text",
      label: "Nama Ujian",
      className: fieldClassName,
      required: !readOnly,
      disabled,
      placeholder: "Contoh: Tryout SKD CPNS — Paket Lengkap",
      defaultValue: v?.examName ?? "",
    },
    {
      name: "description",
      type: "textarea",
      label: "Deskripsi",
      className: fieldClassName,
      disabled,
      placeholder: "Ujian ini tentang....",
      defaultValue: v?.description ?? "",
    },
    {
      name: "subjectId",
      type: "select",
      label: "Mata Pelajaran / Kategori",
      className: fieldClassName,
      required: !readOnly && !isChildSubjectLocked,
      disabled: disabled || isChildSubjectLocked,
      placeholder: "Pilih",
      defaultValue: isChildSubjectLocked
        ? lockedParentSubjectId
        : (v?.subjectId ?? defaultSubjectId ?? ""),
      options:
        isChildSubjectLocked && lockedSubjectOption
          ? [lockedSubjectOption]
          : [...SUBJECT_OPTIONS],
    },
    {
      name: "durationMinutes",
      type: "number",
      label: "Durasi (menit)",
      className: fieldClassName,
      required: !readOnly,
      disabled,
      placeholder: "Contoh: 100",
      defaultValue: v?.durationMinutes ?? "",
    },
    {
      name: "status",
      type: "select",
      label: "Status",
      className: fieldClassName,
      required: !readOnly && mode !== "create-parent",
      disabled: disabled || mode === "create-parent",
      defaultValue:
        mode === "create-parent" ? "draft" : v?.status || "published",
      options:
        mode === "create-parent"
          ? [{ value: "draft", label: "Draft" }]
          : [...STATUS_OPTIONS],
    },
    {
      name: "passingScore",
      type: "number",
      label: "Passing Grade",
      className: fieldClassName,
      disabled,
      placeholder: "Contoh: 70",
      defaultValue: v?.passingScore ?? "",
    },
    {
      name: "price",
      type: "number",
      label: "Harga",
      className: fieldClassName,
      disabled,
      placeholder: mode === "create-child" ? "0" : "Contoh: 149000",
      defaultValue: v?.price ?? (mode === "create-child" ? "0" : ""),
    },
    {
      name: "attemptsAllowed",
      type: "number",
      label: "Percobaan",
      className: fieldClassName,
      disabled,
      placeholder: "Contoh: 1",
      defaultValue: v?.attemptsAllowed ?? "1",
    },
    {
      name: "randomizeQuestions",
      type: "checkbox",
      label: "Acak urutan soal",
      className: fieldClassName,
      disabled,
      trueValue: true,
      falseValue: false,
    },
  ];
}

type GetDefaultFormValuesOptions = {
  institution?: TryoutInstitution;
  parentSubjectId?: string;
};

export function getDefaultFormValues(
  mode: TryoutFormMode,
  options?: GetDefaultFormValuesOptions,
): TryoutFormValues {
  const institution = options?.institution;
  const parentSubjectId = options?.parentSubjectId ?? "";

  if (mode === "create-child") {
    return {
      ...emptyTryoutFormValuesForChild(),
      subjectId: parentSubjectId,
    };
  }

  if (mode === "create-parent") {
    return {
      ...emptyTryoutFormValues,
      status: "draft",
      subjectId: institution ? institutionToSubjectId(institution) : "",
    };
  }

  return {
    ...emptyTryoutFormValues,
    subjectId: institution ? institutionToSubjectId(institution) : "",
  };
}
