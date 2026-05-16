export function parseNumericTryoutId(rawId: string): number | null {
  const trimmed = decodeURIComponent(rawId).trim();
  if (!/^\d+$/.test(trimmed)) return null;
  return Number(trimmed);
}
