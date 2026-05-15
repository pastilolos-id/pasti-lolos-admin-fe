export type TransactionApiStatus = "pending" | "failed" | "paid";

export type TransactionApiItemType = "question_bank" | "exam" | "course";

export type TransactionApiItem = {
  no: number;
  orderId: number;
  nama: string;
  email: string;
  profilePicture: string | null;
  buktiTransfer: string | null;
  tanggalTransaksi: string;
  harga: number;
  status: TransactionApiStatus;
  itemType: TransactionApiItemType;
  itemName: string;
  transactionId: string;
};

export type TransactionsListMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type TransactionsListResponse = {
  data: TransactionApiItem[];
  meta: TransactionsListMeta;
};

export type TransactionsListParams = {
  type?: TransactionApiItemType;
  status?: TransactionApiStatus;
  search?: string;
  page?: number;
  limit?: number;
};

export type TransactionsSummaryMetric = {
  value: number;
  changePercent: number;
};

export type TransactionsSummaryResponse = {
  totalTransaksi: TransactionsSummaryMetric;
  transaksiSukses: TransactionsSummaryMetric;
  transaksiPending: TransactionsSummaryMetric;
};
