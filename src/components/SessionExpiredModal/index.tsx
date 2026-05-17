"use client";

import { SESSION_EXPIRED_MESSAGE } from "@/lib/auth/session-lifecycle";
import { useSessionStore } from "@/lib/store/session-store";
import ActionDialogLayout from "@/components/ActionDialogLayout";

export default function SessionExpiredModal() {
  const isOpen = useSessionStore((state) => state.isSessionExpiredModalOpen);

  return (
    <ActionDialogLayout
      open={isOpen}
      onOpenChange={() => {
        // Session expiry flow is not dismissible manually.
      }}
      tone="destructive"
      iconName="slash-circle"
      message={`${SESSION_EXPIRED_MESSAGE}\n\nMengalihkan ke halaman login...`}
      actions={[]}
    />
  );
}
