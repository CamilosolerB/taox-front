'use client';

import { Pencil, Trash2 } from 'lucide-react';
import type { UserItem } from '@/data/usersData';

export interface UsersTableRowProps {
  user: UserItem;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const UsersTableRow = ({ user, onEdit, onDelete }: UsersTableRowProps) => {
  const isActive = user.status === 'Active';

  return (
    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-bold mr-3">
            {user.initials}
          </div>
          <div>
            <div className="font-medium text-slate-900 dark:text-white">{user.name}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">{user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${user.roleBadgeClass}`}
        >
          {user.role}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center text-sm">
          <span
            className={`h-2 w-2 rounded-full mr-2 ${isActive ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`}
          />
          {user.status}
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
        {user.lastLogin}
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end space-x-2">
          <button
            type="button"
            onClick={() => onEdit?.(user.id)}
            className="p-1 hover:text-primary transition-colors"
          >
            <Pencil className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => onDelete?.(user.id)}
            className="p-1 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};
