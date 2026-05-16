/**
 * Domain Tryout admin — daftar paket tryout.
 *
 * Integrasi BE:
 * - GET /exams?category=BUMN|CPNS — daftar tryout (filter examType tryout di FE).
 * - Stats kartu atas masih mock hingga endpoint stats tersedia.
 */

/** Instansi paket — selaras filter "Instansi" di UI. */
export type TryoutInstitution = "BUMN" | "CPNS";

/** Satu baris daftar tryout di grid kartu. */
export type TryoutListItem = {
  id: string;
  title: string;
  questionCount: number;
  durationMinutes: number;
  institution: TryoutInstitution;
  /** Harga tampil utama (IDR). */
  price: number;
  /** Jika diisi bersama originalPrice, tampil sebagai "Harga Spesial". */
  specialPrice?: number;
  originalPrice?: number;
  /** Nanti: URL atau path ke form edit tryout. */
  editHref?: string;
};

/** Data kartu ringkasan "Jumlah Soal" di atas daftar. */
export type TryoutPageStats = {
  /** Label metrik (contoh: "Jumlah Soal"). */
  label: string;
  /** Angka tampil (bisa string agar mempertahankan format "10.000"). */
  totalQuestionsDisplay: string;
  /** Teks tren (contoh: "7% vs bulan sebelumnya"). */
  trendLabel: string;
  /** Persen untuk aksesibilitas / tooltip; bisa dari BE. */
  trendPercent: number;
};

/** State filter daftar tryout. */
export type TryoutListFilters = {
  search: string;
  institution: TryoutInstitution;
};
