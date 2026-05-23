import {
  DEFAULT_DIFFICULTY,
  DEFAULT_POINTS,
} from "./tryoutQuestionsFormConstants";
import type {
  BulkCreateQuestionsPayload,
  QuestionItemPayload,
  TryoutQuestionItemFormValues,
} from "./tryoutQuestionsFormTypes";

function mapQuestionItem(
  item: TryoutQuestionItemFormValues,
  orderInExam: number,
): QuestionItemPayload {
  const points = Number.parseInt(item.points, 10);
  const payload: QuestionItemPayload = {
    questionText: item.questionText.trim(),
    orderInExam,
    answers: item.answers
      .filter((a) => a.answerText.trim())
      .map((a) => ({
        label: a.label,
        answerText: a.answerText.trim(),
        isCorrect: a.isCorrect,
      })),
  };

  if (item.explanationText.trim()) {
    payload.explanationText = item.explanationText.trim();
  }

  if (item.imageUrl.trim()) {
    payload.imageUrl = item.imageUrl.trim();
  }

  payload.points = Number.isFinite(points) ? points : DEFAULT_POINTS;
  payload.difficultyLevel = item.difficultyLevel || DEFAULT_DIFFICULTY;

  return payload;
}

type MapBulkPayloadParams = {
  examId: number;
  subjectId: number;
  examTitle?: string;
  questions: TryoutQuestionItemFormValues[];
  startOrder?: number;
};

export function mapToBulkCreateQuestionsPayload({
  examId,
  subjectId,
  examTitle,
  questions,
  startOrder = 1,
}: MapBulkPayloadParams): BulkCreateQuestionsPayload {
  const payload: BulkCreateQuestionsPayload = {
    examId,
    subjectId,
    questions: questions.map((q, index) =>
      mapQuestionItem(q, startOrder + index),
    ),
  };

  if (examTitle?.trim()) {
    payload.examTitle = examTitle.trim();
  }

  return payload;
}

export function mapSingleQuestionToPayload(
  item: TryoutQuestionItemFormValues,
  orderInExam: number,
): QuestionItemPayload {
  return mapQuestionItem(item, orderInExam);
}
