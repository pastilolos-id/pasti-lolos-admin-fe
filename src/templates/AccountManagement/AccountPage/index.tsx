"use client";

import { getAccountPageConfig } from "./accountManagementPageConfig";
import AccountManagementHeaderSection from "./AccountManagementHeaderSection";
import AccountManagementSummarySection from "./AccountManagementSummarySection";
import AccountManagementTable from "./AccountManagementTable";
import { accountSummaryMock } from "./mockData";
import type { AccountRoleVariant } from "./types";

type AccountPageProps = {
  variant: AccountRoleVariant;
};

export default function AccountPage({ variant }: AccountPageProps) {
  const config = getAccountPageConfig(variant);

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <AccountManagementHeaderSection title={config.pageTitle} />
      <AccountManagementSummarySection
        summaryLabel={config.summaryLabel}
        summary={accountSummaryMock}
      />
      <AccountManagementTable
        createButtonLabel={config.createButtonLabel}
        createHref={config.createHref}
      />
    </div>
  );
}
