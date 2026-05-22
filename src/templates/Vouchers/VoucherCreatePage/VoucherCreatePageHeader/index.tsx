import TryoutFormBackLink from "@/templates/Tryout/TryoutForm/TryoutFormHeader/TryoutFormBackLink";

export default function VoucherCreatePageHeader() {
  return (
    <div className="space-y-4">
      <TryoutFormBackLink href="/vouchers" />
      <h1 className="text-h3 font-bold text-neutral-6">Buat Voucher</h1>
    </div>
  );
}
