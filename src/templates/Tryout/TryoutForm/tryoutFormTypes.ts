/** Mode halaman — menentukan judul, aksi header/footer, dan interaksi field. */
export type TryoutFormMode = "create-parent" | "create-child" | "edit" | "view";

export type TryoutFormStatus = "draft" | "published" | "closed" | "archived";

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
  | { mode: "edit"; initialData: TryoutFormValues }
  | { mode: "view"; initialData: TryoutFormValues };
