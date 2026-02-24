'use client';

export interface UsersPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  showingCount: number;
  onPageChange: (page: number) => void;
}

export const UsersPagination = ({
  currentPage,
  totalPages,
  totalItems,
  showingCount,
  onPageChange,
}: UsersPaginationProps) => {
  return (
    <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
      <span className="text-sm text-slate-500 dark:text-slate-400">
        Mostrando {showingCount} de {totalItems} usuarios
      </span>
      <div className="flex space-x-1">
        <button
          type="button"
          className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              currentPage === page
                ? 'bg-primary text-white border border-primary'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            {page}
          </button>
        ))}
        <button
          type="button"
          className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
