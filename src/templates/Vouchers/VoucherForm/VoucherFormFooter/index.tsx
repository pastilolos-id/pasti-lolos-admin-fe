"use client";

import { Button } from "@/components/ui/button";

export default function VoucherFormFooter() {
  return (
    <Button
      type="submit"
      variant="primary"
      className="col-span-12 h-12 w-full rounded-2xl text-base font-bold text-white shadow-none"
    >
      Simpan
    </Button>
  );
}
