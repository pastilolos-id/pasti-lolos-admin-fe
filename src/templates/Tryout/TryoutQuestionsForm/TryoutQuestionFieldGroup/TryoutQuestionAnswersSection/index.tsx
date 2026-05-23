"use client";

import type { Control, FieldValues } from "react-hook-form";
import { useWatch } from "react-hook-form";

import { ANSWER_LABELS } from "../../tryoutQuestionsFormConstants";
import TryoutQuestionAnswerRow from "./TryoutQuestionAnswerRow";

type TryoutQuestionAnswersSectionProps = {
  control: Control<FieldValues>;
  namePrefix: string;
  readOnly?: boolean;
  onMarkCorrect: (answerIndex: number) => void;
};

export default function TryoutQuestionAnswersSection({
  control,
  namePrefix,
  readOnly = false,
  onMarkCorrect,
}: TryoutQuestionAnswersSectionProps) {
  const answers = useWatch({
    control,
    name: `${namePrefix}.answers`,
  }) as { isCorrect: boolean }[] | undefined;

  return (
    <div className="w-full space-y-3">
      <p className="text-b2 font-bold text-neutral-6">Pilihan Jawaban</p>
      <p className="text-c1 text-neutral-5">
        Klik label A–D untuk menandai jawaban benar.
      </p>
      <div className="space-y-3">
        {ANSWER_LABELS.map((label, answerIndex) => (
          <TryoutQuestionAnswerRow
            key={label}
            control={control}
            namePrefix={namePrefix}
            label={label}
            answerIndex={answerIndex}
            isCorrect={answers?.[answerIndex]?.isCorrect === true}
            readOnly={readOnly}
            onMarkCorrect={() => onMarkCorrect(answerIndex)}
          />
        ))}
      </div>
    </div>
  );
}
