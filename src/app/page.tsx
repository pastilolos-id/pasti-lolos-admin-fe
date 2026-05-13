import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AUTH_TOKEN_COOKIE_NAME } from "@/constants/auth";

export default async function Home() {
  const raw = (await cookies()).get(AUTH_TOKEN_COOKIE_NAME)?.value;
  const token = raw?.trim();

  if (token) {
    redirect("/dashboard");
  }

  redirect("/login");
}
