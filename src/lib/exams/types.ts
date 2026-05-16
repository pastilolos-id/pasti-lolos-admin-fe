export type ExamCategory = "BUMN" | "CPNS";

export type ExamApiSubject = {
  subjectName: string;
};

export type ExamApiItem = {
  id: number;
  examName: string;
  description: string;
  examType: string;
  durationMinutes: number;
  totalQuestions: number;
  subject: ExamApiSubject;
  _count: {
    examQuestions: number;
  };
  price: number;
  jumlahSoal: number;
};

export type ExamsListMeta = {
  total: number;
  page: number;
  lastPage: number;
  limit: number;
};

export type ExamsListResponse = {
  data: ExamApiItem[];
  meta: ExamsListMeta;
};

export type ExamsListParams = {
  category: ExamCategory;
};
