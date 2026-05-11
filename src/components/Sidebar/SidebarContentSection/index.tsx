"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui";
import { MENU_GROUP_LABEL, menuItems } from "../sidebarData";

export default function SidebarContentSection() {
  return (
    <SidebarContent className="grid grid-rows-1">
      <SidebarGroup>
        <SidebarGroupLabel>{MENU_GROUP_LABEL}</SidebarGroupLabel>
        <SidebarMenu>
          {menuItems.map((menu) => (
            <SidebarMenuItem key={menu.title}>
              <SidebarMenuButton tooltip={menu.title} asChild>
                <Link href={menu.href}>
                  <Icon size={24} name={menu.icon} />
                  <p>{menu.title}</p>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}
