import type {
  QuestionItemPayload,
  TryoutQuestionItemFormValues,
} from "../tryoutQuestionsFormTypes";

export type TryoutSingleQuestionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  orderInExam: number;
  examId: number;
  subjectId: number;
  initialValues?: TryoutQuestionItemFormValues;
  onSubmitMock: (item: QuestionItemPayload) => void;
};

export const tryoutSingleQuestionFormId = "tryout-single-question-form";
