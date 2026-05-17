"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Form, type FormHandle } from "@/components";
import { Button } from "@/components/ui";
import { DASHBOARD_PATH, LOGIN_PATH } from "@/constants/routes";
import { useLoginMutation, useLogoutMutation } from "@/lib/auth/authQuery";
import {
  applyLoginFieldErrors,
  mapApiUserToAuthUser,
  normalizeLoginPayload,
} from "@/lib/auth/login-form-utils";
import { parseLoginError } from "@/lib/auth/parseLoginError";
import { ADMIN_ROLE_ID } from "@/lib/auth/types";
import { removeToken } from "@/lib/cookies/tokenCookies";
import { useAuthStore } from "@/lib/store/auth-store";
import ActionDialogLayout, {
  type ActionDialogAction,
} from "@/components/ActionDialogLayout";
import AuthLeftSection from "../LeftSection";
import { loginInputData } from "./inputData";

type LoginDialogKind = "error" | "not-admin" | null;

const NOT_ADMIN_MESSAGE =
  "Anda bukan admin. Halaman ini hanya dapat diakses oleh akun admin.";

const GENERIC_ERROR_MESSAGE = "Terjadi kesalahan. Silakan coba lagi.";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const formRef = useRef<FormHandle>(null);
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  const [dialogKind, setDialogKind] = useState<LoginDialogKind>(null);
  const [dialogMessage, setDialogMessage] = useState("");

  const { mutateAsync: loginUser, isPending: isLoginPending } =
    useLoginMutation();
  const { mutateAsync: logoutUser } = useLogoutMutation();

  useEffect(() => {
    const errorFromQuery = searchParams.get("error");
    if (!errorFromQuery?.trim()) {
      return;
    }
    const raw = errorFromQuery.trim();
    try {
      setDialogMessage(decodeURIComponent(raw.replace(/\+/g, " ")));
    } catch {
      setDialogMessage(raw.replace(/\+/g, " "));
    }
    setDialogKind("error");
    router.replace(LOGIN_PATH, { scroll: false });
  }, [searchParams, router]);

  const closeDialog = useCallback(() => {
    setDialogKind(null);
    setDialogMessage("");
  }, []);

  const handleOnSubmitForm = async (payload: Record<string, unknown>) => {
    closeDialog();
    formRef.current?.clearErrors();

    const body = normalizeLoginPayload(payload);

    try {
      const res = await loginUser(body);

      if (res.user.userRoleId !== ADMIN_ROLE_ID) {
        try {
          await logoutUser();
        } catch {
          // Session cleanup best-effort
        }
        clearUser();
        removeToken();
        setDialogMessage(NOT_ADMIN_MESSAGE);
        setDialogKind("not-admin");
        return;
      }

      setUser(mapApiUserToAuthUser(res.user));
      router.replace(DASHBOARD_PATH);
    } catch (err) {
      const parsed = parseLoginError(err);

      if (parsed?.message?.trim()) {
        setDialogMessage(parsed.message.trim());
        setDialogKind("error");
      }

      if (parsed?.errors && formRef.current) {
        applyLoginFieldErrors(formRef.current.setError, parsed.errors);
      }

      if (
        !parsed?.message?.trim() &&
        (!parsed?.errors || Object.keys(parsed.errors).length === 0)
      ) {
        setDialogMessage(GENERIC_ERROR_MESSAGE);
        setDialogKind("error");
      }
    }
  };

  const userAppUrl = process.env.NEXT_PUBLIC_USER_APP_URL?.trim() ?? "";

  const dialogActions: ActionDialogAction[] =
    dialogKind === "not-admin"
      ? [
          {
            label: "OK",
            appearance: "solid",
            onClick: closeDialog,
          },
          ...(userAppUrl
            ? [
                {
                  label: "Ke Website User",
                  appearance: "outline" as const,
                  onClick: () => {
                    window.location.href = userAppUrl;
                  },
                },
              ]
            : []),
        ]
      : [
          {
            label: "OK",
            appearance: "solid",
            onClick: closeDialog,
          },
        ];

  return (
    <>
      <AuthLeftSection title="Masuk">
        <Form
          ref={formRef}
          inputData={loginInputData}
          onSubmitForm={handleOnSubmitForm}
        >
          <Button
            isLoading={isLoginPending}
            text="Masuk"
            type="submit"
            className="col-span-12 mt-6"
          />
        </Form>
      </AuthLeftSection>

      <ActionDialogLayout
        open={dialogKind !== null}
        onOpenChange={(open) => {
          if (!open) {
            closeDialog();
          }
        }}
        tone="destructive"
        iconName="slash-circle"
        message={dialogMessage}
        actions={dialogActions}
      />
    </>
  );
}
