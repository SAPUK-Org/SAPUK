"use client";

import React from "react";
import { DashboardGuard } from "./DashboardGuard";
import { DashboardSidebar } from "./DashboardSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <DashboardGuard>
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" />
            <div className="h-4 w-px bg-border" aria-hidden />
          </header>
          <div className="flex-1 overflow-auto">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </DashboardGuard>
  );
}
