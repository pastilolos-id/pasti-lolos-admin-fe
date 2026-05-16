/** Mode halaman — menentukan judul, aksi header/footer, dan interaksi field. */
export type TryoutFormMode =
  | "create-parent"
  | "create-child"
  | "edit-parent"
  | "view";

export type TryoutFormStatus = "draft" | "published" | "closed" | "archived";

export type TryoutParentFormValues = {
  examName: string;
  description: string;
  subjectId: string;
  durationMinutes: string;
  price: string;
};

export type TryoutFormValues = {
  examName: string;
  description: string;
  subjectId: string;
  durationMinutes: string;
  status: TryoutFormStatus | "";
  passingScore: string;
  price: string;
  attemptsAllowed: string;
  randomizeQuestions: boolean;
};

export type TryoutFormProps =
  | { mode: "create-parent" }
  | { mode: "create-child"; packageId: string }
  | { mode: "edit-parent"; examId: string; initialData: TryoutParentFormValues }
  | { mode: "view"; initialData: TryoutFormValues };
