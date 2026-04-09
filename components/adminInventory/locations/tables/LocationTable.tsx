'use client';

import { Filter } from 'lucide-react';
import { LocationTableRow } from './LocationTableRow';

export interface LocationItem {
  id: string;
  productName: string;
  sku: string;
  location: string;
  batchNumber: string;
  quantity: string;
  percentage: number;
  status: string;
  statusColor: string;
  rowClassName?: string;
}

interface LocationTableProps {
  title: string;
  items: LocationItem[];
  onSearch?: (query: string) => void;
  onItemAction?: (id: string) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  auditInfo?: string;
}

export const LocationTable = ({
  title,
  items,
  onSearch,
  onItemAction,
  onPrevious,
  onNext,
  auditInfo,
}: LocationTableProps) => {
  return (
    <div className="bg-white dark:bg-[#1a2530] rounded-xl border border-[#dbe0e6] dark:border-[#2d3947] overflow-hidden shadow-sm">
      <div className="p-6 border-b border-[#dbe0e6] dark:border-[#2d3947] flex justify-between items-center">
        <h3 className="text-lg font-bold">{title}</h3>
        <div className="flex gap-2">
          <div className="relative">
            <input
              className="pl-10 pr-4 py-2 bg-background-light dark:bg-[#2d3947] border-none rounded-lg text-sm focus:ring-1 focus:ring-primary w-64"
              placeholder="Filtrar productos..."
              type="text"
              onChange={(e) => onSearch?.(e.target.value)}
            />
            <Filter className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-background-light dark:bg-[#141d26] text-[#617589] text-xs font-bold uppercase tracking-wider">
              <th className="px-6 py-4">Producto / SKU</th>
              <th className="px-6 py-4">Ubicación</th>
              <th className="px-6 py-4">Lote #</th>
              <th className="px-6 py-4">Cantidad</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dbe0e6] dark:divide-[#2d3947]">
            {items.map((item) => (
              <LocationTableRow
                key={item.id}
                productName={item.productName}
                sku={item.sku}
                location={item.location}
                batchNumber={item.batchNumber}
                quantity={item.quantity}
                percentage={item.percentage}
                status={item.status}
                statusColor={item.statusColor}
                rowClassName={item.rowClassName}
                onAction={() => onItemAction?.(item.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-[#dbe0e6] dark:border-[#2d3947] bg-background-light dark:bg-[#141d26] flex justify-between items-center">
        <p className="text-xs text-[#617589] font-medium">{auditInfo}</p>
        <div className="flex gap-2">
          <button
            onClick={onPrevious}
            className="px-3 py-1 text-xs border border-[#dbe0e6] dark:border-[#2d3947] rounded hover:bg-white dark:hover:bg-[#2d3947] transition-colors"
          >
            Previous
          </button>
          <button
            onClick={onNext}
            className="px-3 py-1 text-xs bg-primary text-white rounded hover:bg-blue-600 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
