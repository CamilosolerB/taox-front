'use client';

import { FilterCategories } from './FilterCategories';
import { FilterStockStatus } from './FilterStockStatus';
import { FilterLocation } from './FilterLocation';
import { InventoryStats } from './InventoryStats';
import type { StockStatus } from '@/data/inventoryData';

interface InventoryFiltersProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  
  statuses: StockStatus[];
  selectedStatuses: string[];
  onStatusChange: (status: string) => void;
  
  locations: string[];
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  
  totalItems: number;
  lowStockItems: number;
}

export const InventoryFilters = ({
  categories,
  selectedCategories,
  onCategoryChange,
  statuses,
  selectedStatuses,
  onStatusChange,
  locations,
  selectedLocation,
  onLocationChange,
  totalItems,
  lowStockItems,
}: InventoryFiltersProps) => {
  return (
    <div className="w-64 flex-shrink-0 flex flex-col gap-6">
      <FilterCategories
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryChange={onCategoryChange}
      />
      <FilterStockStatus
        statuses={statuses}
        selectedStatuses={selectedStatuses}
        onStatusChange={onStatusChange}
      />
      <FilterLocation
        locations={locations}
        selectedLocation={selectedLocation}
        onLocationChange={onLocationChange}
      />
      <InventoryStats totalItems={totalItems} lowStockItems={lowStockItems} />
    </div>
  );
};
