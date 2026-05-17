"use client";

import { useEffect, useMemo, useState } from "react";

import Icon from "@/components/Icon";
import PointerTooltip from "@/components/PointerTooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { MockTryoutExamQuestions } from "../tryoutExamQuestionsMock";

type QuestionsSectionProps = {
  data: MockTryoutExamQuestions;
  initialSelectedByQuestionId: Record<number, number | null>;
};

export default function QuestionsSection({
  data,
  initialSelectedByQuestionId,
}: QuestionsSectionProps) {
  const sortedQuestions = useMemo(
    () => [...data.questions].sort((a, b) => a.order - b.order),
    [data.questions],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedByQuestionId, setSelectedByQuestionId] = useState<
    Record<number, number | null>
  >(initialSelectedByQuestionId);

  const totalQuestions = sortedQuestions.length;

  useEffect(() => {
    setCurrentIndex((i) =>
      totalQuestions === 0 ? 0 : Math.min(i, totalQuestions - 1),
    );
  }, [totalQuestions]);

  const current = sortedQuestions[currentIndex];
  const currentOrder = current?.order ?? currentIndex + 1;
  const selectedId = current
    ? (selectedByQuestionId[current.questionId] ?? null)
    : null;

  const isFirst = currentIndex === 0;
  const isLast = currentIndex >= totalQuestions - 1;

  const goNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const setSelected = (questionId: number, optionId: number) => {
    setSelectedByQuestionId((prev) => ({ ...prev, [questionId]: optionId }));
  };

  if (!current) {
    return (
      <section className="rounded-3xl border border-neutral-3 bg-neutral-1 p-6 text-b2 text-neutral-5">
        Belum ada soal untuk ditampilkan.
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-6 xl:flex-row xl:items-start">
      <div className="flex min-h-[calc(100vh-75px)] min-w-0 flex-1 flex-col justify-between rounded-3xl border border-neutral-3 bg-neutral-1 p-4 sm:p-11">
        <div>
          <p className="text-h4 font-semibold text-neutral-6">
            Soal Ke-{currentOrder} dari {totalQuestions} soal
          </p>
          <p className="mt-6 text-b1 text-neutral-5">{current.questionText}</p>

          {current.imageUrl ? (
            // biome-ignore lint/performance/noImgElement: placeholder image for slicing
            <img
              src={current.imageUrl}
              alt={`Ilustrasi soal nomor ${currentOrder}`}
              className="mt-6 max-h-80 w-auto rounded-2xl border border-neutral-3 object-contain"
            />
          ) : null}

          <div className="mt-6 space-y-3">
            {current.options.map((option) => {
              const isSelected = selectedId === option.id;
              const tooltipText = isSelected
                ? "jawaban benar"
                : "klik untuk dijadikan jawaban benar";
              return (
                <PointerTooltip key={option.id} label={tooltipText}>
                  <button
                    type="button"
                    onClick={() => setSelected(current.questionId, option.id)}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-primary-4 bg-neutral-1 px-4 py-3 text-left text-b2 text-neutral-6 transition-all hover:border-primary-4/80"
                  >
                    <span
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded-full border text-c1",
                        isSelected
                          ? "border-primary-4 bg-primary-4 text-neutral-1"
                          : "border-primary-4 bg-neutral-1 text-primary-4",
                      )}
                    >
                      {isSelected ? "✓" : ""}
                    </span>
                    <span>
                      {option.label}. {option.text}
                    </span>
                  </button>
                </PointerTooltip>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-neutral-3 bg-neutral-1 px-4 py-3 text-b2 text-neutral-6">
            <p className="text-c1 text-neutral-5">Pembahasan</p>
            <p className="mt-1 text-neutral-6">
              {current.explanation?.trim() || "Pembahasan belum tersedia."}
            </p>
          </div>
        </div>

        <div
          className={cn(
            "mt-10 flex flex-col gap-3 sm:flex-row sm:items-center",
            isFirst ? "sm:justify-end" : "sm:justify-between",
          )}
        >
          {!isFirst ? (
            <Button
              type="button"
              variant="outline"
              size="default"
              onClick={goPrev}
              className="w-full rounded-full border-primary-4/50 px-6 py-3 text-s1 sm:w-auto sm:min-w-41"
            >
              <Icon
                name="arrow-left-circle-bg-blue"
                size={24}
                fill="#80B0FF"
                stroke="#80B0FF"
              />
              Sebelumnya
            </Button>
          ) : null}

          {!isLast ? (
            <Button
              type="button"
              variant="outline"
              size="default"
              onClick={goNext}
              className={cn(
                "w-full rounded-full border-primary-4/50 px-6 py-3 text-s1 sm:w-auto sm:min-w-41",
                !isFirst && "sm:ml-auto",
                isFirst && "sm:ml-0",
              )}
            >
              Selanjutnya
              <Icon
                name="arrow-left-circle-bg-blue"
                size={24}
                className="rotate-180"
              />
            </Button>
          ) : null}
        </div>
      </div>

      <aside className="w-full max-h-[calc(100vh-75px)] shrink-0 overflow-auto xl:w-80">
        <div className="rounded-3xl border border-neutral-3 bg-white p-5 shadow-sm">
          <h2 className="text-b1 font-semibold text-neutral-6">
            {data.examName}
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {sortedQuestions.map((q, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={q.questionId}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={cn(
                    "flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border text-c1 font-semibold transition-all sm:size-12",
                    isActive
                      ? "border-primary-4 bg-primary-5 text-neutral-1 ring-2 ring-primary-4/40 ring-offset-2 ring-offset-white"
                      : "border-primary-4 bg-neutral-1 text-neutral-6 hover:bg-primary-5/10",
                  )}
                >
                  {q.order}
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </section>
  );
}
