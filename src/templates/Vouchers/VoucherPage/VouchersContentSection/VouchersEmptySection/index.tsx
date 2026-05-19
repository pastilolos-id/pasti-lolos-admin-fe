import { cn } from "@/lib/utils";

export default function VouchersEmptySection() {
  return (
    <div
      className={cn(
        "rounded-2xl border border-dashed border-[#EEEEEE] bg-[#FAFAFA] px-4 py-10 text-center",
      )}
    >
      <p className="text-b2 font-semibold text-neutral-6">
        Tidak ada data yang cocok
      </p>
      <p className="text-c1 mt-2 text-neutral-5">
        Ubah kata kunci pencarian judul atau kode voucher.
      </p>
    </div>
  );
}
