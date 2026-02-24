'use client';

import { Beaker, Sliders, Zap, MoreVertical, LucideIcon } from 'lucide-react';
import type { MovementItem } from '@/data/movementsData';

const iconMap: Record<MovementItem['productIcon'], LucideIcon> = {
  beaker: Beaker,
  sliders: Sliders,
  zap: Zap,
};

const iconStyles: Record<MovementItem['productIcon'], string> = {
  beaker: 'bg-blue-100 dark:bg-blue-900/30 text-primary',
  sliders: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600',
  zap: 'bg-blue-100 dark:bg-blue-900/30 text-primary',
};

export interface MovementsTableRowProps {
  movement: MovementItem;
  onActionClick?: (id: string) => void;
}

export const MovementsTableRow = ({ movement, onActionClick }: MovementsTableRowProps) => {
  const Icon = iconMap[movement.productIcon];
  const iconStyle = iconStyles[movement.productIcon];
  const isEntry = movement.type === 'ENTRY';

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-[#111418] dark:text-white">
            {movement.date}
          </span>
          <span className="text-xs text-[#617589]">{movement.time}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded flex items-center justify-center ${iconStyle}`}
          >
            <Icon className="w-4.5 h-4.5 text-[18px]" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[#111418] dark:text-white">
              {movement.productName}
            </span>
            <span className="text-xs text-[#617589]">SKU: {movement.productSku}</span>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-bold ${
            isEntry
              ? 'bg-[#e7f6ed] text-[#078838]'
              : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
          }`}
        >
          {movement.type}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <span
          className={`text-sm font-bold ${
            isEntry ? 'text-[#078838]' : 'text-orange-700 dark:text-orange-400'
          }`}
        >
          {movement.quantity}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold uppercase ${
              movement.userColor ?? 'bg-primary/20 text-primary'
            }`}
          >
            {movement.userInitials}
          </div>
          <span className="text-sm text-[#111418] dark:text-white">{movement.userName}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-right">
        <button
          type="button"
          onClick={() => onActionClick?.(movement.id)}
          className="text-[#617589] hover:text-primary"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
};
