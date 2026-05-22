import { format, isValid, parse } from "date-fns";

export const DISPLAY_DATE_FORMAT = "dd/MM/yyyy";

export function formatDisplayDate(date: Date): string {
  return format(date, DISPLAY_DATE_FORMAT);
}

export function parseDisplayDate(value: string): Date | undefined {
  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }
  const parsed = parse(trimmed, DISPLAY_DATE_FORMAT, new Date());
  return isValid(parsed) ? parsed : undefined;
}
