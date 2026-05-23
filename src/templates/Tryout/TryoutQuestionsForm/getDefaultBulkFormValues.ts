import { getDefaultQuestionItem } from "./getDefaultQuestionItem";
import type { TryoutQuestionsBulkFormValues } from "./tryoutQuestionsFormTypes";

export function getDefaultBulkFormValues(): TryoutQuestionsBulkFormValues {
  return {
    questions: [getDefaultQuestionItem(1)],
  };
}
