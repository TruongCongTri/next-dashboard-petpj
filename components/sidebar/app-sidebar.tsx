"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  Store,
  UserRound,
  ChartLine,
  Settings,
  Headphones,
} from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { TeamSwitcher } from "@/components/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { siteConfig } from "@/data/site";

// This is sample data.
const data = {
  teams: [
    {
      name: "Dashlab",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Dashlab Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: `${siteConfig.dashboard}`,
      icon: LayoutDashboard,
    },
    {
      title: "Product",
      url: "#",
      icon: ShoppingBag,
      isActive: true,
      isGroup: true,
      items: [
        {
          title: "Products List",
          url: `${siteConfig.shop.product}`,
        },
        {
          title: "Categories",
          url: `${siteConfig.shop.category}`,
        },
      ],
    },
    {
      title: "Orders",
      url: `${siteConfig.shop.order}`,
      icon: ShoppingCart,
    },
    {
      title: "Customers",
      url: `${siteConfig.shop.customer}`,
      icon: UserRound,
    },
    {
      title: "Sellers",
      url: `${siteConfig.shop.seller}`,
      icon: Store,
    },
    {
      title: "Analytics",
      url: `${siteConfig.shop.analytic}`,
      icon: ChartLine,
    },
  ],
  settings: [
    {
      title: "Support",
      url: `${siteConfig.management.contact}`,
      icon: Headphones,
    },
    {
      title: "Settings",
      url: `${siteConfig.management.setting}`,
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavMain items={data.settings} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
