'use client';

import { UsersTableRow } from './UsersTableRow';
import type { UserItem } from '@/data/usersData';

export interface UsersTableProps {
  users: UserItem[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const UsersTable = ({ users, onEdit, onDelete }: UsersTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 uppercase text-xs font-bold tracking-wider">
          <tr>
            <th className="px-6 py-4">Usuario</th>
            <th className="px-6 py-4">Rol</th>
            <th className="px-6 py-4">Estado</th>
            <th className="px-6 py-4">Último Inicio de Sesión</th>
            <th className="px-6 py-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {users.map((user) => (
            <UsersTableRow
              key={user.id}
              user={user}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
