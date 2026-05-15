"use client";

import { Check, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";

import Icon from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { parseTransactionApiError } from "@/lib/transactions/parseTransactionApiError";
import {
  useRejectTransactionMutation,
  useVerifyPaymentMutation,
} from "@/lib/transactions/transactionsQuery";
import { cn } from "@/lib/utils";
import TryoutFormActionDialogLayout, {
  type TryoutFormActionDialogAction,
} from "@/templates/Tryout/TryoutForm/TryoutFormActionDialogs/TryoutFormActionDialogLayout";
import type { TransactionDisplayStatus } from "../types";

type ConfirmKind = "reject" | "approve" | null;

type FeedbackState = {
  kind: "success" | "error";
  message: string;
} | null;

export type TransactionActionsCellProps = {
  id: string;
  orderId: number;
  displayStatus: TransactionDisplayStatus;
  transactionCode: string;
  buyerEmail: string;
  priceDisplay: string;
};

export function TransactionActionsCell({
  id,
  orderId,
  displayStatus,
  transactionCode,
  buyerEmail,
  priceDisplay,
}: TransactionActionsCellProps) {
  const [confirm, setConfirm] = useState<ConfirmKind>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const titleId = useId();
  const descId = useId();
  const rejectionReasonId = useId();

  const isPending = displayStatus === "menunggu";

  const { mutateAsync: verifyPayment, isPending: isVerifyPending } =
    useVerifyPaymentMutation();
  const { mutateAsync: rejectTransaction, isPending: isRejectPending } =
    useRejectTransactionMutation();

  const isMutationPending = isVerifyPending || isRejectPending;

  const closeConfirm = useCallback(() => {
    setConfirm(null);
    setRejectionReason("");
  }, []);

  const closeFeedback = useCallback(() => {
    setFeedback(null);
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isMutationPending) {
        closeConfirm();
      }
    },
    [closeConfirm, isMutationPending],
  );

  useEffect(() => {
    if (!confirm) {
      return;
    }
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [confirm, onKeyDown]);

  const detailHref = `/transactions/${encodeURIComponent(id)}`;

  const handleApprove = async () => {
    try {
      const res = await verifyPayment({
        orderId,
        body: { status: "completed" },
      });
      closeConfirm();
      setFeedback({ kind: "success", message: res.message });
    } catch (err) {
      closeConfirm();
      setFeedback({
        kind: "error",
        message: parseTransactionApiError(err),
      });
    }
  };

  const handleReject = async () => {
    const trimmed = rejectionReason.trim();
    const body = trimmed ? { rejectionReason: trimmed } : {};

    try {
      const res = await rejectTransaction({ orderId, body });
      closeConfirm();
      setFeedback({ kind: "success", message: res.message });
    } catch (err) {
      closeConfirm();
      setFeedback({
        kind: "error",
        message: parseTransactionApiError(err),
      });
    }
  };

  const feedbackActions: TryoutFormActionDialogAction[] = [
    {
      label: "OK",
      appearance: "solid",
      onClick: closeFeedback,
    },
  ];

  return (
    <TooltipProvider delayDuration={0}>
      <div className="contents">
        <div className="flex items-center justify-center gap-1.5 sm:gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon-xs"
                className="size-8 shrink-0 rounded-full bg-[#80B0FF]/25 text-[#448AFF] hover:bg-[#80B0FF]/40 sm:size-9"
                asChild
              >
                <Link href={detailHref} aria-label="Lihat detail">
                  <Icon name="eye-open" size={20} className="size-5 shrink-0" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={6}>
              Lihat Detail
            </TooltipContent>
          </Tooltip>

          {isPending ? (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    className="size-8 shrink-0 rounded-full bg-[#50AD54]/18 text-[#3d8f41] hover:bg-[#50AD54]/28 sm:size-9"
                    aria-label="Approve transaksi"
                    onClick={() => setConfirm("approve")}
                  >
                    <Check className="size-4 shrink-0" strokeWidth={2.5} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={6}>
                  Approve transaksi ini
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    className="size-8 shrink-0 rounded-full bg-[#FF5649]/20 text-[#FF5649] hover:bg-[#FF5649]/30 sm:size-9"
                    aria-label="Tolak transaksi"
                    onClick={() => setConfirm("reject")}
                  >
                    <X className="size-4 shrink-0" strokeWidth={2.25} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={6}>
                  Tolak transaksi
                </TooltipContent>
              </Tooltip>
            </>
          ) : null}
        </div>

        {confirm ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
            role="presentation"
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/45 backdrop-blur-md transition-opacity"
              aria-label="Tutup"
              disabled={isMutationPending}
              onClick={closeConfirm}
            />
            <div
              className={cn(
                "relative z-10 w-full max-w-[min(100vw-2rem,22rem)] rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-black/5 sm:max-w-md",
                confirm === "approve" && "ring-[#50AD54]/25",
                confirm === "reject" && "ring-[#FF5649]/20",
              )}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descId}
            >
              {confirm === "reject" ? (
                <>
                  <h2
                    id={titleId}
                    className="text-lg font-bold tracking-tight text-neutral-6"
                  >
                    Tolak transaksi?
                  </h2>
                  <p
                    id={descId}
                    className="mt-2 text-sm leading-relaxed text-neutral-5"
                  >
                    Transaksi akan ditolak dan status pembayaran diperbarui.
                  </p>
                  <div className="mt-4">
                    <label
                      htmlFor={rejectionReasonId}
                      className="text-c1 font-medium text-neutral-5"
                    >
                      Alasan penolakan (opsional)
                    </label>
                    <Textarea
                      id={rejectionReasonId}
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Contoh: Bukti transfer tidak sesuai nominal"
                      className="mt-2 min-h-20 resize-none rounded-2xl border-[#E3E3E3] text-sm"
                      disabled={isMutationPending}
                    />
                  </div>
                  <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="w-full rounded-full font-semibold sm:w-auto"
                      disabled={isMutationPending}
                      onClick={closeConfirm}
                    >
                      Batal
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      isLoading={isRejectPending}
                      className="w-full rounded-full border-0 bg-[#FF5649] font-semibold text-white hover:bg-[#FF5649]/90 sm:w-auto"
                      disabled={isMutationPending}
                      onClick={() => void handleReject()}
                    >
                      Tolak
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <h2
                    id={titleId}
                    className="text-lg font-bold tracking-tight text-[#2e7d32]"
                  >
                    Approve transaksi?
                  </h2>
                  <p id={descId} className="mt-1 text-sm text-neutral-5">
                    Pastikan data berikut sudah sesuai sebelum menyetujui.
                  </p>
                  <dl className="mt-4 space-y-3 rounded-2xl border border-[#F0F0F0] bg-[#FAFAFA] p-4 text-sm">
                    <div>
                      <dt className="text-c1 font-medium text-neutral-5">
                        Kode transaksi
                      </dt>
                      <dd className="mt-0.5 font-semibold text-neutral-6">
                        {transactionCode}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-c1 font-medium text-neutral-5">
                        Email
                      </dt>
                      <dd className="mt-0.5 break-all font-medium text-neutral-6">
                        {buyerEmail}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-c1 font-medium text-neutral-5">
                        Nominal
                      </dt>
                      <dd className="mt-0.5 font-semibold text-neutral-6">
                        {priceDisplay}
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="w-full rounded-full font-semibold sm:w-auto"
                      disabled={isMutationPending}
                      onClick={closeConfirm}
                    >
                      Batal
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      isLoading={isVerifyPending}
                      className="w-full rounded-full border-0 bg-[#50AD54] font-semibold text-white hover:bg-[#50AD54]/90 sm:w-auto"
                      disabled={isMutationPending}
                      onClick={() => void handleApprove()}
                    >
                      Approve
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : null}

        <TryoutFormActionDialogLayout
          open={feedback !== null}
          onOpenChange={(open) => {
            if (!open) {
              closeFeedback();
            }
          }}
          tone={feedback?.kind === "success" ? "success" : "destructive"}
          iconName={feedback?.kind === "success" ? "tryout" : "slash-circle"}
          message={feedback?.message ?? ""}
          actions={feedbackActions}
        />
      </div>
    </TooltipProvider>
  );
}
