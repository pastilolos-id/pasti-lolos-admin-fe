"use client";

import { useMemo } from "react";
import type { IconProps } from "@/components/Icon";
import ActionDialogLayout, {
  type ActionDialogAction,
  type ActionDialogTone,
} from "@/components/ActionDialogLayout";

export type TryoutFormActionDialogKind =
  | "create-success"
  | "edit-save"
  | "delete"
  | null;

export type CreateSuccessVariant = "parent" | "child";

type TryoutFormActionDialogsProps = {
  active: TryoutFormActionDialogKind;
  createSuccessVariant?: CreateSuccessVariant;
  onActiveChange: (next: TryoutFormActionDialogKind) => void;
  onCreateSuccessClose: () => void;
  onCreateSuccessAddNew: () => void;
  onEditSaveConfirm: () => void;
  onDeleteConfirm: () => void;
};

function buildLayout(
  active: TryoutFormActionDialogKind,
  createSuccessVariant: CreateSuccessVariant,
  onActiveChange: (next: TryoutFormActionDialogKind) => void,
  onCreateSuccessClose: () => void,
  onCreateSuccessAddNew: () => void,
  onEditSaveConfirm: () => void,
  onDeleteConfirm: () => void,
): {
  tone: ActionDialogTone;
  iconName: IconProps["name"];
  message: string;
  actions: ActionDialogAction[];
} | null {
  const close = () => onActiveChange(null);

  if (active === "create-success") {
    const isParent = createSuccessVariant === "parent";
    return {
      tone: "success",
      iconName: "tryout",
      message: isParent
        ? "Paket tryout sudah berhasil dibuat"
        : "Tryout sudah berhasil ditambahkan",
      actions: [
        {
          label: "OK",
          appearance: "solid",
          onClick: () => {
            close();
            onCreateSuccessClose();
          },
        },
        {
          label: isParent ? "Tambah Paket Tryout" : "Tambah Tryout",
          appearance: "outline",
          onClick: () => {
            close();
            onCreateSuccessAddNew();
          },
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
  createSuccessVariant = "parent",
  onActiveChange,
  onCreateSuccessClose,
  onCreateSuccessAddNew,
  onEditSaveConfirm,
  onDeleteConfirm,
}: TryoutFormActionDialogsProps) {
  const layout = useMemo(
    () =>
      buildLayout(
        active,
        createSuccessVariant,
        onActiveChange,
        onCreateSuccessClose,
        onCreateSuccessAddNew,
        onEditSaveConfirm,
        onDeleteConfirm,
      ),
    [
      active,
      createSuccessVariant,
      onActiveChange,
      onCreateSuccessClose,
      onCreateSuccessAddNew,
      onEditSaveConfirm,
      onDeleteConfirm,
    ],
  );

  if (!layout) {
    return null;
  }

  return (
    <ActionDialogLayout
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
