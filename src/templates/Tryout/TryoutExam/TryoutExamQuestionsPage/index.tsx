"use client";

import { useParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { parseNumericTryoutId } from "@/lib/exams/parseExamId";
import { mapFormValuesToMockQuestion } from "@/templates/Tryout/TryoutQuestionsForm/mapFormValuesToMockQuestion";
import { mapMockQuestionToFormValues } from "@/templates/Tryout/TryoutQuestionsForm/mapMockQuestionToFormValues";
import TryoutSingleQuestionDialog from "@/templates/Tryout/TryoutQuestionsForm/TryoutSingleQuestionDialog";
import {
  ANSWER_LABELS,
  MOCK_SUBJECT_ID,
} from "@/templates/Tryout/TryoutQuestionsForm/tryoutQuestionsFormConstants";
import type {
  QuestionItemPayload,
  TryoutQuestionItemFormValues,
} from "@/templates/Tryout/TryoutQuestionsForm/tryoutQuestionsFormTypes";

import QuestionsSection from "./QuestionsSection";
import TryoutExamQuestionsToolbar from "./TryoutExamQuestionsToolbar";
import {
  buildInitialSelectedByQuestionId,
  MOCK_TRYOUT_EXAM_QUESTIONS,
  type MockQuestion,
} from "./tryoutExamQuestionsMock";

type SingleDialogState =
  | { open: false }
  | {
      open: true;
      mode: "create" | "edit";
      orderInExam: number;
      initialValues?: TryoutQuestionItemFormValues;
      editQuestionId?: number;
    };

function getNextQuestionId(questions: MockQuestion[]): number {
  const maxId = questions.reduce((max, q) => Math.max(max, q.questionId), 100);
  return maxId + 1;
}

function payloadToFormValues(
  item: QuestionItemPayload,
): TryoutQuestionItemFormValues {
  const answersByLabel = new Map(
    item.answers.map((answer) => [answer.label, answer]),
  );

  return {
    questionText: item.questionText,
    explanationText: item.explanationText ?? "",
    imageUrl: item.imageUrl ?? "",
    points: String(item.points ?? 5),
    difficultyLevel:
      (item.difficultyLevel as TryoutQuestionItemFormValues["difficultyLevel"]) ??
      "medium",
    orderInExam: String(item.orderInExam),
    answers: ANSWER_LABELS.map((label) => {
      const answer = answersByLabel.get(label);
      return {
        label,
        answerText: answer?.answerText ?? "",
        isCorrect: answer?.isCorrect ?? false,
      };
    }),
  };
}

export default function TryoutExamQuestionsPage() {
  const params = useParams<{ packageId: string; tryoutId: string }>();
  const rawPackageId = params?.packageId ?? "";
  const rawTryoutId = params?.tryoutId ?? "";
  const numericPackageId = parseNumericTryoutId(rawPackageId);
  const numericTryoutId = parseNumericTryoutId(rawTryoutId);
  const packageId = numericPackageId != null ? String(numericPackageId) : "";

  const [examName] = useState(MOCK_TRYOUT_EXAM_QUESTIONS.examName);
  const [questions, setQuestions] = useState<MockQuestion[]>(
    () => MOCK_TRYOUT_EXAM_QUESTIONS.questions,
  );
  const [dialogState, setDialogState] = useState<SingleDialogState>({
    open: false,
  });

  const backHref =
    packageId && rawTryoutId
      ? `/tryout/${packageId}/${rawTryoutId}/view`
      : packageId
        ? `/tryout/${packageId}/view`
        : "/tryout";

  const addQuestionsHref =
    packageId && rawTryoutId
      ? `/tryout/${packageId}/${rawTryoutId}/add-questions`
      : "/tryout";

  const initialSelected = useMemo(
    () => buildInitialSelectedByQuestionId(questions),
    [questions],
  );

  const openCreateDialog = useCallback(() => {
    setDialogState({
      open: true,
      mode: "create",
      orderInExam: questions.length + 1,
    });
  }, [questions.length]);

  const openEditDialog = useCallback((question: MockQuestion) => {
    setDialogState({
      open: true,
      mode: "edit",
      orderInExam: question.order,
      initialValues: mapMockQuestionToFormValues(question),
      editQuestionId: question.questionId,
    });
  }, []);

  const handleDialogOpenChange = useCallback((open: boolean) => {
    if (!open) {
      setDialogState({ open: false });
    }
  }, []);

  const handleSingleSubmit = useCallback(
    (item: QuestionItemPayload) => {
      console.log("[TryoutExamQuestionsPage] single question", item);
      const formValues = payloadToFormValues(item);

      if (dialogState.open && dialogState.mode === "create") {
        const newId = getNextQuestionId(questions);
        const newQuestion = mapFormValuesToMockQuestion({
          values: formValues,
          questionId: newId,
          order: item.orderInExam,
          baseOptionId: newId * 10,
        });

        setQuestions((prev) => [...prev, newQuestion]);
        return;
      }

      if (
        dialogState.open &&
        dialogState.mode === "edit" &&
        dialogState.editQuestionId != null
      ) {
        setQuestions((prev) =>
          prev.map((q) => {
            if (q.questionId !== dialogState.editQuestionId) return q;
            return mapFormValuesToMockQuestion({
              values: formValues,
              questionId: q.questionId,
              order: q.order,
              baseOptionId: q.questionId * 10,
            });
          }),
        );
      }
    },
    [dialogState, questions],
  );

  if (!numericPackageId || !numericTryoutId) {
    return (
      <section className="min-h-[calc(100vh-75px)] rounded-card-medium border border-neutral-3 p-4 sm:p-10">
        <p className="text-b2 text-neutral-6">ID tryout tidak valid.</p>
        <div className="mt-4">
          <TryoutExamQuestionsToolbar
            backHref={backHref}
            addQuestionsHref={addQuestionsHref}
          />
        </div>
      </section>
    );
  }

  const dialogOpen = dialogState.open;
  const dialogMode = dialogOpen ? dialogState.mode : "create";
  const dialogOrder = dialogOpen ? dialogState.orderInExam : 1;
  const dialogInitial = dialogOpen ? dialogState.initialValues : undefined;
  const dialogKey = dialogOpen
    ? `${dialogMode}-${dialogState.editQuestionId ?? "new"}-${dialogOrder}`
    : "closed";

  return (
    <section className="min-h-[calc(100vh-75px)]">
      <div className="mb-6">
        <TryoutExamQuestionsToolbar
          backHref={backHref}
          addQuestionsHref={addQuestionsHref}
        />
      </div>

      <QuestionsSection
        key={questions.map((q) => q.questionId).join("-")}
        examName={examName}
        questions={questions}
        initialSelectedByQuestionId={initialSelected}
        onEditCurrentQuestion={openEditDialog}
        onAddOneQuestion={openCreateDialog}
      />

      <TryoutSingleQuestionDialog
        key={dialogKey}
        open={dialogOpen}
        onOpenChange={handleDialogOpenChange}
        mode={dialogMode}
        orderInExam={dialogOrder}
        examId={numericTryoutId}
        subjectId={MOCK_SUBJECT_ID}
        initialValues={dialogInitial}
        onSubmitMock={handleSingleSubmit}
      />
    </section>
  );
}
