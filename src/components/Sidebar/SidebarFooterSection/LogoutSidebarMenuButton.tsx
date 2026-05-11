"use client";

import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui";

export default function LogoutSidebarMenuButton() {
  const router = useRouter();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        type="button"
        tooltip="Keluar"
        className="px-2 py-3 hover:bg-red active:bg-red/70 w-full! flex group-data-[collapsible=icon]:justify-center"
        onClick={() => {
          router.replace("/login");
        }}
      >
        <Icon size={24} name="door" />
        <p className="group-data-[collapsible=icon]:hidden">Keluar</p>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
