"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import {
  Collapsible,
  CollapsibleContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import LogoutSidebarMenuButton from "./LogoutSidebarMenuButton";
import SidebarAvatar from "./SidebarAvatar";

type SidebarFooterSectionProps = {
  /** `sidebar`: docked footer in rail. `navbar`: stacked under menu in mobile navbar. */
  layout?: "sidebar" | "navbar";
  /** e.g. close mobile menu sheet after navigation */
  onClose?: () => void;
};

export default function SidebarFooterSection({
  layout = "sidebar",
  onClose,
}: SidebarFooterSectionProps) {
  const isNavbar = layout === "navbar";

  return (
    <SidebarFooter className={cn("relative py-0", isNavbar ? "px-0" : "px-4")}>
      <Collapsible
        key="Sidebar Footer"
        className={cn(
          "inset-shadow-primary-button overflow-hidden rounded-full border border-white bg-primary-4 data-[state=open]:rounded-3xl",
          isNavbar
            ? "relative mt-2 flex w-full flex-col"
            : "absolute bottom-0 w-[calc(100%-32px)]",
        )}
      >
        {isNavbar ? (
          <>
            <SidebarAvatar />
            <CollapsibleContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip="Akun"
                    className="w-full! px-2 py-3 hover:bg-primary-5/50"
                  >
                    <Link
                      href="#"
                      className="flex w-full group-data-[collapsible=icon]:justify-center"
                      onClick={() => onClose?.()}
                    >
                      <Icon size={24} name="people-circle-fill" />
                      <p className="group-data-[collapsible=icon]:hidden">
                        Akun
                      </p>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
              <SidebarMenu>
                <LogoutSidebarMenuButton
                  layout="navbar"
                  onBeforeLogout={onClose}
                />
              </SidebarMenu>
            </CollapsibleContent>
          </>
        ) : (
          <>
            <CollapsibleContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip="Akun"
                    className="w-full! px-2 py-3 hover:bg-primary-5/50"
                  >
                    <Link
                      href="#"
                      className="flex w-full group-data-[collapsible=icon]:justify-center"
                      onClick={() => onClose?.()}
                    >
                      <Icon size={24} name="people-circle-fill" />
                      <p className="group-data-[collapsible=icon]:hidden">
                        Akun
                      </p>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
              <SidebarMenu>
                <LogoutSidebarMenuButton onBeforeLogout={onClose} />
              </SidebarMenu>
            </CollapsibleContent>

            <SidebarAvatar />
          </>
        )}
      </Collapsible>
    </SidebarFooter>
  );
}
