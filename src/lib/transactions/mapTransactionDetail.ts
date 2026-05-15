import { getPaymentMethodConfigByLabel } from "@/lib/constants/paymentMethods";
import type { TransactionDetail } from "@/templates/Transactions/TransactionDetailPage/transactionDetailTypes";

import { mapApiStatusToDisplay } from "./mapTransaction";
import type { TransactionDetailResponse } from "./types";

const dateTimeFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function parsePrice(value: string | number): number {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatTransactionTimeLabel(dateIso: string): string {
  const date = new Date(dateIso);
  if (Number.isNaN(date.getTime())) {
    return dateIso;
  }

  const parts = dateTimeFormatter.formatToParts(date);
  const day = parts.find((part) => part.type === "day")?.value ?? "";
  const month = parts.find((part) => part.type === "month")?.value ?? "";
  const year = parts.find((part) => part.type === "year")?.value ?? "";
  const hour = parts.find((part) => part.type === "hour")?.value ?? "";
  const minute = parts.find((part) => part.type === "minute")?.value ?? "";

  return `Tgl : ${day} ${month} ${year}, Jam ${hour}:${minute}`;
}

function getPrimaryPayment(api: TransactionDetailResponse) {
  if (api.payments.length === 0) {
    return null;
  }

  return [...api.payments].sort(
    (a, b) =>
      new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime(),
  )[0];
}

export function mapTransactionDetailResponseToUi(
  api: TransactionDetailResponse,
  routeTransactionId: string,
): TransactionDetail {
  const firstItem = api.items[0];
  const primaryPayment = getPrimaryPayment(api);
  const paymentMethodLabel = primaryPayment?.paymentMethod?.trim() || "-";
  const isQris = paymentMethodLabel.toLowerCase() === "qris";
  const paymentConfig = getPaymentMethodConfigByLabel(paymentMethodLabel);
  const proofUrl = primaryPayment?.receiptUrl?.trim() || null;
  const transactionCode = primaryPayment?.transactionId?.trim() || "-";

  return {
    id: primaryPayment?.transactionId?.trim() || routeTransactionId,
    orderId: api.orderId,
    title: firstItem?.itemName ?? "-",
    transactionCode,
    provider: paymentMethodLabel,
    providerLogo:
      paymentMethodLabel.replace(/^Bank\s+/i, "") || paymentMethodLabel,
    paymentMethodLabel,
    accountNumber: isQris ? "-" : (paymentConfig?.accountNumber ?? "-"),
    accountName: isQris ? "-" : (paymentConfig?.accountName ?? "-"),
    transactionTime: formatTransactionTimeLabel(api.tanggalTransaksi),
    detailStatus: mapApiStatusToDisplay(api.paymentStatus),
    proofUrl,
    hasProof: Boolean(proofUrl),
    originalPrice: parsePrice(api.totalAmount),
    discount: parsePrice(api.discountAmount),
    price: parsePrice(api.grandTotal),
    notes: api.notes,
  };
}
