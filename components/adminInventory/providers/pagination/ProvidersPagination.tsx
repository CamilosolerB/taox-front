'use client';

export interface ProvidersPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  showingCount: number;
  onPageChange: (page: number) => void;
}

export const ProvidersPagination = ({
  currentPage,
  totalPages,
  totalItems,
  showingCount,
  onPageChange,
}: ProvidersPaginationProps) => {
  return (
    <div className="flex items-center justify-between mb-10">
      <p className="text-sm text-[#617589] dark:text-gray-400 font-medium">
        Mostrando
        <span className="text-[#111418] dark:text-white font-bold"> {showingCount}</span> de
        <span className="text-[#111418] dark:text-white font-bold"> {totalItems}</span>
        proveedores
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          className="px-4 py-2 border border-[#e5e7eb] dark:border-gray-700 rounded-lg text-xs font-bold text-[#617589] dark:text-gray-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 shadow-sm"
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
            className={`px-4 py-2 rounded-lg text-xs font-bold shadow-sm ${
              currentPage === page
                ? 'bg-primary text-white'
                : 'border border-[#e5e7eb] dark:border-gray-700 text-[#617589] dark:text-gray-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {page}
          </button>
        ))}
        <button
          type="button"
          className="px-4 py-2 border border-[#e5e7eb] dark:border-gray-700 rounded-lg text-xs font-bold text-[#617589] dark:text-gray-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
