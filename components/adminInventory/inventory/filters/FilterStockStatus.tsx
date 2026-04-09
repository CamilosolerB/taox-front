'use client';

import type { StockStatus } from '@/data/inventoryData';

interface FilterStockStatusProps {
  statuses: StockStatus[];
  selectedStatuses: string[];
  onStatusChange: (status: string) => void;
}

export const FilterStockStatus = ({
  statuses,
  selectedStatuses,
  onStatusChange,
}: FilterStockStatusProps) => {
  const getStatusColor = (color: string) => {
    const colors: Record<string, string> = {
      red: 'bg-red-500',
      yellow: 'bg-yellow-500',
      green: 'bg-green-500',
    };
    return colors[color] || 'bg-gray-500';
  };

  return (
    <div>
      <h3 className="text-sm font-bold mb-3 uppercase tracking-wider text-[#617589]">
        Estado de Stock
      </h3>
      <div className="space-y-2">
        {statuses.map((status) => (
          <label key={status.label} className="flex items-center gap-3 cursor-pointer group">
            <input
              className="rounded border-gray-300 text-primary focus:ring-primary"
              type="checkbox"
              checked={selectedStatuses.includes(status.label)}
              onChange={() => onStatusChange(status.label)}
            />
            <div className={`w-2 h-2 rounded-full ${getStatusColor(status.color)}`}></div>
            <span className="text-sm font-medium group-hover:text-primary transition-colors">
              {status.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};
