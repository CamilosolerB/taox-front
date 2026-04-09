'use client';

import { Filter, CheckCircle2, Grid3X3, List, Download } from 'lucide-react';

export type ViewMode = 'grid' | 'list';

export interface ProvidersToolbarProps {
  cityLabel?: string;
  statusLabel?: string;
  onCityClick?: () => void;
  onStatusClick?: () => void;
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
  onExportCsv?: () => void;
}

export const ProvidersToolbar = ({
  cityLabel = 'Ciudad: Todas',
  statusLabel = 'Estado: Activo',
  onCityClick,
  onStatusClick,
  viewMode = 'grid',
  onViewModeChange,
  onExportCsv,
}: ProvidersToolbarProps) => {
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCityClick}
          className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-[#e5e7eb] dark:border-gray-700 cursor-pointer text-sm font-medium text-[#111418] dark:text-white shadow-sm"
        >
          <Filter className="w-5 h-5 text-lg text-[#617589]" />
          <span>{cityLabel}</span>
        </button>
        <button
          type="button"
          onClick={onStatusClick}
          className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-[#e5e7eb] dark:border-gray-700 cursor-pointer text-sm font-medium text-[#111418] dark:text-white shadow-sm"
        >
          <CheckCircle2 className="w-5 h-5 text-lg text-green-500" />
          <span>{statusLabel}</span>
        </button>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onViewModeChange?.('grid')}
          className={`p-2 ${viewMode === 'grid' ? 'text-primary' : 'text-[#617589] dark:text-gray-400 hover:text-primary'}`}
        >
          <Grid3X3 className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => onViewModeChange?.('list')}
          className={`p-2 ${viewMode === 'list' ? 'text-primary' : 'text-[#617589] dark:text-gray-400 hover:text-primary'}`}
        >
          <List className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={onExportCsv}
          className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-[#e5e7eb] dark:border-gray-700 px-4 h-9 rounded-lg text-sm font-bold text-[#111418] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
        >
          <Download className="w-5 h-5 text-lg" />
          <span>Exportar CSV</span>
        </button>
      </div>
    </div>
  );
};
