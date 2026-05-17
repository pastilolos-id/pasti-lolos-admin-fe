import {
  handleSessionExpired,
  shouldTriggerSessionExpired,
} from "@/lib/auth/session-lifecycle";

const baseUrl =
  typeof process.env.NEXT_PUBLIC_API_URL === "string"
    ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")
    : "";

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(status: number, data: unknown) {
    super("API request failed");
    this.status = status;
    this.data = data;
  }
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const hasFormDataBody = init?.body instanceof FormData;

  const headers = new Headers(init?.headers);
  headers.set("Accept", "application/json");
  if (!hasFormDataBody && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers,
    credentials: "include",
  });

  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    if (response.status === 401 && shouldTriggerSessionExpired(path)) {
      void handleSessionExpired();
    }
    throw new ApiError(response.status, data);
  }

  return data as T;
}
