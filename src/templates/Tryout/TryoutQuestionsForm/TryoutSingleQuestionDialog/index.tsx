"use client";

import { useCallback, useMemo, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { getDefaultQuestionItem } from "../getDefaultQuestionItem";
import TryoutSingleQuestionForm from "../TryoutSingleQuestionForm";
import TryoutSingleQuestionDialogFooter from "./TryoutSingleQuestionDialogFooter";
import {
  type TryoutSingleQuestionDialogProps,
  tryoutSingleQuestionFormId,
} from "./tryoutSingleQuestionDialogTypes";

export default function TryoutSingleQuestionDialog({
  open,
  onOpenChange,
  mode,
  orderInExam,
  initialValues,
  onSubmitMock,
}: TryoutSingleQuestionDialogProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const formInitialValues = useMemo(() => {
    if (mode === "edit" && initialValues) {
      return initialValues;
    }
    return getDefaultQuestionItem(orderInExam);
  }, [mode, initialValues, orderInExam]);

  const handleClose = useCallback(() => {
    onOpenChange(false);
    setSubmitError(null);
  }, [onOpenChange]);

  const handleSubmit = useCallback(
    (item: Parameters<typeof onSubmitMock>[0]) => {
      onSubmitMock(item);
      handleClose();
    },
    [handleClose, onSubmitMock],
  );

  const title = mode === "create" ? "Tambah Soal" : "Edit Soal";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto sm:max-w-3xl"
      >
        <DialogHeader>
          <DialogTitle className="text-h4 text-neutral-6">{title}</DialogTitle>
        </DialogHeader>

        <TryoutSingleQuestionForm
          mode={mode}
          formId={tryoutSingleQuestionFormId}
          initialValues={formInitialValues}
          onSubmit={handleSubmit}
          setSubmitError={setSubmitError}
        />

        {submitError ? <p className="text-b2 text-red">{submitError}</p> : null}

        <TryoutSingleQuestionDialogFooter
          formId={tryoutSingleQuestionFormId}
          onCancel={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
}
