"use client";

import { Mail } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { NotificationBadge } from "../ui/customize/notification-badge";
import { Badge } from "../ui/badge";

export function HeaderMail({
  items,
}: {
  items: {
    chat: {
      href: string;
      qtt: string;
    };
    discussion: {
      href: string;
      qtt: string;
    };
    reviews: {
      href: string;
      qtt: string;
    };
    support: {
      href: string;
      qtt: string;
    };
  };
}) {
  const { isMobile } = useSidebar();
  const noti =
    parseInt(items.chat.qtt) +
    parseInt(items.discussion.qtt) +
    parseInt(items.reviews.qtt) +
    parseInt(items.support.qtt);
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* <Button variant="ghost">
              <Mail />
            </Button> */}
            <NotificationBadge
              label={noti}
              className="bg-blue-500 translate-x-2.5 -translate-y-2.5"
            >
              <Button variant="ghost">
                <Mail className="h-4 w-4" />
              </Button>
            </NotificationBadge>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "bottom"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Chat
                <Badge>{items.chat.qtt}</Badge>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Discussion
                <Badge>{items.discussion.qtt}</Badge>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Reviews
                <Badge>{items.reviews.qtt}</Badge>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Support
                <Badge>{items.support.qtt}</Badge>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
