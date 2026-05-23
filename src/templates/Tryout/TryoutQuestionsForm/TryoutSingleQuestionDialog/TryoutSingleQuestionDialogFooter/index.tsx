"use client";

import { Button } from "@/components/ui/button";

type TryoutSingleQuestionDialogFooterProps = {
  formId: string;
  onCancel: () => void;
};

export default function TryoutSingleQuestionDialogFooter({
  formId,
  onCancel,
}: TryoutSingleQuestionDialogFooterProps) {
  return (
    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className="rounded-full border-primary-4/50 px-6"
      >
        Batal
      </Button>
      <Button
        type="submit"
        form={formId}
        variant="primary"
        className="rounded-full px-6"
      >
        Simpan
      </Button>
    </div>
  );
}
