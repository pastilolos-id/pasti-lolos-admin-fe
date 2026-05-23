import type {
  QuestionItemPayload,
  TryoutQuestionItemFormValues,
} from "../tryoutQuestionsFormTypes";

export type TryoutSingleQuestionFormProps = {
  mode: "create" | "edit";
  formId: string;
  initialValues?: TryoutQuestionItemFormValues;
  onSubmit: (item: QuestionItemPayload) => void | Promise<void>;
  readOnly?: boolean;
  setSubmitError?: (message: string | null) => void;
};
