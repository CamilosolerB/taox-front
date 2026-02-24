'use client';

import { TankIndicator } from './TankIndicator';

export interface Tank {
  id: string;
  percentage: number;
  name: string;
  description: string;
}

interface TankIndicatorsGridProps {
  title: string;
  tanks: Tank[];
}

export const TankIndicatorsGrid = ({ title, tanks }: TankIndicatorsGridProps) => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {tanks.map((tank) => (
          <TankIndicator
            key={tank.id}
            id={tank.id}
            percentage={tank.percentage}
            name={tank.name}
            description={tank.description}
          />
        ))}
      </div>
    </div>
  );
};
