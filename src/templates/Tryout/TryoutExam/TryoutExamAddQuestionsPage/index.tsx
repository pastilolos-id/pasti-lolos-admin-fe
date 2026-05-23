"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { parseNumericTryoutId } from "@/lib/exams/parseExamId";
import { MOCK_TRYOUT_EXAM_QUESTIONS } from "@/templates/Tryout/TryoutExam/TryoutExamQuestionsPage/tryoutExamQuestionsMock";
import TryoutQuestionsBulkForm from "@/templates/Tryout/TryoutQuestionsForm/TryoutQuestionsBulkForm";
import { MOCK_SUBJECT_ID } from "@/templates/Tryout/TryoutQuestionsForm/tryoutQuestionsFormConstants";

import TryoutExamAddQuestionsPageHeader from "./TryoutExamAddQuestionsPageHeader";

export default function TryoutExamAddQuestionsPage() {
  const router = useRouter();
  const params = useParams<{ packageId: string; tryoutId: string }>();
  const rawPackageId = params?.packageId ?? "";
  const rawTryoutId = params?.tryoutId ?? "";
  const numericPackageId = parseNumericTryoutId(rawPackageId);
  const numericTryoutId = parseNumericTryoutId(rawTryoutId);

  const questionsHref =
    numericPackageId != null && rawTryoutId
      ? `/tryout/${numericPackageId}/${rawTryoutId}/questions`
      : "/tryout";

  const startOrder = useMemo(
    () => MOCK_TRYOUT_EXAM_QUESTIONS.questions.length + 1,
    [],
  );

  const handleSubmit = useCallback(async () => {
    router.push(questionsHref);
  }, [router, questionsHref]);

  if (!numericPackageId || !numericTryoutId) {
    return (
      <section className="min-h-[calc(100vh-75px)] rounded-card-medium border border-neutral-3 p-4 sm:p-10">
        <p className="text-b2 text-neutral-6">ID tryout tidak valid.</p>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-75px)] space-y-6">
      <TryoutExamAddQuestionsPageHeader
        backHref={questionsHref}
        examName={MOCK_TRYOUT_EXAM_QUESTIONS.examName}
      />

      <div className="rounded-card-medium border border-neutral-3 bg-neutral-1 p-4 sm:p-6">
        <TryoutQuestionsBulkForm
          examId={numericTryoutId}
          subjectId={MOCK_SUBJECT_ID}
          examTitle={MOCK_TRYOUT_EXAM_QUESTIONS.examName}
          startOrder={startOrder}
          onSubmit={handleSubmit}
        />
      </div>
    </section>
  );
}
