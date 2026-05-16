import { ApiError } from "@/lib/auth/api-client";

function messageFromBody(data: unknown): string | null {
  if (data && typeof data === "object" && "message" in data) {
    const message = (data as { message: unknown }).message;
    if (typeof message === "string" && message.trim()) {
      return message;
    }
    if (Array.isArray(message) && message.length > 0) {
      return message.map(String).join(", ");
    }
  }
  return null;
}

export function parseExamApiError(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 404) {
      return "Paket tryout tidak ditemukan.";
    }
    const fromBody = messageFromBody(error.data);
    if (fromBody) return fromBody;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Gagal memuat detail tryout. Silakan coba lagi.";
}
