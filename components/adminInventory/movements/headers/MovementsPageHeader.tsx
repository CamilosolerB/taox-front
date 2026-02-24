'use client';

import { Download, FileText } from 'lucide-react';

export interface MovementsPageHeaderProps {
  title?: string;
  description?: string;
  onExportExcel?: () => void;
  onExportPdf?: () => void;
}

export const MovementsPageHeader = ({
  title = 'Historial de Movimientos & Reportes',
  description = 'Pista de auditoría y análisis del flujo de inventario para Planta Alfa.',
  onExportExcel,
  onExportPdf,
}: MovementsPageHeaderProps) => {
  return (
    <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-[#111418] dark:text-white text-3xl font-black tracking-tight">
          {title}
        </h1>
        <p className="text-[#617589] text-base">{description}</p>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onExportExcel}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 transition-all"
        >
          <Download className="w-5 h-5 text-[20px]" />
          Exportar Excel
        </button>
        <button
          type="button"
          onClick={onExportPdf}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:opacity-90 transition-all shadow-sm"
        >
          <FileText className="w-5 h-5 text-[20px]" />
          Exportar PDF
        </button>
      </div>
    </div>
  );
};
