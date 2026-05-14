"use client";

import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui";
import { LOGIN_PATH } from "@/constants/routes";
import { removeToken } from "@/lib/cookies/tokenCookies";
import { cn } from "@/lib/utils";

export default function LogoutSidebarMenuButton({
  onBeforeLogout,
  layout = "sidebar",
}: {
  onBeforeLogout?: () => void;
  layout?: "sidebar" | "navbar";
} = {}) {
  const router = useRouter();
  const isNavbar = layout === "navbar";

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        type="button"
        tooltip="Keluar"
        className={cn(
          "w-full! flex px-2 py-3 group-data-[collapsible=icon]:justify-center",
          isNavbar
            ? "border-0 bg-red text-white hover:bg-red hover:brightness-105 active:bg-red active:brightness-[0.78] active:saturate-150"
            : "hover:bg-red active:bg-red/70",
        )}
        onClick={() => {
          onBeforeLogout?.();
          removeToken();
          router.replace(LOGIN_PATH);
        }}
      >
        <Icon size={24} name="door" />
        <p className="group-data-[collapsible=icon]:hidden">Keluar</p>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
