/**
 * Expected REST shapes for account management endpoints (illustrative).
 * Map to domain types in `@/templates/AccountManagement/AccountPage/types` via mapAccount.
 */

export type AccountApiRole = "admin" | "contributor" | "student";

export type AccountApiListParams = {
  search?: string;
  page?: number;
  limit?: number;
  role?: AccountApiRole;
  sortBy?: "name" | "email" | "created_at" | "status";
  sortOrder?: "asc" | "desc";
};

export type AccountApiItem = {
  /** UUID */
  id: string;
  name: string;
  email: string;
  /** ISO 8601 */
  created_at: string;
  is_active: boolean;
  role: AccountApiRole;
};

export type AccountApiListMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type AccountApiListResponse = {
  data: AccountApiItem[];
  meta: AccountApiListMeta;
};

export type AccountApiSummaryResponse = {
  totalCount: number;
};
