"use client";

import { AlertCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Form, type FormHandle } from "@/components";
import { Alert, AlertDescription, AlertTitle, Button } from "@/components/ui";
import AuthLeftSection from "../LeftSection";
import { loginInputData } from "./inputData";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const formRef = useRef<FormHandle>(null);
  const [globalMessage, setGlobalMessage] = useState<string | null>(null);
  const [isLoading] = useState<boolean>(false);

  useEffect(() => {
    const errorFromQuery = searchParams.get("error");
    if (!errorFromQuery?.trim()) {
      return;
    }
    const raw = errorFromQuery.trim();
    try {
      setGlobalMessage(decodeURIComponent(raw.replace(/\+/g, " ")));
    } catch {
      setGlobalMessage(raw.replace(/\+/g, " "));
    }
    router.replace("/login", { scroll: false });
  }, [searchParams, router]);

  const handleOnClickGoogleButton = () => {
    setGlobalMessage(null);
    formRef.current?.clearErrors();
  };

  const handleOnSubmitForm = async (_payload: Record<string, unknown>) => {
    setGlobalMessage(null);
    formRef.current?.clearErrors();
    // TODO: wire to backend later
  };

  return (
    <AuthLeftSection
      title="Masuk"
      googleButton={{
        onClick: handleOnClickGoogleButton,
        text: "Masuk Dengan Akun Google",
      }}
    >
      {globalMessage ? (
        <Alert variant="destructive" className="col-span-12 mb-4">
          <AlertCircle className="col-start-1 row-start-1" aria-hidden />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{globalMessage}</AlertDescription>
        </Alert>
      ) : null}

      <Form
        ref={formRef}
        inputData={loginInputData}
        onSubmitForm={handleOnSubmitForm}
      >
        <Button
          isLoading={isLoading}
          text="Masuk"
          type="submit"
          className="col-span-12 mt-6"
        />
      </Form>
    </AuthLeftSection>
  );
}
