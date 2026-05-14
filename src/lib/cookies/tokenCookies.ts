import Cookies from "js-cookie";

import { AUTH_TOKEN_COOKIE_NAME } from "@/constants/auth";

const cookieOptions = {
  path: "/",
  secure: process.env.NODE_ENV === "production",
} as const;

export function setToken(token: string, expiresInDays = 1) {
  Cookies.set(AUTH_TOKEN_COOKIE_NAME, token, {
    ...cookieOptions,
    expires: expiresInDays,
  });
}

export function getToken(): string | null {
  return Cookies.get(AUTH_TOKEN_COOKIE_NAME) || null;
}

export function removeToken() {
  Cookies.remove(AUTH_TOKEN_COOKIE_NAME, { path: "/" });
}
