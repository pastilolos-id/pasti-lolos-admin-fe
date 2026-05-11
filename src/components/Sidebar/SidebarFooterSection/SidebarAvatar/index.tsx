"use client";

import type * as React from "react";
import Icon from "@/components/Icon";
import { Avatar, AvatarFallback, CollapsibleTrigger } from "@/components/ui";
import { cn } from "@/lib/utils";
import { getAvatarInitials } from "@/lib/utils/avatarInitials";

const ADMIN_DISPLAY_NAME = "Admin";

export default function SidebarAvatar(props: React.ComponentProps<"div">) {
  return (
    <CollapsibleTrigger className="w-full group hover:bg-primary-5/50 active:bg-primary-3 cursor-pointer">
      <div
        {...props}
        className={cn(
          "flex gap-3 items-center p-2 justify-center",
          props.className,
        )}
      >
        <Avatar className="border border-white">
          <AvatarFallback>
            {getAvatarInitials(ADMIN_DISPLAY_NAME)}
          </AvatarFallback>
        </Avatar>
        <p className="mr-3 group-data-[collapsible=icon]:hidden">
          {ADMIN_DISPLAY_NAME}
        </p>

        <div className="ml-auto cursor-pointer group-data-[collapsible=icon]:hidden">
          <Icon
            size={16}
            name="chevron-down-fill"
            className="rotate-180 group-data-[state=open]:rotate-0 ml-auto"
          />
        </div>
      </div>
    </CollapsibleTrigger>
  );
}
