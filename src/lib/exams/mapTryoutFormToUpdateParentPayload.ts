import type { TryoutParentFormValues } from "@/templates/Tryout/TryoutForm/tryoutFormTypes";

import type { UpdateExamParentRequest } from "./updateExamTypes";

function optionalString(value: string): string | undefined {
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

export function mapTryoutFormToUpdateParentPayload(
  values: TryoutParentFormValues,
): UpdateExamParentRequest {
  return {
    examName: optionalString(values.examName),
    description: optionalString(values.description),
    durationMinutes: optionalString(values.durationMinutes),
    examType: "tryout",
    price: optionalString(values.price),
  };
}
