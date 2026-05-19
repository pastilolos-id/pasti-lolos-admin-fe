import type {
  AccountDisplayStatus,
  AccountRow,
} from "@/templates/AccountManagement/AccountPage/types";

import type { AccountApiItem } from "./types";

export function formatAccountDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    const [y, m, d] = iso.split("-");
    if (y && m && d) {
      return `${d}/${m}/${y}`;
    }
    return iso;
  }
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = String(date.getFullYear());
  return `${d}/${m}/${y}`;
}

export function formatAccountCount(count: number): string {
  return count.toLocaleString("id-ID");
}

export function mapApiStatusToDisplay(isActive: boolean): AccountDisplayStatus {
  return isActive ? "aktif" : "tidak_aktif";
}

export function mapAccountApiItemToRow(
  api: AccountApiItem,
  rowNo: number,
): AccountRow {
  return {
    id: api.id,
    nama: api.name,
    email: api.email,
    createdAtIso: api.created_at,
    createdAtDisplay: formatAccountDate(api.created_at),
    displayStatus: mapApiStatusToDisplay(api.is_active),
    rowNo,
  };
}
