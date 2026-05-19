"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import {
  Accordion,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui";
import MenuItemWithSubMenu from "../MenuItemWithSubMenu";
import { menuItems } from "../sidebarData";

export default function SidebarContentSection() {
  return (
    <SidebarContent className="grid grid-rows-1">
      <SidebarGroup>
        <SidebarMenu>
          <Accordion type="single" collapsible>
            {menuItems.map((menu) => {
              if (!menu.subMenu) {
                return (
                  <SidebarMenuItem key={menu.title}>
                    <SidebarMenuButton tooltip={menu.title} asChild>
                      <Link href={menu.href}>
                        <Icon size={24} name={menu.icon} />
                        <p>{menu.title}</p>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              }

              return <MenuItemWithSubMenu key={menu.title} {...menu} />;
            })}
          </Accordion>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}
