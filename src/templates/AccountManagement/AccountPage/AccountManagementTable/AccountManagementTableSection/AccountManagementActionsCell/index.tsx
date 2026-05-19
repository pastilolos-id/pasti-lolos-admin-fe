"use client";

import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type AccountManagementActionsCellProps = {
  id: string;
  nama: string;
};

export default function AccountManagementActionsCell({
  id,
  nama,
}: AccountManagementActionsCellProps) {
  const handleEdit = () => {
    console.log("[account mock] edit", id);
  };

  const handleDelete = () => {
    console.log("[account mock] delete", id, nama);
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex items-center justify-center gap-1.5 sm:gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              className="size-8 shrink-0 rounded-full bg-[#80B0FF]/25 text-[#448AFF] hover:bg-[#80B0FF]/40 sm:size-9"
              aria-label="Edit akun"
              onClick={handleEdit}
            >
              <Pencil className="size-4 shrink-0" strokeWidth={2.25} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={6}>
            Edit
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              className="size-8 shrink-0 rounded-full bg-[#FF5649]/20 text-[#FF5649] hover:bg-[#FF5649]/30 sm:size-9"
              aria-label="Hapus akun"
              onClick={handleDelete}
            >
              <Trash2 className="size-4 shrink-0" strokeWidth={2.25} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={6}>
            Hapus
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
