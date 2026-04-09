'use client';

export interface MovementsPaginationProps {
  /** Página actual (1-based) */
  currentPage: number;
  /** Total de páginas */
  totalPages: number;
  /** Total de resultados */
  totalResults: number;
  /** Tamaño de página (para calcular "Mostrando X a Y de Z") */
  pageSize: number;
  onPageChange: (page: number) => void;
}

export const MovementsPagination = ({
  currentPage,
  totalPages,
  totalResults,
  pageSize,
  onPageChange,
}: MovementsPaginationProps) => {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalResults);

  return (
    <div className="p-4 border-t border-[#f0f2f4] dark:border-gray-800 flex items-center justify-between">
      <p className="text-xs text-[#617589] font-medium">
        Mostrando {start} a {end} de {totalResults.toLocaleString()} resultados
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          className="px-3 py-1 text-sm font-bold border border-[#dbe0e6] dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
        <button
          type="button"
          className="px-3 py-1 text-sm font-bold border border-[#dbe0e6] dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
