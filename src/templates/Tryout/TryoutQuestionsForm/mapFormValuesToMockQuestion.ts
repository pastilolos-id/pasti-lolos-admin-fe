import type { MockQuestion } from "@/templates/Tryout/TryoutExam/TryoutExamQuestionsPage/tryoutExamQuestionsMock";
import type { TryoutQuestionItemFormValues } from "./tryoutQuestionsFormTypes";

type MapFormToMockParams = {
  values: TryoutQuestionItemFormValues;
  questionId: number;
  order: number;
  baseOptionId?: number;
};

export function mapFormValuesToMockQuestion({
  values,
  questionId,
  order,
  baseOptionId = questionId * 10,
}: MapFormToMockParams): MockQuestion {
  const correctOption = values.answers.find((a) => a.isCorrect);

  return {
    order,
    questionId,
    questionText: values.questionText.trim(),
    explanation: values.explanationText.trim(),
    imageUrl: values.imageUrl.trim() || undefined,
    options: values.answers.map((answer, index) => ({
      id: baseOptionId + index + 1,
      label: answer.label,
      text: answer.answerText.trim(),
      isCorrect: answer.isCorrect,
    })),
    initialSelectedOptionId: correctOption
      ? baseOptionId + values.answers.findIndex((a) => a.isCorrect) + 1
      : null,
  };
}
