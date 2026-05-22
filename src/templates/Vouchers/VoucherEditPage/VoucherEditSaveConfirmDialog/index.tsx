"use client";

import ActionDialogLayout, {
  type ActionDialogAction,
} from "@/components/ActionDialogLayout";

type VoucherEditSaveConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export default function VoucherEditSaveConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
}: VoucherEditSaveConfirmDialogProps) {
  const close = () => onOpenChange(false);

  const actions: ActionDialogAction[] = [
    {
      label: "Iya",
      appearance: "solid",
      onClick: () => {
        onConfirm();
        close();
      },
    },
    {
      label: "Tidak",
      appearance: "outline",
      onClick: close,
    },
  ];

  return (
    <ActionDialogLayout
      open={open}
      onOpenChange={onOpenChange}
      tone="primary"
      iconName="discount"
      message="Apakah kamu yakin akan menyimpan perubahan Voucher ini?"
      actions={actions}
    />
  );
}
