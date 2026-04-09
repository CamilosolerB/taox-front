'use client';

interface InventoryStatsProps {
  totalItems: number;
  lowStockItems: number;
}

export const InventoryStats = ({ totalItems, lowStockItems }: InventoryStatsProps) => {
  return (
    <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
      <p className="text-xs font-bold text-primary uppercase mb-2">Estadísticas de Inventario</p>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-[#617589]">Total de Artículos:</span>
        <span className="text-sm font-bold">{totalItems.toLocaleString()}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs text-[#617589]">Stock Bajo:</span>
        <span className="text-sm font-bold text-red-500">{lowStockItems}</span>
      </div>
    </div>
  );
};
