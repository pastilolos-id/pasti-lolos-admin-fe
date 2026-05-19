"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { SidebarContainer, SidebarHeader } from "@/components/ui";
import SidebarContentSection from "./SidebarContentSection";
import SidebarFooterSection from "./SidebarFooterSection";

export default function Sidebar() {
  return (
    <SidebarContainer collapsible="icon" className="py-4 hidden lg:flex">
      <SidebarHeader>
        <Link href="/dashboard" className="flex w-full justify-center">
          <Logo />
        </Link>
      </SidebarHeader>

      <SidebarContentSection />

      <SidebarFooterSection />
    </SidebarContainer>
  );
}
