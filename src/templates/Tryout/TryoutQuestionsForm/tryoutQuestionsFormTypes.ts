export type AnswerLabel = "A" | "B" | "C" | "D";

export type DifficultyLevel = "easy" | "medium" | "hard";

export type TryoutQuestionAnswerFormValues = {
  label: AnswerLabel;
  answerText: string;
  isCorrect: boolean;
};

export type TryoutQuestionItemFormValues = {
  questionText: string;
  explanationText: string;
  imageUrl: string;
  points: string;
  difficultyLevel: DifficultyLevel;
  orderInExam: string;
  answers: TryoutQuestionAnswerFormValues[];
};

export type TryoutQuestionsBulkFormValues = {
  questions: TryoutQuestionItemFormValues[];
};

export type TryoutSingleQuestionFormValues = {
  question: TryoutQuestionItemFormValues;
};

export type AnswerPayload = {
  label: string;
  answerText: string;
  isCorrect: boolean;
};

export type QuestionItemPayload = {
  questionText: string;
  explanationText?: string;
  points?: number;
  difficultyLevel?: string;
  orderInExam: number;
  imageUrl?: string;
  answers: AnswerPayload[];
};

export type BulkCreateQuestionsPayload = {
  examId: number;
  subjectId: number;
  examTitle?: string;
  questions: QuestionItemPayload[];
};
