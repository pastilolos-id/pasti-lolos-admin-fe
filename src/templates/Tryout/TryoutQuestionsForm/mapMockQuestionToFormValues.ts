import type { MockQuestion } from "@/templates/Tryout/TryoutExam/TryoutExamQuestionsPage/tryoutExamQuestionsMock";
import {
  ANSWER_LABELS,
  DEFAULT_DIFFICULTY,
  DEFAULT_POINTS,
} from "./tryoutQuestionsFormConstants";
import type { TryoutQuestionItemFormValues } from "./tryoutQuestionsFormTypes";

export function mapMockQuestionToFormValues(
  question: MockQuestion,
): TryoutQuestionItemFormValues {
  const optionsByLabel = new Map(
    question.options.map((option) => [option.label, option]),
  );

  return {
    questionText: question.questionText,
    explanationText: question.explanation ?? "",
    imageUrl: question.imageUrl ?? "",
    points: String(DEFAULT_POINTS),
    difficultyLevel: DEFAULT_DIFFICULTY,
    orderInExam: String(question.order),
    answers: ANSWER_LABELS.map((label) => {
      const option = optionsByLabel.get(label);
      return {
        label,
        answerText: option?.text ?? "",
        isCorrect: option?.isCorrect ?? false,
      };
    }),
  };
}
