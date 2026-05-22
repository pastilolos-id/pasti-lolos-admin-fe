"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { mapVoucherFormToCreatePayload } from "@/lib/vouchers/mapVoucherFormToCreatePayload";
import VoucherForm from "@/templates/Vouchers/VoucherForm";
import type { VoucherFormValues } from "@/templates/Vouchers/VoucherForm/voucherFormTypes";
import VoucherCreatePageHeader from "./VoucherCreatePageHeader";
import VoucherCreateSuccessDialog from "./VoucherCreateSuccessDialog";

export default function VoucherCreatePage() {
  const router = useRouter();
  const [formKey, setFormKey] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = useCallback((values: VoucherFormValues) => {
    const payload = mapVoucherFormToCreatePayload(values);
    console.log("[VoucherCreatePage mock create]", payload);
    setDialogOpen(true);
  }, []);

  const handleCloseToList = useCallback(() => {
    router.push("/vouchers");
  }, [router]);

  const handleAddAnother = useCallback(() => {
    setFormKey((k) => k + 1);
  }, []);

  return (
    <div className="space-y-6">
      <section className="space-y-6 rounded-card-medium border border-neutral-3 bg-neutral-1 p-4 sm:p-6">
        <VoucherCreatePageHeader />
        <VoucherForm mode="create" formKey={formKey} onSubmit={handleSubmit} />
      </section>

      <VoucherCreateSuccessDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onCloseToList={handleCloseToList}
        onAddAnother={handleAddAnother}
      />
    </div>
  );
}
