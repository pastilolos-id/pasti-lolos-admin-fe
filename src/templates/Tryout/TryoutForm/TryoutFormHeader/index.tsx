"use client";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TryoutFormMode } from "../tryoutFormTypes";
import TryoutFormBackLink from "./TryoutFormBackLink";

type TryoutFormHeaderProps = {
  mode: TryoutFormMode;
  onDeleteClick?: () => void;
};

export default function TryoutFormHeader({
  mode,
  onDeleteClick,
}: TryoutFormHeaderProps) {
  const title = mode === "create" ? "Buat Tryout Baru" : "Detail Tryout";
  const showDelete = mode === "edit";

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "flex items-start gap-3",
          showDelete ? "justify-between" : "justify-start",
        )}
      >
        <TryoutFormBackLink />
        {showDelete ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-10 shrink-0 rounded-full border border-red/30 bg-red/10 text-red hover:bg-red/15 hover:text-red"
            aria-label="Hapus tryout"
            onClick={onDeleteClick}
          >
            <Trash2 className="size-5" />
          </Button>
        ) : null}
      </div>
      <h1 className="text-h3 font-bold text-neutral-6">{title}</h1>
    </div>
  );
}
