'use client';

import { Calendar } from 'lucide-react';

export interface DateRangeOption {
  value: string;
  label: string;
}

export interface MovementsFiltersProps {
  /** Valor actual del rango de fechas */
  dateRange: string;
  /** Opciones del select de rango (ej: Últimos 30 Días, Este Mes...) */
  dateRangeOptions: DateRangeOption[];
  onDateRangeChange: (value: string) => void;
  /** Valor actual del tipo de movimiento */
  movementType: string;
  /** Opciones del tipo (Todos, Entrada, Salida) */
  movementTypeOptions: { value: string; label: string }[];
  onMovementTypeChange: (value: string) => void;
  /** Valor actual de la categoría */
  category: string;
  /** Opciones de categoría */
  categoryOptions: { value: string; label: string }[];
  onCategoryChange: (value: string) => void;
  onClearFilters: () => void;
}

export const MovementsFilters = ({
  dateRange,
  dateRangeOptions,
  onDateRangeChange,
  movementType,
  movementTypeOptions,
  onMovementTypeChange,
  category,
  categoryOptions,
  onCategoryChange,
  onClearFilters,
}: MovementsFiltersProps) => {
  return (
    <div className="p-5 border-b border-[#f0f2f4] dark:border-gray-800 flex flex-wrap items-center gap-4">
      <div className="flex flex-col gap-1 min-w-[200px]">
        <label className="text-xs font-bold text-[#617589] uppercase tracking-wider">
          Rango de Fechas
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#617589] w-4.5 h-4.5 text-[18px]" />
          <select
            className="w-full bg-[#f0f2f4] dark:bg-gray-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm appearance-none focus:ring-2 focus:ring-primary transition-all"
            value={dateRange}
            onChange={(e) => onDateRangeChange(e.target.value)}
          >
            {dateRangeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-1 min-w-[150px]">
        <label className="text-xs font-bold text-[#617589] uppercase tracking-wider">Tipo</label>
        <select
          className="bg-[#f0f2f4] dark:bg-gray-800 border-none rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary transition-all"
          value={movementType}
          onChange={(e) => onMovementTypeChange(e.target.value)}
        >
          {movementTypeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1 min-w-[150px]">
        <label className="text-xs font-bold text-[#617589] uppercase tracking-wider">
          Categoría
        </label>
        <select
          className="bg-[#f0f2f4] dark:bg-gray-800 border-none rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary transition-all"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          {categoryOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1 flex items-end justify-end">
        <button
          type="button"
          onClick={onClearFilters}
          className="text-primary text-sm font-bold flex items-center gap-1 hover:underline"
        >
          Limpiar Filtros
        </button>
      </div>
    </div>
  );
};
