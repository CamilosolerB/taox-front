'use client';

import { UserPlus } from 'lucide-react';

export interface UsersTableHeaderProps {
  title?: string;
  description?: string;
  onCreateUser?: () => void;
}

export const UsersTableHeader = ({
  title = 'Directorio de Usuarios',
  description = 'Administra los miembros del equipo de tratamiento de agua y permisos.',
  onCreateUser,
}: UsersTableHeaderProps) => {
  return (
    <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
      </div>
      <button
        type="button"
        onClick={onCreateUser}
        className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-all shadow-lg shadow-primary/20"
      >
        <UserPlus className="mr-2 w-4 h-4" />
        Crear Usuario
      </button>
    </div>
  );
};
