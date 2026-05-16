import type {
  ExamPackageDetailResponse,
  ExamPackageDetailSubExamView,
} from "./types";

export function mapSubExamsForView(
  payload: ExamPackageDetailResponse,
): ExamPackageDetailSubExamView[] {
  return payload.subExams.map((subExam) => ({
    id: String(subExam.id),
    title: subExam.name,
    totalQuestions: subExam.totalSoal,
    passingGrade: subExam.passingGrade,
  }));
}
