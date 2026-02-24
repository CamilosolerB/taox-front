'use client';

import { InventoryTableRow } from './InventoryTableRow';

interface StockItem {
  id: string;
  code: string;
  name: string;
  category: string;
  categoryColor: string;
  currentStock: number;
  minStock: number;
  status: {
    label: string;
    backgroundColor: string;
    textColor: string;
    dotColor: string;
  };
}

interface InventoryTableProps {
  items: StockItem[];
  onEdit?: (id: string) => void;
}

export const InventoryTable = ({ items, onEdit }: InventoryTableProps) => {
  return (
    <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-[#dbe0e6] dark:border-gray-700 shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-background-light dark:bg-gray-800/50">
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#617589]">
              Código
            </th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#617589]">
              Nombre
            </th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#617589]">
              Categoría
            </th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#617589]">
              Current Stock
            </th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#617589]">
              Min Stock
            </th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#617589]">
              Status
            </th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#617589]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#dbe0e6] dark:divide-gray-700">
          {items.map((item) => (
            <InventoryTableRow key={item.id} item={item} onEdit={onEdit} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
