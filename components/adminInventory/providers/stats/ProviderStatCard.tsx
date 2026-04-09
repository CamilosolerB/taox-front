'use client';

import { ReactNode } from 'react';

export interface ProviderStatCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  description: ReactNode;
}

export const ProviderStatCard = ({ icon, label, value, description }: ProviderStatCardProps) => {
  return (
    <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-[#e5e7eb] dark:border-gray-700 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">{icon}</div>
        <p className="text-xs font-bold text-[#617589] dark:text-gray-400 uppercase tracking-widest">
          {label}
        </p>
      </div>
      <p className="text-3xl font-black text-[#111418] dark:text-white">{value}</p>
      <div className="text-xs mt-2 font-semibold flex items-center gap-1">{description}</div>
    </div>
  );
};
