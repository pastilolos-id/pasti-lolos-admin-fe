"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

type TryoutQuestionAddButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

export default function TryoutQuestionAddButton({
  onClick,
  disabled = false,
}: TryoutQuestionAddButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      disabled={disabled}
      onClick={onClick}
      className="w-full rounded-full border-primary-4/50 px-6 py-3 text-s1 sm:w-auto"
    >
      <Plus className="size-4" />
      Tambah Pertanyaan
    </Button>
  );
}
