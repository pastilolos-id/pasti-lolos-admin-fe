"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "@/components/Icon";
import type { MenuItemType } from "@/components/Sidebar/sidebarData";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

type NavbarMenuItemWithSubMenuProps = MenuItemType & {
  onClose: () => void;
};

export default function NavbarMenuItemWithSubMenu({
  title,
  icon,
  subMenu,
  onClose,
}: NavbarMenuItemWithSubMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        variant="secondary"
        onClick={() => setOpen((prev) => !prev)}
        className="h-auto w-full justify-start gap-3 rounded-full py-4 text-lg font-semibold"
      >
        <Icon name={icon} size={24} />
        <span className="flex-1 text-left">{title}</span>
        <Icon
          name="chevron-down-fill"
          size={16}
          viewBox="0 0 16 16"
          className={cn("shrink-0 transition-transform", open && "rotate-180")}
        />
      </Button>

      {open ? (
        <div className="flex flex-col gap-2 pl-4">
          {subMenu?.map((subItem) => (
            <Link
              key={subItem.href}
              href={subItem.href}
              onClick={() => {
                setOpen(false);
                onClose();
              }}
            >
              <Button
                variant="secondary"
                className="h-auto w-full justify-start gap-3 rounded-full py-3 text-base font-semibold"
              >
                <Icon name={subItem.icon} size={24} />
                {subItem.title}
              </Button>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
