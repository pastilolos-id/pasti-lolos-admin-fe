"use client";

import { Button } from "@/components/ui/button";

import type { TryoutFormMode } from "../tryoutFormTypes";

type TryoutFormFooterProps = {
  mode: TryoutFormMode;
  /** Mode edit: validasi + dialog konfirmasi di parent; bukan submit langsung. */
  onSaveClick?: () => void;
};

export default function TryoutFormFooter({
  mode,
  onSaveClick,
}: TryoutFormFooterProps) {
  if (mode === "view") {
    return null;
  }

  if (mode === "edit" && onSaveClick) {
    return (
      <Button
        type="button"
        variant="primary"
        className="h-12 w-full rounded-2xl text-base font-bold text-white shadow-none"
        onClick={onSaveClick}
      >
        Simpan
      </Button>
    );
  }

  return (
    <Button
      type="submit"
      variant="primary"
      className="h-12 w-full rounded-2xl text-base font-bold text-white shadow-none"
    >
      Simpan
    </Button>
  );
}
