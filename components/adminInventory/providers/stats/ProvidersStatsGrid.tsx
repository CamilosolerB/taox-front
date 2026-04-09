'use client';

import { ReactNode } from 'react';
import { ProviderStatCard } from './ProviderStatCard';

export interface ProviderStatItem {
  icon: ReactNode;
  label: string;
  value: string;
  description: ReactNode;
}

export interface ProvidersStatsGridProps {
  stats: ProviderStatItem[];
}

export const ProvidersStatsGrid = ({ stats }: ProvidersStatsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <ProviderStatCard
          key={index}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
          description={stat.description}
        />
      ))}
    </div>
  );
};
