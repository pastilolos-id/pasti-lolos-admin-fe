import type { TryoutFormValues } from "@/templates/Tryout/TryoutForm/tryoutFormTypes";
import type { CreateExamRequest } from "./createExamTypes";

type MapTryoutFormOptions = {
  packageId?: string;
};

export function mapTryoutFormToCreatePayload(
  values: TryoutFormValues,
  options?: MapTryoutFormOptions,
): CreateExamRequest {
  const payload: CreateExamRequest = {
    examName: values.examName,
    description: values.description || undefined,
    subjectId: values.subjectId,
    durationMinutes: values.durationMinutes,
    examType: "tryout",
    status: values.status || "published",
    passingScore: values.passingScore || undefined,
    price: values.price || undefined,
    attemptsAllowed: values.attemptsAllowed || undefined,
    randomizeQuestions: values.randomizeQuestions,
  };

  if (options?.packageId) {
    payload.packageId = options.packageId;
  }

  return payload;
}
