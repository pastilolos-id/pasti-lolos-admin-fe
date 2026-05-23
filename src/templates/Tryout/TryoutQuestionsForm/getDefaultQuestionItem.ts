import {
  ANSWER_LABELS,
  DEFAULT_DIFFICULTY,
  DEFAULT_POINTS,
} from "./tryoutQuestionsFormConstants";
import type { TryoutQuestionItemFormValues } from "./tryoutQuestionsFormTypes";

export function getDefaultQuestionItem(
  orderInExam = 1,
): TryoutQuestionItemFormValues {
  return {
    questionText: "",
    explanationText: "",
    imageUrl: "",
    points: String(DEFAULT_POINTS),
    difficultyLevel: DEFAULT_DIFFICULTY,
    orderInExam: String(orderInExam),
    answers: ANSWER_LABELS.map((label, index) => ({
      label,
      answerText: "",
      isCorrect: index === 0,
    })),
  };
}
