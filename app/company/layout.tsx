"use client";

import { useState } from "react";
import Navbar from "@/components/adminInventory/headers/Navbar";
import { Sidebar } from "@/components/adminInventory/utils";

export default function CompanyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background-dark">
      <Navbar isSidebarCollapsed={isCollapsed} />
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}>
        {children}
      </Sidebar>
    </div>
  );
}
