"use client";

import { useCallback } from "react";
import type { Control, FieldValues } from "react-hook-form";

import type { TryoutQuestionItemFormValues } from "../tryoutQuestionsFormTypes";
import TryoutQuestionAnswersSection from "./TryoutQuestionAnswersSection";
import TryoutQuestionFieldGroupTitle from "./TryoutQuestionFieldGroupTitle";
import TryoutQuestionMainFields from "./TryoutQuestionMainFields";

type TryoutQuestionFieldGroupProps = {
  control: Control<FieldValues>;
  namePrefix: string;
  questionNumber: number;
  values: TryoutQuestionItemFormValues;
  readOnly?: boolean;
  showTitle?: boolean;
  setValue: (
    name: string,
    value: unknown,
    options?: { shouldDirty?: boolean; shouldValidate?: boolean },
  ) => void;
};

export default function TryoutQuestionFieldGroup({
  control,
  namePrefix,
  questionNumber,
  values,
  readOnly = false,
  showTitle = true,
  setValue,
}: TryoutQuestionFieldGroupProps) {
  const handleMarkCorrect = useCallback(
    (answerIndex: number) => {
      if (readOnly) return;

      for (let i = 0; i < 4; i += 1) {
        setValue(`${namePrefix}.answers.${i}.isCorrect`, i === answerIndex, {
          shouldDirty: true,
          shouldValidate: true,
        });
      }
    },
    [namePrefix, readOnly, setValue],
  );

  return (
    <article className="w-full space-y-5 rounded-2xl border border-neutral-3 bg-neutral-1 p-4 sm:p-6">
      {showTitle ? (
        <TryoutQuestionFieldGroupTitle questionNumber={questionNumber} />
      ) : null}

      <TryoutQuestionMainFields
        control={control}
        namePrefix={namePrefix}
        values={values}
        readOnly={readOnly}
      />

      <TryoutQuestionAnswersSection
        control={control}
        namePrefix={namePrefix}
        readOnly={readOnly}
        onMarkCorrect={handleMarkCorrect}
      />
    </article>
  );
}
