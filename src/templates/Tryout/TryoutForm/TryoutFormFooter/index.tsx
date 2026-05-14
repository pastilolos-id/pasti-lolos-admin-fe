"use client";

import { Button } from "@/components/ui/button";

import type { TryoutFormMode } from "../tryoutFormTypes";

type TryoutFormFooterProps = {
  mode: TryoutFormMode;
};

export default function TryoutFormFooter({ mode }: TryoutFormFooterProps) {
  if (mode === "view") {
    return null;
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
