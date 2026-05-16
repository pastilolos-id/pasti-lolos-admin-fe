"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import Icon from "@/components/Icon";
import { Button, buttonVariants } from "@/components/ui/button";
import { useExamPackageDetailQuery } from "@/lib/exams/examsQuery";
import { mapSubExamsForView } from "@/lib/exams/mapExamPackageDetail";
import { parseExamApiError } from "@/lib/exams/parseExamApiError";
import { cn, formatIdr } from "@/lib/utils";

function parseNumericTryoutId(rawId: string): number | null {
  const trimmed = decodeURIComponent(rawId).trim();
  if (!/^\d+$/.test(trimmed)) return null;
  return Number(trimmed);
}

export default function TryoutViewPage() {
  const params = useParams<{ id: string }>();
  const rawId = params?.id ?? "";
  const numericId = parseNumericTryoutId(rawId);

  const {
    data: tryout,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useExamPackageDetailQuery(numericId);

  const isInitialLoading = isLoading || (isFetching && !tryout);

  if (!numericId) {
    return (
      <section className="space-y-4">
        <div className="rounded-3xl border border-neutral-3 p-6">
          <p className="text-b2 text-neutral-6">ID tryout tidak valid.</p>
        </div>
      </section>
    );
  }

  if (isInitialLoading) {
    return (
      <section className="space-y-4">
        <div className="rounded-3xl border border-neutral-3 p-6 text-b2 text-neutral-6">
          Memuat detail tryout...
        </div>
      </section>
    );
  }

  if (isError || !tryout) {
    return (
      <section className="space-y-4">
        <Link
          href="/tryout"
          className="group mt-3 ml-3 inline-flex items-center gap-2 text-s1 text-neutral-6"
        >
          <div className="rounded-full bg-primary-4 p-2.25 transition-colors group-hover:bg-primary-5">
            <Icon name="arrow-left-circle" size={15} />
          </div>
          <span>Kembali</span>
        </Link>
        <div className="rounded-3xl border border-neutral-3 p-6">
          <p className="text-b2 text-neutral-6">{parseExamApiError(error)}</p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-4 rounded-full bg-red px-6 py-2 text-s1 text-white hover:bg-red/85"
          >
            Coba Lagi
          </button>
        </div>
      </section>
    );
  }

  const subExams = mapSubExamsForView(tryout);
  const parentId = String(tryout.id);

  return (
    <section className="space-y-4">
      <Link
        href="/tryout"
        className="group mt-3 ml-3 inline-flex items-center gap-2 text-s1 text-neutral-6"
      >
        <div className="rounded-full bg-primary-4 p-2.25 transition-colors group-hover:bg-primary-5">
          <Icon name="arrow-left-circle" size={15} />
        </div>
        <span>Kembali</span>
      </Link>

      <div className="mb-6 rounded-3xl border border-neutral-3 p-4">
        <div className="mb-4 flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex justify-center sm:block">
            <Icon name="text-box-edit-blue" size={150} />
          </div>

          <div className="flex-1">
            <h1 className="mb-2 text-h4 text-neutral-6">{tryout.examName}</h1>
            {tryout.description ? (
              <p className="mb-3 text-b2 text-neutral-5">
                {tryout.description}
              </p>
            ) : null}

            <div className="mb-5 flex items-center gap-4 text-c1 text-neutral-5">
              <div className="flex items-center gap-1">
                <Icon name="exam-multiple-choice-outline" size={20} />
                <span>{tryout.totalQuestions} Soal</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="time-outlined" size={20} />
                <span>{tryout.totalDuration} Menit</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-8">
              <div className="space-y-1">
                <p className="text-b2 text-neutral-6">Harga</p>
                <p className="text-h4 text-neutral-6">
                  {formatIdr(tryout.price)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Link
          href={`/tryout/${parentId}/edit`}
          className={cn(
            buttonVariants({ size: "default" }),
            "w-full rounded-full bg-red text-s1 text-white hover:bg-red/75",
          )}
        >
          Edit Paket Tryout
        </Link>
      </div>

      <div className="space-y-3 rounded-3xl border-[6px] border-primary-4 p-6">
        <div className="flex justify-end">
          <Button
            type="button"
            variant="primary"
            size="sm"
            className="h-10 shrink-0 rounded-full px-4 text-sm font-bold whitespace-nowrap text-white shadow-none"
            asChild
          >
            <Link href={`/tryout/create?packageId=${parentId}`}>
              <Plus className="size-4 shrink-0" aria-hidden />
              Tambah Tryout
            </Link>
          </Button>
        </div>

        {subExams.length === 0 ? (
          <p className="py-8 text-center text-b2 text-neutral-5">
            Belum Ada Tryout yang ditambahkan
          </p>
        ) : (
          subExams.map((section) => (
            <article
              key={section.id}
              className="rounded-3xl border border-neutral-3 p-6"
            >
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-h4">{section.title}</h2>
              </div>

              <div className="flex flex-col gap-4 text-b2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Icon
                      name="exam-multiple-choice-outline"
                      size={32}
                      fill="white"
                    />
                    {section.totalQuestions} Soal
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-3xl text-yellow">★</span>
                    <span>Passing Grade {section.passingGrade}</span>
                  </span>
                </div>

                <Button
                  type="button"
                  className="rounded-full px-10"
                  disabled
                  aria-disabled
                  title="Fitur edit soal dan jawaban belum tersedia"
                >
                  Edit Soal dan Jawaban
                </Button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
