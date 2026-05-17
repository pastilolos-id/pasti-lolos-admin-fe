export function getShortExamLabel(examName: string): string {
  const trimmed = examName.trim();
  if (!trimmed) return "Nilai";
  const openParen = trimmed.indexOf("(");
  return openParen > 0 ? trimmed.slice(0, openParen).trim() : trimmed;
}
