'use client';

import { ReactNode } from 'react';
import { MovementStatCard } from './MovementStatCard';

export interface MovementStatItem {
  label: string;
  value: string | number;
  description: ReactNode;
  icon: ReactNode;
}

export interface MovementsStatsGridProps {
  stats: MovementStatItem[];
}

export const MovementsStatsGrid = ({ stats }: MovementsStatsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <MovementStatCard
          key={index}
          label={stat.label}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
        />
      ))}
    </div>
  );
};
