"use client";

import type { IconProps } from "@/components/Icon";
import Icon from "@/components/Icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type TryoutFormActionDialogTone = "primary" | "destructive" | "success";

export type TryoutFormActionDialogAction = {
  label: string;
  onClick: () => void;
  /** Solid putih (utama) atau outline putih (batal). */
  appearance: "solid" | "outline";
};

type TryoutFormActionDialogLayoutProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tone: TryoutFormActionDialogTone;
  iconName: IconProps["name"];
  message: string;
  actions: TryoutFormActionDialogAction[];
};

const toneClass: Record<TryoutFormActionDialogTone, string> = {
  primary: "bg-primary-4",
  destructive: "bg-red",
  success: "bg-green",
};

export default function TryoutFormActionDialogLayout({
  open,
  onOpenChange,
  tone,
  iconName,
  message,
  actions,
}: TryoutFormActionDialogLayoutProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "w-91 max-w-[calc(100vw-2rem)] gap-0 border-0 bg-transparent p-0 shadow-none",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        )}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogTitle className="sr-only">{message}</DialogTitle>
        <DialogDescription className="sr-only">{message}</DialogDescription>
        <div
          className={cn(
            "flex flex-col rounded-[44px] p-6 shadow-lg",
            "text-center text-white",
            toneClass[tone],
          )}
        >
          <div className="flex justify-center">
            <Icon
              name={iconName}
              size={40}
              className="size-10 shrink-0 text-white"
              pathClassName="fill-white"
            />
          </div>
          <p className="mt-4 text-b3 text-white">{message}</p>
          <div className="mt-6 flex w-full flex-col gap-6 sm:flex-row sm:justify-center">
            {actions.map((action) => (
              <Button
                key={action.label}
                type="button"
                variant="default"
                onClick={action.onClick}
                className={cn(
                  "min-h-0 flex-1 rounded-full px-4 text-sm font-semibold",
                  "py-2",
                  action.appearance === "solid" &&
                    "border-0 bg-white text-neutral-6 hover:bg-white/90 hover:text-neutral-6",
                  action.appearance === "outline" &&
                    "border-2 border-white bg-transparent text-white hover:bg-white/10 hover:text-white",
                )}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
