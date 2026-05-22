"use client";

import ActionDialogLayout, {
  type ActionDialogAction,
} from "@/components/ActionDialogLayout";

type VoucherEditSuccessDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCloseToList: () => void;
};

export default function VoucherEditSuccessDialog({
  open,
  onOpenChange,
  onCloseToList,
}: VoucherEditSuccessDialogProps) {
  const actions: ActionDialogAction[] = [
    {
      label: "OK",
      appearance: "solid",
      onClick: () => {
        onOpenChange(false);
        onCloseToList();
      },
    },
  ];

  return (
    <ActionDialogLayout
      open={open}
      onOpenChange={onOpenChange}
      tone="success"
      iconName="discount"
      message="Voucher berhasil diperbarui"
      actions={actions}
    />
  );
}
