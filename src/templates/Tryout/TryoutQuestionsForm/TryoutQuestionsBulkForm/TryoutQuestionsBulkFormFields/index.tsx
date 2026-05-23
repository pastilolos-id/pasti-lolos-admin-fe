"use client";

import type {
  Control,
  FieldArrayWithId,
  FieldValues,
  UseFieldArrayAppend,
} from "react-hook-form";

import { getDefaultQuestionItem } from "../../getDefaultQuestionItem";
import TryoutQuestionFieldGroup from "../../TryoutQuestionFieldGroup";
import type { TryoutQuestionsBulkFormValues } from "../../tryoutQuestionsFormTypes";
import TryoutQuestionAddButton from "./TryoutQuestionAddButton";

type TryoutQuestionsBulkFormFieldsProps = {
  control: Control<FieldValues>;
  fields: FieldArrayWithId<TryoutQuestionsBulkFormValues, "questions", "id">[];
  append: UseFieldArrayAppend<TryoutQuestionsBulkFormValues, "questions">;
  watchQuestions: TryoutQuestionsBulkFormValues["questions"];
  setValue: (
    name: string,
    value: unknown,
    options?: { shouldDirty?: boolean; shouldValidate?: boolean },
  ) => void;
  readOnly?: boolean;
  startOrder?: number;
};

export default function TryoutQuestionsBulkFormFields({
  control,
  fields,
  append,
  watchQuestions,
  setValue,
  readOnly = false,
  startOrder = 1,
}: TryoutQuestionsBulkFormFieldsProps) {
  return (
    <div className="col-span-12 flex w-full flex-col gap-6">
      {fields.map((field, index) => {
        const isLast = index === fields.length - 1;
        const values = watchQuestions[index];

        return (
          <div key={field.id} className="w-full space-y-4">
            <TryoutQuestionFieldGroup
              control={control}
              namePrefix={`questions.${index}`}
              questionNumber={index + 1}
              values={values}
              readOnly={readOnly}
              setValue={setValue}
            />

            {isLast && !readOnly ? (
              <TryoutQuestionAddButton
                onClick={() =>
                  append(getDefaultQuestionItem(startOrder + fields.length))
                }
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
