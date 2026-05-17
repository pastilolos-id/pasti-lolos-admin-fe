"use client";

import { useParams } from "next/navigation";

import { useExamPackageDetailQuery } from "@/lib/exams/examsQuery";
import { mapExamPackageDetailToTryoutFormValues } from "@/lib/exams/mapExamPackageDetailToTryoutFormValues";
import { parseExamApiError } from "@/lib/exams/parseExamApiError";
import { parseNumericTryoutId } from "@/lib/exams/parseExamId";
import TryoutForm from "@/templates/Tryout/TryoutForm";
import TryoutFormBackLink from "@/templates/Tryout/TryoutForm/TryoutFormHeader/TryoutFormBackLink";

export default function TryoutEditPage() {
  const params = useParams<{ packageId: string }>();
  const rawId = params?.packageId ?? "";
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
        <TryoutFormBackLink href="/tryout" />
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

  return (
    <TryoutForm
      key={String(tryout.id)}
      mode="edit-parent"
      examId={String(tryout.id)}
      initialData={mapExamPackageDetailToTryoutFormValues(tryout)}
    />
  );
}
