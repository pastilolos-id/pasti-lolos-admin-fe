"use client";

import { useMemo } from "react";
import type { IconProps } from "@/components/Icon";
import TryoutFormActionDialogLayout, {
  type TryoutFormActionDialogAction,
  type TryoutFormActionDialogTone,
} from "./TryoutFormActionDialogLayout";

export type TryoutFormActionDialogKind =
  | "create-success"
  | "edit-save"
  | "delete"
  | null;

type TryoutFormActionDialogsProps = {
  active: TryoutFormActionDialogKind;
  onActiveChange: (next: TryoutFormActionDialogKind) => void;
  onEditSaveConfirm: () => void;
  onDeleteConfirm: () => void;
};

function buildLayout(
  active: TryoutFormActionDialogKind,
  onActiveChange: (next: TryoutFormActionDialogKind) => void,
  onEditSaveConfirm: () => void,
  onDeleteConfirm: () => void,
): {
  tone: TryoutFormActionDialogTone;
  iconName: IconProps["name"];
  message: string;
  actions: TryoutFormActionDialogAction[];
} | null {
  const close = () => onActiveChange(null);

  if (active === "create-success") {
    return {
      tone: "success",
      iconName: "tryout",
      message: "Tryout sudah berhasil dibuat",
      actions: [
        {
          label: "OK",
          appearance: "solid",
          onClick: close,
        },
      ],
    };
  }

  if (active === "edit-save") {
    return {
      tone: "primary",
      iconName: "exam-multiple-choice",
      message: "Apakah kamu yakin akan menyimpan perubahan Tryout ini?",
      actions: [
        {
          label: "Iya",
          appearance: "solid",
          onClick: () => {
            onEditSaveConfirm();
            close();
          },
        },
        {
          label: "Tidak",
          appearance: "outline",
          onClick: close,
        },
      ],
    };
  }

  if (active === "delete") {
    return {
      tone: "destructive",
      iconName: "slash-circle",
      message: "Apakah kamu yakin akan menghapus Tryout ini?",
      actions: [
        {
          label: "Iya",
          appearance: "solid",
          onClick: () => {
            onDeleteConfirm();
            close();
          },
        },
        {
          label: "Tidak",
          appearance: "outline",
          onClick: close,
        },
      ],
    };
  }

  return null;
}

export default function TryoutFormActionDialogs({
  active,
  onActiveChange,
  onEditSaveConfirm,
  onDeleteConfirm,
}: TryoutFormActionDialogsProps) {
  const layout = useMemo(
    () =>
      buildLayout(active, onActiveChange, onEditSaveConfirm, onDeleteConfirm),
    [active, onActiveChange, onEditSaveConfirm, onDeleteConfirm],
  );

  if (!layout) {
    return null;
  }

  return (
    <TryoutFormActionDialogLayout
      open={active !== null}
      onOpenChange={(open) => {
        if (!open) {
          onActiveChange(null);
        }
      }}
      tone={layout.tone}
      iconName={layout.iconName}
      message={layout.message}
      actions={layout.actions}
    />
  );
}
