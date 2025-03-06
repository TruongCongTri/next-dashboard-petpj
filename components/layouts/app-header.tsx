"use client";

import * as React from "react";

import { NavUser } from "@/components/sidebar/nav-user";
import { Sidebar, SidebarTrigger } from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";
import { HeaderNoti } from "@/components/buttons/header-noti";
import { HeaderMail } from "@/components/buttons/header-mail";
import { DatePickerWithPresets } from "@/components/ui/customize/date-picker";
import { ModeToggle } from "@/components/buttons/toggle-mode";

const data = {
  user: {
    name: "Jay Hargudson",
    role: "Manager",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  mail: {
    chat: {
      href: "/",
      qtt: "19",
    },
    discussion: {
      href: "/",
      qtt: "48",
    },
    reviews: {
      href: "/",
      qtt: "",
    },
    support: {
      href: "/",
      qtt: "",
    },
  },
};

export function AppHeader({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <header
      className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b sticky top-0 z-100"
      {...props}
    >
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <ModeToggle />
      </div>
      <div className="flex items-center justify-end px-4">
        <div className="flex items-center justify-end">
          <DatePickerWithPresets />
          <HeaderNoti user={data.user} />
          <HeaderMail items={data.mail} />
        </div>
        <NavUser user={data.user} />
      </div>
    </header>
  );
}
