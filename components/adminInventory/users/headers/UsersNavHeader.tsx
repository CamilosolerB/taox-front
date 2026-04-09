'use client';

import { Search, Bell } from 'lucide-react';

export interface UsersNavHeaderProps {
  title?: string;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  userInitials?: string;
}

export const UsersNavHeader = ({
  title = 'Gestión de Usuarios y Roles',
  searchPlaceholder = 'Buscar usuarios...',
  searchValue = '',
  onSearchChange,
  userInitials = 'JD',
}: UsersNavHeaderProps) => {
  return (
    <header className="h-16 flex items-center justify-between px-8 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <h1 className="text-xl font-semibold text-slate-800 dark:text-white">{title}</h1>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            className="pl-10 pr-4 py-1.5 bg-slate-100 dark:bg-slate-800 border-none rounded-full text-sm focus:ring-2 focus:ring-primary w-64 text-slate-700 dark:text-slate-200"
            placeholder={searchPlaceholder}
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="relative p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
        </button>
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">
          {userInitials}
        </div>
      </div>
    </header>
  );
};
