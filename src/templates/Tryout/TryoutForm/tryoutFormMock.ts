import type { TryoutListItem } from "../types";
import type { TryoutFormValues } from "./tryoutFormTypes";

export const emptyTryoutFormValues: TryoutFormValues = {
  examName: "",
  description: "",
  subjectId: "",
  durationMinutes: "",
  status: "published",
  passingScore: "",
  price: "",
  attemptsAllowed: "1",
  randomizeQuestions: true,
};

export function emptyTryoutFormValuesForChild(): TryoutFormValues {
  return {
    ...emptyTryoutFormValues,
    price: "0",
  };
}

/** Mock daftar untuk form view/edit hingga GET detail tersedia. */
const tryoutFormListMock: TryoutListItem[] = [
  {
    id: "20",
    title: "Paket Tryout BUMN 2026",
    questionCount: 275,
    durationMinutes: 120,
    institution: "BUMN",
    price: 39_000,
  },
  {
    id: "21",
    title: "Try Out Challenge CPNS",
    questionCount: 110,
    durationMinutes: 100,
    institution: "CPNS",
    price: 249_000,
    specialPrice: 199_000,
    originalPrice: 249_000,
  },
];

function institutionToSubjectId(
  institution: TryoutListItem["institution"],
): string {
  return institution === "BUMN" ? "1" : "2";
}

function buildMockValuesForId(id: string): TryoutFormValues | undefined {
  const item = tryoutFormListMock.find((row) => row.id === id);
  if (!item) {
    return undefined;
  }

  const n = Number.parseInt(id.replace(/\D/g, ""), 10) || 1;

  return {
    examName: item.title,
    description:
      "Ujian ini tentang persiapan seleksi kompetensi. Data mock untuk slicing admin.",
    subjectId: institutionToSubjectId(item.institution),
    durationMinutes: String(item.durationMinutes),
    status: "published",
    passingScore: String(75 + (n % 15)),
    price: String(item.price),
    attemptsAllowed: String(1 + (n % 5)),
    randomizeQuestions: true,
  };
}

export function getTryoutFormDetailById(
  id: string,
): TryoutFormValues | undefined {
  return buildMockValuesForId(decodeURIComponent(id));
}
