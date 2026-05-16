"use client";

import { Button } from "@/components/ui/button";

import type { TryoutFormMode } from "../tryoutFormTypes";

type TryoutFormFooterProps = {
  mode: TryoutFormMode;
  isSubmitting?: boolean;
  onSaveClick?: () => void;
};

function isCreateMode(mode: TryoutFormMode): boolean {
  return mode === "create-parent" || mode === "create-child";
}

export default function TryoutFormFooter({
  mode,
  isSubmitting = false,
  onSaveClick,
}: TryoutFormFooterProps) {
  if (mode === "view") {
    return null;
  }

  if (mode === "edit-parent" && onSaveClick) {
    return (
      <Button
        type="button"
        variant="primary"
        className="h-12 w-full rounded-2xl text-base font-bold text-white shadow-none"
        onClick={onSaveClick}
        disabled={isSubmitting}
      >
        Simpan
      </Button>
    );
  }

  if (isCreateMode(mode)) {
    return (
      <Button
        type="submit"
        variant="primary"
        className="h-12 w-full rounded-2xl text-base font-bold text-white shadow-none"
        disabled={isSubmitting}
      >
        Simpan
      </Button>
    );
  }

  return null;
}
