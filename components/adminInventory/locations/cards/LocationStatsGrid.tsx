'use client';

import { TrendingUp } from 'lucide-react';
import { LocationStatsCard } from './LocationStatsCard';

interface LocationStatsGridProps {
  capacityUsage: number;
  capacityAvailable: number;
  capacityIcon: React.ReactNode;
  totalSkus: number;
  subLocations: number;
  skusIcon: React.ReactNode;
  lowStockAlerts: number;
  alertsIcon: React.ReactNode;
}

export const LocationStatsGrid = ({
  capacityUsage,
  capacityAvailable,
  capacityIcon,
  totalSkus,
  subLocations,
  skusIcon,
  lowStockAlerts,
  alertsIcon,
}: LocationStatsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <LocationStatsCard
        icon={capacityIcon}
        label="Utilización de Capacidad"
        value={`${capacityUsage}%`}
        description=""
      >
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-2 overflow-hidden">
          <div className="bg-primary h-full rounded-full" style={{ width: `${capacityUsage}%` }}></div>
        </div>
        <p className="text-[#078838] text-sm font-semibold mt-1 flex items-center gap-1">
          <TrendingUp className="w-4 h-4" /> {capacityAvailable}% disponible
        </p>
      </LocationStatsCard>

      <LocationStatsCard
        icon={skusIcon}
        label="SKUs Totales"
        value={`${totalSkus} Items`}
        description={`En ${subLocations} sub-ubicaciones`}
      />

      <LocationStatsCard
        icon={alertsIcon}
        label="Alertas de Stock Bajo"
        value={lowStockAlerts}
        description="Requiere reorden inmediata"
      />
    </div>
  );
};
