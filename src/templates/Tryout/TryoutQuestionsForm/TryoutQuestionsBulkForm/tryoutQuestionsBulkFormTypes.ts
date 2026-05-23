import type {
  BulkCreateQuestionsPayload,
  TryoutQuestionsBulkFormValues,
} from "../tryoutQuestionsFormTypes";

export type TryoutQuestionsBulkFormProps = {
  examId: number;
  subjectId: number;
  examTitle?: string;
  startOrder?: number;
  initialValues?: TryoutQuestionsBulkFormValues;
  onSubmit: (payload: BulkCreateQuestionsPayload) => void | Promise<void>;
  readOnly?: boolean;
};
