"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "@/components/Icon";
import SidebarFooterSection from "@/components/Sidebar/SidebarFooterSection";
import { menuItems } from "@/components/Sidebar/sidebarData";
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui";
import { cn } from "@/lib/utils";

export default function PrivateRouteNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={cn(
        "fixed z-50 top-3 right-3 left-3 mx-auto w-[calc(100%-1.5rem)] sm:w-[calc(100%-3rem)] lg:hidden",
        "rounded-full p-2",
        "bg-white/15 border border-white/25 backdrop-blur-2xl shadow-[0_4px_34.1px_0_rgba(0,0,0,0.15)]",
        menuOpen && "rounded-4xl",
      )}
      data-state={menuOpen ? "open" : "closed"}
    >
      <div
        className={cn("p-3 rounded-full bg-white", menuOpen && "rounded-3xl")}
        data-state={menuOpen ? "open" : "closed"}
      >
        <Collapsible open={menuOpen} onOpenChange={setMenuOpen}>
          <div className="ml-1 flex items-center justify-between">
            <Link
              href="/dashboard"
              className="text-2xl font-bold text-primary-4 -tracking-widest sm:ml-7 sm:text-[2rem]"
            >
              pastilolos
            </Link>

            <CollapsibleTrigger asChild>
              <Button
                size="icon-lg"
                variant="primary"
                className="size-13 shrink-0 cursor-pointer rounded-full"
              >
                <Icon
                  name="hamburger-menu-toggle"
                  size={20}
                  className="brightness-0 invert"
                />
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent className="mt-5 flex flex-col gap-3 data-[state=closed]:animate-out">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                <Button
                  variant="secondary"
                  className="h-auto w-full justify-start gap-3 rounded-full py-4 text-lg font-semibold"
                >
                  <Icon name={item.icon} size={24} />
                  {item.title}
                </Button>
              </Link>
            ))}
            <SidebarFooterSection
              layout="navbar"
              onClose={() => setMenuOpen(false)}
            />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
