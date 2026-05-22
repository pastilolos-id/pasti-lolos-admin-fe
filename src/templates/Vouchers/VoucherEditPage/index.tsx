"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";

import { getVoucherMockById } from "@/lib/vouchers/getVoucherMockById";
import { mapVoucherFormToUpdatePayload } from "@/lib/vouchers/mapVoucherFormToUpdatePayload";
import { mapVoucherRowToFormValues } from "@/lib/vouchers/mapVoucherRowToFormValues";
import VoucherForm from "@/templates/Vouchers/VoucherForm";
import type { VoucherFormValues } from "@/templates/Vouchers/VoucherForm/voucherFormTypes";
import TryoutFormBackLink from "@/templates/Tryout/TryoutForm/TryoutFormHeader/TryoutFormBackLink";
import VoucherEditPageHeader from "./VoucherEditPageHeader";
import VoucherEditSaveConfirmDialog from "./VoucherEditSaveConfirmDialog";
import VoucherEditSuccessDialog from "./VoucherEditSuccessDialog";

export default function VoucherEditPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const voucherId = params?.id ?? "";

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const pendingValuesRef = useRef<VoucherFormValues | null>(null);

  const voucherRow = useMemo(
    () => (voucherId ? getVoucherMockById(voucherId) : undefined),
    [voucherId],
  );

  const initialValues = useMemo(
    () => (voucherRow ? mapVoucherRowToFormValues(voucherRow) : null),
    [voucherRow],
  );

  const handleFormSubmit = useCallback((values: VoucherFormValues) => {
    pendingValuesRef.current = values;
    setConfirmOpen(true);
  }, []);

  const handleConfirmSave = useCallback(() => {
    const values = pendingValuesRef.current;
    if (!values) {
      return;
    }
    const payload = mapVoucherFormToUpdatePayload(values);
    console.log("[VoucherEditPage mock update]", { id: voucherId, payload });
    setSuccessOpen(true);
  }, [voucherId]);

  const handleCloseToList = useCallback(() => {
    router.push("/vouchers");
  }, [router]);

  if (!voucherId) {
    return (
      <section className="rounded-card-medium border border-neutral-3 bg-neutral-1 p-6">
        <p className="text-b2 text-neutral-6">ID voucher tidak valid.</p>
      </section>
    );
  }

  if (!voucherRow || !initialValues) {
    return (
      <div className="space-y-4">
        <TryoutFormBackLink href="/vouchers" />
        <section className="rounded-card-medium border border-neutral-3 bg-neutral-1 p-6">
          <p className="text-b2 text-neutral-6">Voucher tidak ditemukan.</p>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="space-y-6 rounded-card-medium border border-neutral-3 bg-neutral-1 p-4 sm:p-6">
        <VoucherEditPageHeader />
        <VoucherForm
          mode="edit"
          voucherId={voucherId}
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
        />
      </section>

      <VoucherEditSaveConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={handleConfirmSave}
      />

      <VoucherEditSuccessDialog
        open={successOpen}
        onOpenChange={setSuccessOpen}
        onCloseToList={handleCloseToList}
      />
    </div>
  );
}
