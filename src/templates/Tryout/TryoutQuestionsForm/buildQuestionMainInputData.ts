import type { inputDataType } from "@/components/Form/InputElement/types";
import {
  DIFFICULTY_OPTIONS,
  QUESTION_FIELD_CLASS_NAME,
} from "./tryoutQuestionsFormConstants";
import type { TryoutQuestionItemFormValues } from "./tryoutQuestionsFormTypes";

type BuildQuestionMainInputDataParams = {
  namePrefix: string;
  values: TryoutQuestionItemFormValues;
  readOnly?: boolean;
};

export function buildQuestionMainInputData({
  namePrefix,
  values,
  readOnly = false,
}: BuildQuestionMainInputDataParams): inputDataType[] {
  const disabled = readOnly;

  return [
    {
      name: `${namePrefix}.questionText`,
      type: "textarea",
      label: "Teks Soal",
      className: QUESTION_FIELD_CLASS_NAME,
      variant: "admin",
      required: !readOnly,
      disabled,
      rows: 4,
      placeholder: "Tulis teks soal di sini...",
      defaultValue: values.questionText,
    },
    {
      name: `${namePrefix}.explanationText`,
      type: "textarea",
      label: "Pembahasan",
      className: QUESTION_FIELD_CLASS_NAME,
      variant: "admin",
      disabled,
      rows: 3,
      placeholder: "Tulis pembahasan soal...",
      defaultValue: values.explanationText,
    },
    {
      name: `${namePrefix}.imageUrl`,
      type: "text",
      label: "URL Gambar",
      className: QUESTION_FIELD_CLASS_NAME,
      variant: "admin",
      disabled,
      placeholder: "https://contoh.com/gambar.png",
      defaultValue: values.imageUrl,
    },
    {
      name: `${namePrefix}.points`,
      type: "number",
      label: "Poin",
      className: QUESTION_FIELD_CLASS_NAME,
      variant: "admin",
      disabled,
      placeholder: "5",
      defaultValue: values.points,
    },
    {
      name: `${namePrefix}.difficultyLevel`,
      type: "select",
      label: "Tingkat Kesulitan",
      className: QUESTION_FIELD_CLASS_NAME,
      variant: "admin",
      disabled,
      placeholder: "Pilih",
      defaultValue: values.difficultyLevel,
      options: [...DIFFICULTY_OPTIONS],
    },
  ];
}
