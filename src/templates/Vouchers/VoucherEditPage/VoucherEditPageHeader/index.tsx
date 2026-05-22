import TryoutFormBackLink from "@/templates/Tryout/TryoutForm/TryoutFormHeader/TryoutFormBackLink";

export default function VoucherEditPageHeader() {
  return (
    <div className="space-y-4">
      <TryoutFormBackLink href="/vouchers" />
      <h1 className="text-h3 font-bold text-neutral-6">Edit Voucher</h1>
    </div>
  );
}
