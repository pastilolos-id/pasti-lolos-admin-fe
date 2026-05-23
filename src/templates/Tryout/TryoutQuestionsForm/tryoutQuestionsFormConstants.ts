import type { AnswerLabel, DifficultyLevel } from "./tryoutQuestionsFormTypes";

export const ANSWER_LABELS: AnswerLabel[] = ["A", "B", "C", "D"];

export const DIFFICULTY_OPTIONS: { value: DifficultyLevel; label: string }[] = [
  { value: "easy", label: "Mudah" },
  { value: "medium", label: "Sedang" },
  { value: "hard", label: "Sulit" },
];

export const DEFAULT_POINTS = 5;
export const DEFAULT_DIFFICULTY: DifficultyLevel = "medium";
export const MOCK_SUBJECT_ID = 2;

export const QUESTION_FIELD_CLASS_NAME = "col-span-12 w-full";
