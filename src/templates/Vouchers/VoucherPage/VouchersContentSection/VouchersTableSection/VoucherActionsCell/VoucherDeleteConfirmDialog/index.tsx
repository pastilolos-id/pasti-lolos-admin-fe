"use client";

import ActionDialogLayout, {
  type ActionDialogAction,
} from "@/components/ActionDialogLayout";

type VoucherDeleteConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export default function VoucherDeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
}: VoucherDeleteConfirmDialogProps) {
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
      tone="destructive"
      iconName="slash-circle"
      message="Apakah kamu yakin akan menghapus Voucher ini?"
      actions={actions}
    />
  );
}
