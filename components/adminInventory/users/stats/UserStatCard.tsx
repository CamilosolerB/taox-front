'use client';

import { ReactNode } from 'react';

export interface UserStatCardProps {
  label: string;
  value: string | number;
  description: ReactNode;
  icon: ReactNode;
}

export const UserStatCard = ({ label, value, description, icon }: UserStatCardProps) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</span>
        {icon}
      </div>
      <div className="text-2xl font-bold text-slate-900 dark:text-white">{value}</div>
      <div className="text-xs mt-1 text-slate-400 dark:text-slate-500">{description}</div>
    </div>
  );
};
