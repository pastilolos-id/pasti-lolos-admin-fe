import type { AccountPageConfig, AccountRoleVariant } from "./types";

export const accountManagementPageConfig: Record<
  AccountRoleVariant,
  AccountPageConfig
> = {
  admin: {
    pageTitle: "Admin",
    summaryLabel: "Jumlah Admin",
    createButtonLabel: "Tambah Admin",
    createHref: "/account-management/admin/create",
  },
  contributors: {
    pageTitle: "Kontributor",
    summaryLabel: "Jumlah Kontributor",
    createButtonLabel: "Tambah Kontributor",
    createHref: "/account-management/contributors/create",
  },
  students: {
    pageTitle: "Student",
    summaryLabel: "Jumlah Student",
    createButtonLabel: "Tambah Student",
    createHref: "/account-management/students/create",
  },
};

export function getAccountPageConfig(
  variant: AccountRoleVariant,
): AccountPageConfig {
  return accountManagementPageConfig[variant];
}
