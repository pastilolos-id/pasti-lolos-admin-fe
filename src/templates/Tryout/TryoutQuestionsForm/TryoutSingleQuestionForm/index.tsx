"use client";

import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";

import { FieldGroup } from "@/components/ui";
import { cn } from "@/lib/utils";

import { getDefaultQuestionItem } from "../getDefaultQuestionItem";
import { mapSingleQuestionToPayload } from "../mapToBulkCreateQuestionsPayload";
import type { TryoutSingleQuestionFormValues } from "../tryoutQuestionsFormTypes";
import { validateTryoutQuestionItem } from "../validateTryoutQuestionItem";
import TryoutSingleQuestionFormFields from "./TryoutSingleQuestionFormFields";
import type { TryoutSingleQuestionFormProps } from "./tryoutSingleQuestionFormTypes";

export default function TryoutSingleQuestionForm({
  mode,
  formId,
  initialValues,
  onSubmit,
  readOnly = false,
  setSubmitError,
}: TryoutSingleQuestionFormProps) {
  const defaultValues = useMemo<TryoutSingleQuestionFormValues>(
    () => ({
      question: initialValues ?? getDefaultQuestionItem(1),
    }),
    [initialValues],
  );

  const { control, handleSubmit, setValue, watch } =
    useForm<TryoutSingleQuestionFormValues>({
      mode: "onSubmit",
      defaultValues,
    });

  const watchQuestion = watch("question");
  const resolvedQuestion = watchQuestion ?? defaultValues.question;

  const handleValidSubmit = useCallback(
    async (data: TryoutSingleQuestionFormValues) => {
      setSubmitError?.(null);
      const error = validateTryoutQuestionItem(data.question);
      if (error) {
        setSubmitError?.(error);
        return;
      }

      const orderInExam = Number.parseInt(data.question.orderInExam, 10);
      const payload = mapSingleQuestionToPayload(
        data.question,
        Number.isFinite(orderInExam) ? orderInExam : 1,
      );

      console.log(`[TryoutSingleQuestionForm:${mode}]`, payload);
      await onSubmit(payload);
    },
    [mode, onSubmit, setSubmitError],
  );

  return (
    <form
      id={formId}
      noValidate
      onSubmit={handleSubmit(handleValidSubmit)}
      className="w-full space-y-4"
    >
      <FieldGroup className={cn("w-full gap-5")}>
        <TryoutSingleQuestionFormFields
          control={control}
          values={resolvedQuestion}
          setValue={setValue}
          readOnly={readOnly}
        />
      </FieldGroup>
    </form>
  );
}
