import type { AccountSummary } from "../types";
import AccountManagementStatCard from "./AccountManagementStatCard";

type AccountManagementSummarySectionProps = {
  summaryLabel: string;
  summary: AccountSummary;
};

export default function AccountManagementSummarySection({
  summaryLabel,
  summary,
}: AccountManagementSummarySectionProps) {
  return (
    <section
      className="grid grid-cols-1 gap-3"
      aria-label="Ringkasan akun"
    >
      <AccountManagementStatCard
        label={summaryLabel}
        countDisplay={summary.countDisplay}
      />
    </section>
  );
}
