"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import Icon from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { useExamPackageDetailQuery } from "@/lib/exams/examsQuery";
import { getShortExamLabel } from "@/lib/exams/getShortExamLabel";
import { parseExamApiError } from "@/lib/exams/parseExamApiError";
import { parseNumericTryoutId } from "@/lib/exams/parseExamId";

import ContentSection from "./ContentSection";

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

export default function TryoutExamViewPage() {
  const params = useParams<{ packageId: string; tryoutId: string }>();
  const rawPackageId = params?.packageId ?? "";
  const rawTryoutId = params?.tryoutId ?? "";
  const numericPackageId = parseNumericTryoutId(rawPackageId);
  const numericTryoutId = parseNumericTryoutId(rawTryoutId);
  const packageId = numericPackageId != null ? String(numericPackageId) : "";

  const {
    data: parentPackage,
    isLoading: isParentLoading,
    isFetching: isParentFetching,
  } = useExamPackageDetailQuery(numericPackageId);

  const {
    data: tryoutDetail,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useExamPackageDetailQuery(numericTryoutId);

  const isInitialLoading =
    isLoading ||
    isParentLoading ||
    (isFetching && !tryoutDetail) ||
    (isParentFetching && !parentPackage);
  const backHref = packageId ? `/tryout/${packageId}/view` : "/tryout";

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

  if (isInitialLoading) {
    return (
      <section className="min-h-[calc(100vh-75px)] rounded-card-medium border border-neutral-3 p-4 sm:p-10">
        <p className="text-b2 text-neutral-5" aria-live="polite">
          Memuat detail tryout...
        </p>
      </section>
    );
  }

  if (isError || !tryoutDetail) {
    return (
      <section className="min-h-[calc(100vh-75px)] rounded-card-medium border border-neutral-3 p-4 sm:p-10">
        <p className="text-b2 text-neutral-6">
          {parseExamApiError(error, "exam")}
        </p>
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() => void refetch()}
            className="rounded-full bg-red px-6 py-2 text-s1 text-white hover:bg-red/85"
          >
            Coba Lagi
          </button>
          <BackButton href={backHref} />
        </div>
      </section>
    );
  }

  const isChildOfPackage =
    parentPackage?.subExams.some((subExam) => subExam.id === numericTryoutId) ??
    false;

  if (parentPackage && !isChildOfPackage) {
    return (
      <section className="min-h-[calc(100vh-75px)] rounded-card-medium border border-neutral-3 p-4 sm:p-10">
        <p className="text-b2 text-neutral-6">
          Tryout ini tidak termasuk dalam paket yang dipilih.
        </p>
        <div className="mt-4">
          <BackButton href={backHref} />
        </div>
      </section>
    );
  }

  const subExamFromParent = parentPackage?.subExams.find(
    (subExam) => subExam.id === numericTryoutId,
  );
  const passingValue =
    subExamFromParent?.passingGrade ??
    (tryoutDetail.totalPassingScore != null
      ? String(tryoutDetail.totalPassingScore)
      : "0");
  const standardScores = [
    {
      key: getShortExamLabel(tryoutDetail.examName),
      value: passingValue,
    },
  ];

  return (
    <section className="min-h-[calc(100vh-75px)] rounded-card-medium border border-neutral-3 p-4 sm:p-10">
      <ContentSection
        title={tryoutDetail.examName}
        totalQuestions={tryoutDetail.totalQuestions}
        durationMinutes={tryoutDetail.totalDuration}
        standardScores={standardScores}
      />

      <div className="mt-15 flex flex-col gap-3 sm:mt-24 sm:flex-row sm:justify-between">
        <BackButton href={backHref} />

        <Button
          variant="primary"
          size="default"
          className="w-full cursor-pointer rounded-full px-6 py-3 text-s1 text-neutral-1 sm:w-auto sm:px-8 sm:whitespace-nowrap"
          asChild
        >
          <Link href={`/tryout/${packageId}/${rawTryoutId}/questions`}>
            Lihat Soal, Jawaban, dan Pembahasan
            <Icon name="arrow-left-circle" size={24} className="rotate-180" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
