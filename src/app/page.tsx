import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  AUTH_TOKEN_COOKIE_NAME,
  hasAuthSessionCookie,
} from "@/constants/auth";
import { DASHBOARD_PATH, LOGIN_PATH } from "@/constants/routes";

export default async function Home() {
  const raw = (await cookies()).get(AUTH_TOKEN_COOKIE_NAME)?.value;

  if (hasAuthSessionCookie(raw)) {
    redirect(DASHBOARD_PATH);
  }

  redirect(LOGIN_PATH);
}
