export type ExamStatus = "draft" | "published" | "closed" | "archived";

export type CreateExamRequest = {
  examName: string;
  description?: string;
  subjectId: string;
  durationMinutes: string;
  examType: "tryout";
  status?: ExamStatus;
  passingScore?: string;
  price?: string;
  attemptsAllowed?: string;
  randomizeQuestions?: boolean;
  packageId?: string;
};
