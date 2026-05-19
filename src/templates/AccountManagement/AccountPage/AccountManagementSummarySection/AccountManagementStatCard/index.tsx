import Icon from "@/components/Icon";

type AccountManagementStatCardProps = {
  label: string;
  countDisplay: string;
};

export default function AccountManagementStatCard({
  label,
  countDisplay,
}: AccountManagementStatCardProps) {
  return (
    <div className="relative min-h-31 rounded-[23.5px] border border-[#F6F6F6] bg-white p-4 md:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <p className="text-c1 font-medium text-neutral-5">{label}</p>
          <p className="text-h3 font-bold tracking-tight text-neutral-6">
            {countDisplay}
          </p>
        </div>
        <div
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-5/15 text-primary-5 md:size-12"
          aria-hidden
        >
          <Icon name="people-circle-fill" size={22} className="shrink-0" />
        </div>
      </div>
    </div>
  );
}
