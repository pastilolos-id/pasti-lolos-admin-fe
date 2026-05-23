"use client";

import type { Control, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import { fieldTextControlClassName } from "@/components/Form/InputElement/fieldStyles";
import { Field, FieldLabel, Input } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { AnswerLabel } from "../../../tryoutQuestionsFormTypes";

type TryoutQuestionAnswerRowProps = {
  control: Control<FieldValues>;
  namePrefix: string;
  label: AnswerLabel;
  answerIndex: number;
  isCorrect: boolean;
  readOnly?: boolean;
  onMarkCorrect: () => void;
};

export default function TryoutQuestionAnswerRow({
  control,
  namePrefix,
  label,
  answerIndex,
  isCorrect,
  readOnly = false,
  onMarkCorrect,
}: TryoutQuestionAnswerRowProps) {
  const answerTextName = `${namePrefix}.answers.${answerIndex}.answerText`;

  return (
    <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
      <button
        type="button"
        disabled={readOnly}
        onClick={onMarkCorrect}
        className={cn(
          "flex shrink-0 cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all sm:w-36",
          isCorrect
            ? "border-primary-4 bg-primary-5/10 text-neutral-6"
            : "border-primary-4/50 bg-neutral-1 text-neutral-6 hover:border-primary-4",
          readOnly && "cursor-default opacity-70",
        )}
        aria-pressed={isCorrect}
        aria-label={`Jawaban ${label} sebagai jawaban benar`}
      >
        <span
          className={cn(
            "flex size-5 shrink-0 items-center justify-center rounded-full border text-c1",
            isCorrect
              ? "border-primary-4 bg-primary-4 text-neutral-1"
              : "border-primary-4 bg-neutral-1 text-primary-4",
          )}
        >
          {isCorrect ? "✓" : ""}
        </span>
        <span className="text-b2 font-semibold">{label}</span>
      </button>

      <Controller
        name={answerTextName}
        control={control}
        defaultValue=""
        render={({ field, fieldState }) => (
          <Field className="min-w-0 w-full flex-1" aria-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={answerTextName} className="sr-only">
              Teks jawaban {label}
            </FieldLabel>
            <Input
              {...field}
              id={answerTextName}
              readOnly={readOnly}
              disabled={readOnly}
              placeholder={`Teks jawaban ${label}`}
              aria-invalid={fieldState.invalid}
              className={cn(fieldTextControlClassName, "w-full")}
            />
          </Field>
        )}
      />
    </div>
  );
}
