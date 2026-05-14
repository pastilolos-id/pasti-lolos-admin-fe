/**
 * Domain Tryout admin — daftar paket tryout.
 *
 * Rencana integrasi BE (contoh):
 * - GET /admin/tryouts?q=&institution= — daftar + filter (query selaras search + institution).
 * - GET /admin/tryouts/stats — agregat "Jumlah Soal" + metrik tren untuk kartu statistik.
 * - Field `editHref` / `createHref` diisi dari konfigurasi route admin setelah endpoint create/update tersedia.
 */

/** Instansi paket — selaras filter "Instansi" di UI. */
export type TryoutInstitution = "BUMN" | "CPNS";

/** Nilai filter toolbar (termasuk "semua"). */
export type TryoutInstitutionFilter = "all" | TryoutInstitution;

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

/** State filter klien sebelum integrasi API. */
export type TryoutListFilters = {
  search: string;
  institution: TryoutInstitutionFilter;
};
