export type MockQuestionOption = {
  id: number;
  label: string;
  text: string;
  isCorrect: boolean;
};

export type MockQuestion = {
  order: number;
  questionId: number;
  questionText: string;
  imageUrl?: string;
  explanation: string;
  options: MockQuestionOption[];
  /** Initial selected option for slicing demo */
  initialSelectedOptionId?: number | null;
};

export type MockTryoutExamQuestions = {
  examName: string;
  questions: MockQuestion[];
};

function makeOptions(
  texts: [string, string, string, string],
  correctIndex: 0 | 1 | 2 | 3,
  baseId: number,
): MockQuestionOption[] {
  const labels = ["A", "B", "C", "D"] as const;
  return texts.map((text, idx) => ({
    id: baseId + idx + 1,
    label: labels[idx],
    text,
    isCorrect: idx === correctIndex,
  }));
}

export const MOCK_TRYOUT_EXAM_QUESTIONS: MockTryoutExamQuestions = {
  examName: "Tryout CPNS - Tes Wawasan Kebangsaan",
  questions: [
    {
      order: 1,
      questionId: 101,
      questionText:
        "Pancasila sebagai dasar negara Indonesia pertama kali dirumuskan oleh...",
      explanation:
        "Pancasila dirumuskan oleh BPUPKI pada sidang pertama tanggal 1 Juni 1945, yang kemudian diperingati sebagai hari lahir Pancasila.",
      options: makeOptions(
        ["Soekarno", "Mohammad Hatta", "Soepomo", "Ki Hajar Dewantara"],
        0,
        1000,
      ),
      initialSelectedOptionId: 1001,
    },
    {
      order: 2,
      questionId: 102,
      questionText:
        "Berikut yang termasuk dalam sila kelima Pancasila adalah...",
      explanation:
        "Sila kelima berbunyi 'Keadilan sosial bagi seluruh rakyat Indonesia' yang menekankan pemerataan hak dan kesejahteraan.",
      options: makeOptions(
        [
          "Persatuan Indonesia",
          "Kemanusiaan yang adil dan beradab",
          "Keadilan sosial bagi seluruh rakyat Indonesia",
          "Kerakyatan yang dipimpin oleh hikmat kebijaksanaan",
        ],
        2,
        1010,
      ),
      initialSelectedOptionId: 1013,
    },
    {
      order: 3,
      questionId: 103,
      questionText: "UUD 1945 setelah amandemen terdiri dari...",
      explanation:
        "Setelah amandemen, UUD 1945 terdiri dari Pembukaan, Batang Tubuh, dan Aturan Peralihan serta Tambahan.",
      options: makeOptions(
        [
          "Pembukaan dan Batang Tubuh saja",
          "Pembukaan, Batang Tubuh, dan Penjelasan UUD",
          "Pembukaan, Batang Tubuh, serta Aturan Peralihan dan Tambahan",
          "Batang Tubuh dan Penjelasan UUD saja",
        ],
        2,
        1020,
      ),
      initialSelectedOptionId: 1022,
    },
    {
      order: 4,
      questionId: 104,
      questionText:
        "Perhatikan diagram berikut yang menunjukkan alur proses legislasi di Indonesia.",
      imageUrl:
        "https://placehold.co/600x240/e8f0ff/1a56db?text=Diagram+Legislasi",
      explanation:
        "Rancangan undang-undang diajukan oleh DPR bersama Presiden, dibahas bersama, lalu disahkan menjadi UU.",
      options: makeOptions(
        [
          "Presiden → DPR → Mahkamah Konstitusi",
          "DPR dan Presiden → Pembahasan bersama → Pengesahan",
          "MPR → Presiden → DPR",
          "DPR → Presiden → MPR",
        ],
        1,
        1030,
      ),
      initialSelectedOptionId: null,
    },
    {
      order: 5,
      questionId: 105,
      questionText: "Asas negara hukum (rule of law) mengandung makna bahwa...",
      explanation:
        "Dalam negara hukum, setiap tindakan negara dan warga berdasarkan hukum yang berlaku umum.",
      options: makeOptions(
        [
          "Kekuasaan tertinggi berada pada penguasa",
          "Hukum hanya berlaku bagi rakyat jelata",
          "Segala hal diatur dan dibatasi oleh hukum",
          "Hukum dapat diabaikan demi kepentingan penguasa",
        ],
        2,
        1040,
      ),
      initialSelectedOptionId: null,
    },
    {
      order: 6,
      questionId: 106,
      questionText: "Hak asasi manusia yang bersifat non-derogable artinya...",
      explanation:
        "Hak non-derogable tidak dapat dikurangi atau diabaikan dalam keadaan apa pun, termasuk darurat.",
      options: makeOptions(
        [
          "Dapat dibatasi sewaktu-waktu oleh pemerintah",
          "Hanya berlaku pada masa damai",
          "Tidak dapat dikurangi dalam keadaan darurat",
          "Hanya dimiliki oleh warga negara",
        ],
        2,
        1050,
      ),
      initialSelectedOptionId: null,
    },
    {
      order: 7,
      questionId: 107,
      questionText: "Otonomi daerah di Indonesia bertujuan untuk...",
      explanation:
        "Otonomi daerah memberi kewenangan kepada daerah untuk mengatur dan mengurus urusan pemerintahan sendiri.",
      options: makeOptions(
        [
          "Memperkuat sentralisasi kekuasaan",
          "Memberi kewenangan daerah mengatur urusan pemerintahan",
          "Menghapus perbedaan antardaerah",
          "Membatasi partisipasi masyarakat lokal",
        ],
        1,
        1060,
      ),
      initialSelectedOptionId: null,
    },
    {
      order: 8,
      questionId: 108,
      questionText:
        "Komisi Yudisial berwenang mengusulkan calon Hakim Agung kepada...",
      explanation:
        "Komisi Yudisial mengusulkan calon Hakim Agung kepada DPR untuk disetujui, lalu ditetapkan oleh Presiden.",
      options: makeOptions(
        ["Presiden secara langsung", "Mahkamah Agung", "DPR", "MPR"],
        2,
        1070,
      ),
      initialSelectedOptionId: null,
    },
    {
      order: 9,
      questionId: 109,
      questionText: "Prinsip demokrasi Pancasila menekankan pada...",
      explanation:
        "Demokrasi Pancasila berakar pada musyawarah untuk mufakat dan nilai gotong royong.",
      options: makeOptions(
        [
          "Musyawarah untuk mufakat",
          "Voting mayoritas semata",
          "Kekuasaan individu",
          "Oligarki elit politik",
        ],
        0,
        1080,
      ),
      initialSelectedOptionId: null,
    },
    {
      order: 10,
      questionId: 110,
      questionText:
        "Bhinneka Tunggal Ika tercantum pada lambang negara Indonesia yaitu...",
      explanation:
        "Semboyan Bhinneka Tunggal Ika terdapat pada pita di lambang Garuda Pancasila.",
      options: makeOptions(
        [
          "Bendera Merah Putih",
          "Garuda Pancasila",
          "UUD 1945",
          "Lagu Indonesia Raya",
        ],
        1,
        1090,
      ),
      initialSelectedOptionId: null,
    },
  ],
};

export function buildInitialSelectedByQuestionId(
  questions: MockQuestion[],
): Record<number, number | null> {
  const result: Record<number, number | null> = {};
  for (const q of questions) {
    result[q.questionId] = q.initialSelectedOptionId ?? null;
  }
  return result;
}
