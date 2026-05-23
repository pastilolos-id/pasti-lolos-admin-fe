import type {
  TryoutQuestionAnswerFormValues,
  TryoutQuestionItemFormValues,
  TryoutQuestionsBulkFormValues,
  TryoutSingleQuestionFormValues,
} from "./tryoutQuestionsFormTypes";

function parseAnswer(raw: unknown): TryoutQuestionAnswerFormValues {
  const answer = raw as Record<string, unknown>;
  return {
    label: (answer.label as TryoutQuestionAnswerFormValues["label"]) ?? "A",
    answerText: String(answer.answerText ?? "").trim(),
    isCorrect: answer.isCorrect === true,
  };
}

export function parseQuestionItem(raw: unknown): TryoutQuestionItemFormValues {
  const item = raw as Record<string, unknown>;
  const answersRaw = Array.isArray(item.answers) ? item.answers : [];

  return {
    questionText: String(item.questionText ?? "").trim(),
    explanationText: String(item.explanationText ?? "").trim(),
    imageUrl: String(item.imageUrl ?? "").trim(),
    points: String(item.points ?? "").trim(),
    difficultyLevel:
      (item.difficultyLevel as TryoutQuestionItemFormValues["difficultyLevel"]) ??
      "medium",
    orderInExam: String(item.orderInExam ?? "").trim(),
    answers: answersRaw.map(parseAnswer),
  };
}

export function parseBulkFormValues(
  data: Record<string, unknown>,
): TryoutQuestionsBulkFormValues {
  const questionsRaw = Array.isArray(data.questions) ? data.questions : [];
  return {
    questions: questionsRaw.map(parseQuestionItem),
  };
}

export function parseSingleFormValues(
  data: Record<string, unknown>,
): TryoutSingleQuestionFormValues {
  return {
    question: parseQuestionItem(data.question),
  };
}
