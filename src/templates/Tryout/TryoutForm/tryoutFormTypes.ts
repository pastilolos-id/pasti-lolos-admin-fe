import type { TryoutInstitution } from "../types";

/** Mode halaman — menentukan judul, aksi header/footer, dan interaksi field. */
export type TryoutFormMode = "create" | "edit" | "view";

/** Tipe ujian (label UI: Simulasi / Real). */
export type TryoutFormExamType = "simulation" | "real";

/**
 * Bentuk nilai form tryout (mock / nanti payload BE).
 * TODO: selaraskan dengan kontrak API `GET/PATCH/POST /admin/tryouts` saat tersedia.
 */
export type TryoutFormValues = {
  examName: string;
  /** Kosong string = belum memilih (placeholder "Pilih"). */
  category: TryoutInstitution | "";
  /** Contoh tampilan: "110 Menit". */
  durationDisplay: string;
  startTime: string;
  endTime: string;
  totalQuestions: string;
  passingGrade: string;
  attempts: string;
  examType: TryoutFormExamType | "";
  /** Angka mentah tanpa "Rp." — tampilan prefix di komponen currency. */
  priceAmount: string;
  /** ISO `yyyy-MM-dd` atau string kosong. */
  deadline: string;
  description: string;
  notes: string;
};
