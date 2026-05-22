"use client";

import ActionDialogLayout, {
  type ActionDialogAction,
} from "@/components/ActionDialogLayout";

type VoucherCreateSuccessDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCloseToList: () => void;
  onAddAnother: () => void;
};

export default function VoucherCreateSuccessDialog({
  open,
  onOpenChange,
  onCloseToList,
  onAddAnother,
}: VoucherCreateSuccessDialogProps) {
  const close = () => onOpenChange(false);

  const actions: ActionDialogAction[] = [
    {
      label: "OK",
      appearance: "solid",
      onClick: () => {
        close();
        onCloseToList();
      },
    },
    {
      label: "Tambah Voucher",
      appearance: "outline",
      onClick: () => {
        close();
        onAddAnother();
      },
    },
  ];

  return (
    <ActionDialogLayout
      open={open}
      onOpenChange={onOpenChange}
      tone="success"
      iconName="discount"
      message="Voucher berhasil dibuat"
      actions={actions}
    />
  );
}
