"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";
import transferProofExample from "@/assets/img/transfer-proof-example.jpg";
import Icon from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TransferProofCellProps = {
  rowId: string;
  hasProof: boolean;
};

export function TransferProofCell({ rowId, hasProof }: TransferProofCellProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onKeyDown]);

  if (!hasProof) {
    return <span className="text-c1 text-neutral-5">—</span>;
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className={cn(
            "relative shrink-0 overflow-hidden rounded-xl bg-neutral-3 ring-1 ring-[#EEEEEE]",
            "h-11 w-9 sm:h-12 sm:w-10 md:h-13 md:w-10.5",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80B0FF]/50",
          )}
          aria-label="Buka pratinjau bukti transfer"
          onClick={() => setOpen(true)}
        >
          <Image
            src={transferProofExample}
            alt=""
            fill
            sizes="(max-width: 768px) 36px, 42px"
            className="object-cover"
            priority={false}
          />
        </button>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          className="size-9 shrink-0 rounded-full bg-primary-4 text-white hover:bg-primary-4/90 hover:text-white md:size-10"
          aria-label="Lihat bukti transfer"
          onClick={() => setOpen(true)}
        >
          <Icon
            name="eye-open"
            size={20}
            className="size-5 shrink-0 text-white"
          />
        </Button>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/45 backdrop-blur-md transition-opacity"
            aria-label="Tutup pratinjau"
            onClick={() => setOpen(false)}
          />
          <div
            className="relative z-10 flex w-full max-w-[min(100vw-2rem,22rem)] flex-col sm:max-w-[min(100vw-3rem,28rem)] md:max-w-[min(100vw-4rem,32rem)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <h2 id={titleId} className="sr-only">
              Bukti transfer {rowId}
            </h2>
            <div className="relative w-full max-h-[min(88vh,40rem)] overflow-hidden rounded-3xl bg-black/20 shadow-2xl ring-1 ring-white/20">
              <div className="relative aspect-3/4 w-full max-h-[min(88vh,40rem)] min-h-0">
                <Image
                  src={transferProofExample}
                  alt="Bukti transfer"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 512px"
                  className="object-contain"
                  priority
                />
              </div>
              <button
                type="button"
                className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-white text-neutral-6 shadow-md ring-1 ring-black/5 transition hover:bg-neutral-2 sm:top-4 sm:right-4 sm:size-10"
                aria-label="Tutup"
                onClick={() => setOpen(false)}
              >
                <X className="size-5" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
