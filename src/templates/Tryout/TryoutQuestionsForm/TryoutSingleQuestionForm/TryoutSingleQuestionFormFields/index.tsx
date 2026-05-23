"use client";

import type { Control, FieldValues, UseFormSetValue } from "react-hook-form";

import TryoutQuestionFieldGroup from "../../TryoutQuestionFieldGroup";
import type {
  TryoutQuestionItemFormValues,
  TryoutSingleQuestionFormValues,
} from "../../tryoutQuestionsFormTypes";

type TryoutSingleQuestionFormFieldsProps = {
  control: Control<TryoutSingleQuestionFormValues>;
  values: TryoutQuestionItemFormValues;
  setValue: UseFormSetValue<TryoutSingleQuestionFormValues>;
  readOnly?: boolean;
};

export default function TryoutSingleQuestionFormFields({
  control,
  values,
  setValue,
  readOnly = false,
}: TryoutSingleQuestionFormFieldsProps) {
  return (
    <div className="col-span-12 w-full">
      <TryoutQuestionFieldGroup
        control={control as unknown as Control<FieldValues>}
        namePrefix="question"
        questionNumber={1}
        values={values}
        readOnly={readOnly}
        showTitle={false}
        setValue={(name, value, options) => {
          setValue(name as never, value as never, options);
        }}
      />
    </div>
  );
}
