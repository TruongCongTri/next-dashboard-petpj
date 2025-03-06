import React, { ReactNode } from "react";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/components/layouts/app-header";

type LayoutProps = {
  children: ReactNode;
};

export default function DashboardTemplate({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        {/* <div className="w-full h-full bg-muted/10">{children}</div> */}
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
