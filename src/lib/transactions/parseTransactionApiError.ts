import { ApiError } from "@/lib/auth/api-client";

const GENERIC_ERROR_MESSAGE = "Terjadi kesalahan. Silakan coba lagi.";

function messageFromBody(data: unknown): string | null {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    if (typeof data === "string" && data.trim()) {
      return data.trim();
    }
    return null;
  }

  const record = data as Record<string, unknown>;
  if (typeof record.message === "string" && record.message.trim()) {
    return record.message.trim();
  }

  return null;
}

export function parseTransactionApiError(error: unknown): string {
  if (error instanceof ApiError) {
    const fromBody = messageFromBody(error.data);
    if (fromBody) {
      return fromBody;
    }
  }

  if (error instanceof Error && "data" in error) {
    const fromBody = messageFromBody((error as ApiError).data);
    if (fromBody) {
      return fromBody;
    }
  }

  return GENERIC_ERROR_MESSAGE;
}
