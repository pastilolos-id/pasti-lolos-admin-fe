"use client";

import type { Control, FieldValues } from "react-hook-form";

import InputElement from "@/components/Form/InputElement";
import { FieldGroup } from "@/components/ui";
import { buildQuestionMainInputData } from "../../buildQuestionMainInputData";
import type { TryoutQuestionItemFormValues } from "../../tryoutQuestionsFormTypes";

type TryoutQuestionMainFieldsProps = {
  control: Control<FieldValues>;
  namePrefix: string;
  values: TryoutQuestionItemFormValues;
  readOnly?: boolean;
};

export default function TryoutQuestionMainFields({
  control,
  namePrefix,
  values,
  readOnly = false,
}: TryoutQuestionMainFieldsProps) {
  const inputData = buildQuestionMainInputData({
    namePrefix,
    values,
    readOnly,
  });

  return (
    <FieldGroup className="w-full gap-5">
      {inputData.map((input) => (
        <InputElement control={control} key={input.name} input={input} />
      ))}
    </FieldGroup>
  );
}
