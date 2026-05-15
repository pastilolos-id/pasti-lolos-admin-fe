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

export type VerifyPaymentRequest = {
  status: "completed";
};

export type VerifyPaymentResponse = {
  success: boolean;
  message: string;
};

export type RejectTransactionRequest = {
  rejectionReason?: string;
};

export type RejectTransactionData = {
  orderId: number;
  namaUser: string;
  emailUser: string;
  itemName: string;
  itemType: TransactionApiItemType;
  grandTotal: number;
  paymentStatus: string;
  orderStatus: string;
  rejectionReason: string | null;
  ditolakPada: string;
};

export type RejectTransactionResponse = {
  success: boolean;
  message: string;
  data: RejectTransactionData;
};

export type TransactionDetailItemApi = {
  id: number;
  itemType: TransactionApiItemType;
  itemId: number;
  itemName: string;
  pricePerItem: string | number;
  totalPrice: string | number;
};

export type TransactionDetailPaymentApi = {
  id: number;
  paymentStatus: string;
  receiptUrl: string | null;
  paymentDate: string;
  transactionId: string;
  amount: string | number;
  paymentMethod: string;
};

export type TransactionDetailResponse = {
  orderId: number;
  namaUser: string;
  emailUser: string;
  profilePicture: string | null;
  orderStatus: string;
  paymentStatus: TransactionApiStatus | string;
  totalAmount: number;
  discountAmount: number;
  grandTotal: number;
  couponCode: string | null;
  tanggalTransaksi: string;
  items: TransactionDetailItemApi[];
  payments: TransactionDetailPaymentApi[];
  notes: string | null;
};
