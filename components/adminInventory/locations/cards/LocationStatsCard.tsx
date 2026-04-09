'use client';

import { ReactNode } from 'react';

interface LocationStatsCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  description: string;
  children?: ReactNode;
}

export const LocationStatsCard = ({
  icon,
  label,
  value,
  description,
  children,
}: LocationStatsCardProps) => {
  return (
    <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#1a2530] border border-[#dbe0e6] dark:border-[#2d3947] shadow-sm">
      <div className="flex justify-between items-start">
        <p className="text-[#617589] text-sm font-medium uppercase tracking-wider">{label}</p>
        {icon}
      </div>
      <p className="text-[#111418] dark:text-white text-3xl font-bold">{value}</p>
      <p className="text-[#617589] text-sm font-medium mt-1">{description}</p>
      {children}
    </div>
  );
};
