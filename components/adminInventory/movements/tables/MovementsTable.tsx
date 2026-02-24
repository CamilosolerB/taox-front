'use client';

import { MovementsTableRow } from './MovementsTableRow';
import type { MovementItem } from '@/data/movementsData';

export interface MovementsTableProps {
  movements: MovementItem[];
  onActionClick?: (id: string) => void;
}

export const MovementsTable = ({ movements, onActionClick }: MovementsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800/50">
            <th className="px-6 py-4 text-[#617589] text-xs font-bold uppercase tracking-wider">
              Date & Time
            </th>
            <th className="px-6 py-4 text-[#617589] text-xs font-bold uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-4 text-[#617589] text-xs font-bold uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-4 text-[#617589] text-xs font-bold uppercase tracking-wider text-right">
              Quantity
            </th>
            <th className="px-6 py-4 text-[#617589] text-xs font-bold uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-4 text-[#617589] text-xs font-bold uppercase tracking-wider" />
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f0f2f4] dark:divide-gray-800">
          {movements.map((movement) => (
            <MovementsTableRow
              key={movement.id}
              movement={movement}
              onActionClick={onActionClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
