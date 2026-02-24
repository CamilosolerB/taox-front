'use client';

import { Menu, Search, Bell, UserCircle } from 'lucide-react';

export interface MovementsNavHeaderProps {
  /** Título en la barra (ej: "Historial de Movimientos") */
  title?: string;
  /** Placeholder del buscador */
  searchPlaceholder?: string;
  /** Valor controlado del input de búsqueda (opcional) */
  searchValue?: string;
  /** Callback cuando cambia la búsqueda (opcional, para estado controlado) */
  onSearchChange?: (value: string) => void;
  /** Nombre del usuario a mostrar */
  userName?: string;
}

export const MovementsNavHeader = ({
  title = 'Historial de Movimientos',
  searchPlaceholder = 'Buscar por producto o usuario...',
  searchValue = '',
  onSearchChange,
  userName = 'Usuario Admin',
}: MovementsNavHeaderProps) => {
  return (
    <header className="h-16 border-b border-[#f0f2f4] dark:border-gray-800 bg-white dark:bg-background-dark flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-6 flex-1">
        <div className="lg:hidden">
          <Menu className="text-[#111418] dark:text-white cursor-pointer w-6 h-6" />
        </div>
        <h2 className="text-[#111418] dark:text-white text-lg font-bold">{title}</h2>
        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#617589] w-5 h-5 text-[20px]" />
          <input
            className="w-full bg-[#f0f2f4] dark:bg-gray-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary transition-all"
            placeholder={searchPlaceholder}
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#f0f2f4] dark:bg-gray-800 text-[#111418] dark:text-white hover:bg-gray-200 transition-colors relative"
        >
          <Bell className="w-5 h-5 text-[20px]" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-800" />
        </button>
        <button
          type="button"
          className="flex items-center gap-2 h-10 px-3 rounded-lg bg-[#f0f2f4] dark:bg-gray-800 text-[#111418] dark:text-white hover:bg-gray-200 transition-colors"
        >
          <UserCircle className="w-6 h-6 text-[24px]" />
          <span className="text-sm font-bold hidden sm:inline">{userName}</span>
        </button>
      </div>
    </header>
  );
};
