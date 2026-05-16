export type UpdateExamParentRequest = {
  examName?: string;
  description?: string;
  durationMinutes?: string;
  examType?: "tryout";
  price?: string;
};

export type UpdateExamResponse = {
  id: number;
  examName: string;
  description: string | null;
  subjectId: number;
  durationMinutes: number;
  examType: string;
  status: string;
  price: string;
  updatedAt: string;
};
