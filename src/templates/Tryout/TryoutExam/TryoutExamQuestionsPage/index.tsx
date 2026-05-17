"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import Icon from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { parseNumericTryoutId } from "@/lib/exams/parseExamId";

import QuestionsSection from "./QuestionsSection";
import {
  buildInitialSelectedByQuestionId,
  MOCK_TRYOUT_EXAM_QUESTIONS,
} from "./tryoutExamQuestionsMock";

function BackButton({ href }: { href: string }) {
  return (
    <Link href={href}>
      <Button
        variant="outline"
        size="default"
        className="w-full rounded-full border-primary-4/50 px-6 py-3 text-s1 sm:w-41 sm:justify-between"
      >
        <Icon
          name="arrow-left-circle-bg-blue"
          size={24}
          fill="#80B0FF"
          stroke="#80B0FF"
        />
        Kembali
      </Button>
    </Link>
  );
}

export default function TryoutExamQuestionsPage() {
  const params = useParams<{ packageId: string; tryoutId: string }>();
  const rawPackageId = params?.packageId ?? "";
  const rawTryoutId = params?.tryoutId ?? "";
  const numericPackageId = parseNumericTryoutId(rawPackageId);
  const numericTryoutId = parseNumericTryoutId(rawTryoutId);
  const packageId = numericPackageId != null ? String(numericPackageId) : "";
  const backHref =
    packageId && rawTryoutId
      ? `/tryout/${packageId}/${rawTryoutId}/view`
      : packageId
        ? `/tryout/${packageId}/view`
        : "/tryout";

  const initialSelected = buildInitialSelectedByQuestionId(
    MOCK_TRYOUT_EXAM_QUESTIONS.questions,
  );

  if (!numericPackageId || !numericTryoutId) {
    return (
      <section className="min-h-[calc(100vh-75px)] rounded-card-medium border border-neutral-3 p-4 sm:p-10">
        <p className="text-b2 text-neutral-6">ID tryout tidak valid.</p>
        <div className="mt-4">
          <BackButton href={backHref} />
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-75px)]">
      <div className="mb-6">
        <BackButton href={backHref} />
      </div>

      <QuestionsSection
        data={MOCK_TRYOUT_EXAM_QUESTIONS}
        initialSelectedByQuestionId={initialSelected}
      />
    </section>
  );
}
