"use client";

import { cn } from "@/lib/utils";
import type { MockQuestion } from "../../tryoutExamQuestionsMock";
import QuestionsSectionAddOneButton from "./QuestionsSectionAddOneButton";

type QuestionsSectionSidebarProps = {
  examName: string;
  questions: MockQuestion[];
  currentIndex: number;
  onSelectQuestion: (index: number) => void;
  onAddOneQuestion: () => void;
};

export default function QuestionsSectionSidebar({
  examName,
  questions,
  currentIndex,
  onSelectQuestion,
  onAddOneQuestion,
}: QuestionsSectionSidebarProps) {
  return (
    <aside className="max-h-[calc(100vh-75px)] w-full shrink-0 overflow-auto xl:w-80">
      <div className="rounded-3xl border border-neutral-3 bg-white p-5 shadow-sm">
        <h2 className="text-b1 font-semibold text-neutral-6">{examName}</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {questions.map((q, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={q.questionId}
                type="button"
                onClick={() => onSelectQuestion(idx)}
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
          <QuestionsSectionAddOneButton onClick={onAddOneQuestion} />
        </div>
      </div>
    </aside>
  );
}
