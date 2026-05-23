import { MOCK_TRYOUT_EXAM_QUESTIONS } from "@/templates/Tryout/TryoutExam/TryoutExamQuestionsPage/tryoutExamQuestionsMock";
import { getDefaultQuestionItem } from "./getDefaultQuestionItem";
import { mapMockQuestionToFormValues } from "./mapMockQuestionToFormValues";

export const MOCK_BULK_FORM_VALUES = {
  questions: [getDefaultQuestionItem(1)],
};

export const MOCK_SINGLE_QUESTION_EDIT = mapMockQuestionToFormValues(
  MOCK_TRYOUT_EXAM_QUESTIONS.questions[0],
);
