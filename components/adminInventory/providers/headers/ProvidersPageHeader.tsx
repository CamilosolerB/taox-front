'use client';

import { Building2 } from 'lucide-react';

export interface ProvidersPageHeaderProps {
  title?: string;
  description?: string;
  onAddEntity?: () => void;
}

export const ProvidersPageHeader = ({
  title = 'Directorio de Socios',
  description = 'Administra proveedores globales y clientes regionales de servicios de agua.',
  onAddEntity,
}: ProvidersPageHeaderProps) => {
  return (
    <div className="flex flex-wrap justify-between items-end gap-4 mb-6">
      <div className="flex flex-col gap-1">
        <p className="text-[#111418] dark:text-white text-3xl font-black leading-tight tracking-tight">
          {title}
        </p>
        <p className="text-[#617589] dark:text-gray-400 text-sm font-medium">{description}</p>
      </div>
      <button
        type="button"
        onClick={onAddEntity}
        className="flex items-center justify-center gap-2 rounded-lg h-11 px-6 bg-primary text-white text-sm font-bold shadow-sm hover:bg-primary/90 transition-all"
      >
        <Building2 className="w-5 h-5 text-lg" />
        <span>Añadir Nueva Entidad</span>
      </button>
    </div>
  );
};
