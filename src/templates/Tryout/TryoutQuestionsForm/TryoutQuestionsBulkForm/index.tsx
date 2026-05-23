"use client";

import { useCallback, useMemo, useState } from "react";
import type { Control, FieldArrayWithId, FieldValues } from "react-hook-form";
import { useFieldArray, useForm } from "react-hook-form";
import { FieldGroup } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { getDefaultBulkFormValues } from "../getDefaultBulkFormValues";
import { mapToBulkCreateQuestionsPayload } from "../mapToBulkCreateQuestionsPayload";
import { parseQuestionItem } from "../parseTryoutQuestionsFormValues";
import type { TryoutQuestionsBulkFormValues } from "../tryoutQuestionsFormTypes";
import { validateTryoutQuestionItem } from "../validateTryoutQuestionItem";
import TryoutQuestionsBulkFormFields from "./TryoutQuestionsBulkFormFields";
import type { TryoutQuestionsBulkFormProps } from "./tryoutQuestionsBulkFormTypes";

const bulkFormId = "tryout-questions-bulk-form";

export default function TryoutQuestionsBulkForm({
  examId,
  subjectId,
  examTitle,
  startOrder = 1,
  initialValues,
  onSubmit,
  readOnly = false,
}: TryoutQuestionsBulkFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const defaultValues = useMemo(
    () => initialValues ?? getDefaultBulkFormValues(),
    [initialValues],
  );

  const { control, handleSubmit, setValue, watch } =
    useForm<TryoutQuestionsBulkFormValues>({
      mode: "onSubmit",
      defaultValues,
    });

  const { fields, append } = useFieldArray<TryoutQuestionsBulkFormValues>({
    control: control as Control<TryoutQuestionsBulkFormValues>,
    name: "questions",
  });

  const watchQuestions = watch("questions") as
    | TryoutQuestionsBulkFormValues["questions"]
    | undefined;

  const handleValidSubmit = useCallback(
    async (data: TryoutQuestionsBulkFormValues) => {
      setSubmitError(null);
      const parsed = data;

      if (parsed.questions.length === 0) {
        setSubmitError("Minimal satu pertanyaan wajib diisi.");
        return;
      }

      for (let i = 0; i < parsed.questions.length; i += 1) {
        const error = validateTryoutQuestionItem(
          parsed.questions[i],
          `Pertanyaan ke-${i + 1}`,
        );
        if (error) {
          setSubmitError(error);
          return;
        }
      }

      const payload = mapToBulkCreateQuestionsPayload({
        examId,
        subjectId,
        examTitle,
        questions: parsed.questions.map((q, index) =>
          parseQuestionItem({
            ...q,
            orderInExam: String(startOrder + index),
          }),
        ),
        startOrder,
      });

      console.log("[TryoutQuestionsBulkForm]", payload);
      await onSubmit(payload);
    },
    [examId, subjectId, examTitle, onSubmit, startOrder],
  );

  const resolvedQuestions = watchQuestions ?? defaultValues.questions;

  return (
    <form
      id={bulkFormId}
      noValidate
      onSubmit={handleSubmit(handleValidSubmit)}
      className="w-full space-y-6"
    >
      <FieldGroup className={cn("w-full gap-6")}>
        <TryoutQuestionsBulkFormFields
          control={control as unknown as Control<FieldValues>}
          fields={
            fields as FieldArrayWithId<
              TryoutQuestionsBulkFormValues,
              "questions",
              "id"
            >[]
          }
          append={append}
          watchQuestions={resolvedQuestions}
          setValue={(name, value, options) => {
            setValue(name as never, value as never, options);
          }}
          readOnly={readOnly}
          startOrder={startOrder}
        />

        {submitError ? (
          <p className="col-span-12 w-full text-b2 text-red">{submitError}</p>
        ) : null}

        {!readOnly ? (
          <Button
            type="submit"
            variant="primary"
            className="col-span-12 h-12 w-full rounded-2xl text-base font-bold text-white shadow-none sm:w-auto sm:min-w-48"
          >
            Simpan
          </Button>
        ) : null}
      </FieldGroup>
    </form>
  );
}
