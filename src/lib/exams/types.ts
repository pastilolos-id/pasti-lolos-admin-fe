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

export type ExamPackageDetailSubExam = {
  id: number;
  name: string;
  totalSoal: number;
  passingGrade: string;
  duration: number;
  userExamId: number | null;
  status: "submitted" | "not_started" | "in_progress";
  score?: number;
};

export type ExamPackageDetailResponse = {
  id: number;
  examName: string;
  description: string;
  price: number;
  isPurchased?: boolean;
  purchaseStatus?: "available" | "pending" | "completed";
  pendingOrderId?: number | null;
  totalDuration: number;
  totalQuestions: number;
  subject: string;
  subExams: ExamPackageDetailSubExam[];
  totalPassingScore?: number;
};

export type ExamPackageDetailSubExamView = {
  id: string;
  title: string;
  totalQuestions: number;
  passingGrade: string;
};
