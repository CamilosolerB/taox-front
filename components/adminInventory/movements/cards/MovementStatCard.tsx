'use client';

import { ReactNode } from 'react';

export interface MovementStatCardProps {
  label: string;
  value: string | number;
  /** Descripción o subtítulo (puede ser texto con estilo positivo/negativo) */
  description: ReactNode;
  icon: ReactNode;
}

export const MovementStatCard = ({ label, value, description, icon }: MovementStatCardProps) => {
  return (
    <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-[#dbe0e6] dark:border-gray-800 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[#617589] text-sm font-medium">{label}</p>
        {icon}
      </div>
      <p className="text-[#111418] dark:text-white text-2xl font-bold leading-tight mb-1">
        {value}
      </p>
      <div className="text-xs font-medium">{description}</div>
    </div>
  );
};
