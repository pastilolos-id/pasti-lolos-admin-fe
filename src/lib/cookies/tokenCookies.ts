import Cookies from "js-cookie";

import { AUTH_TOKEN_COOKIE_NAME } from "@/constants/auth";

/** Removes legacy/non-httpOnly token cookie if present. */
export function removeToken() {
  Cookies.remove(AUTH_TOKEN_COOKIE_NAME, { path: "/" });
}
