import type { TryoutQuestionItemFormValues } from "./tryoutQuestionsFormTypes";

const URL_PATTERN = /^https?:\/\/.+/i;

export function validateTryoutQuestionItem(
  item: TryoutQuestionItemFormValues,
  questionLabel?: string,
): string | null {
  const prefix = questionLabel ? `${questionLabel}: ` : "";

  if (!item.questionText.trim()) {
    return `${prefix}Teks soal wajib diisi`;
  }

  if (item.imageUrl.trim() && !URL_PATTERN.test(item.imageUrl.trim())) {
    return `${prefix}URL gambar harus diawali http:// atau https://`;
  }

  const filledAnswers = item.answers.filter((a) => a.answerText.trim());
  if (filledAnswers.length < 2) {
    return `${prefix}Minimal 2 jawaban harus diisi`;
  }

  const correctCount = item.answers.filter((a) => a.isCorrect).length;
  if (correctCount !== 1) {
    return `${prefix}Pilih tepat satu jawaban benar`;
  }

  const correctAnswer = item.answers.find((a) => a.isCorrect);
  if (!correctAnswer?.answerText.trim()) {
    return `${prefix}Jawaban benar harus diisi teksnya`;
  }

  return null;
}
