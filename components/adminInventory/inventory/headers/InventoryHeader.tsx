'use client';

import { ChevronRight } from 'lucide-react';

interface InventoryHeaderProps {
  title: string;
  breadcrumb?: string;
}

export const InventoryHeader = ({ title, breadcrumb = 'Inventory' }: InventoryHeaderProps) => {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-[#617589] mb-2">
        <span>Home</span>
        <ChevronRight className="w-4 h-4 text-xs" />
        <span className="text-[#111418] dark:text-white font-medium">{breadcrumb}</span>
      </div>
      <h1 className="text-3xl font-bold">{title}</h1>
    </div>
  );
};
