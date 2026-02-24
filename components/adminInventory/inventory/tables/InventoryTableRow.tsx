'use client';

import { Edit2 } from 'lucide-react';

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

interface InventoryTableRowProps {
  item: StockItem;
  onEdit?: (id: string) => void;
}

export const InventoryTableRow = ({ item, onEdit }: InventoryTableRowProps) => {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <td className="px-6 py-4 text-sm font-mono text-[#617589]">{item.code}</td>
      <td className="px-6 py-4 text-sm font-bold">{item.name}</td>
      <td className="px-6 py-4">
        <span
          className={`px-2.5 py-1 rounded text-xs font-bold ${item.categoryColor}`}
        >
          {item.category}
        </span>
      </td>
      <td
        className={`px-6 py-4 text-sm font-bold ${
          item.currentStock < item.minStock ? 'text-red-600' : 'text-green-600'
        }`}
      >
        {item.currentStock} Units
      </td>
      <td className="px-6 py-4 text-sm text-[#617589]">{item.minStock} Units</td>
      <td className="px-6 py-4">
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full w-fit ${item.status.backgroundColor}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${item.status.dotColor}`}></div>
          <span className={`text-[10px] font-bold uppercase ${item.status.textColor}`}>
            {item.status.label}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <button
          onClick={() => onEdit?.(item.id)}
          className="text-primary hover:text-blue-800 transition-colors"
        >
          <Edit2 className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
};
