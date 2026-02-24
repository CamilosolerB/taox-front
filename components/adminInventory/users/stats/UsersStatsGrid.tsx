'use client';

import { ReactNode } from 'react';
import { UserStatCard } from './UserStatCard';

export interface UserStatItem {
  label: string;
  value: string | number;
  description: ReactNode;
  icon: ReactNode;
}

export interface UsersStatsGridProps {
  stats: UserStatItem[];
}

export const UsersStatsGrid = ({ stats }: UsersStatsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <UserStatCard
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
