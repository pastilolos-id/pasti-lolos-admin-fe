const TIME_PARTS = /^(\d{1,2}):(\d{1,2}):(\d{1,2})$/;

export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

export function parseTimeParts(value: string): {
  h: number;
  m: number;
  s: number;
} {
  const m = value.trim().match(TIME_PARTS);
  if (!m) {
    return { h: 0, m: 0, s: 0 };
  }
  return {
    h: Math.min(23, Math.max(0, Number(m[1]))),
    m: Math.min(59, Math.max(0, Number(m[2]))),
    s: Math.min(59, Math.max(0, Number(m[3]))),
  };
}

export function formatTimeParts(h: number, m: number, s: number): string {
  return `${pad2(h)}:${pad2(m)}:${pad2(s)}`;
}
