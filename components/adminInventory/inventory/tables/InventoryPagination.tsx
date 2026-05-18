'use client';

import { ChevronRight, ChevronLeft } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const InventoryPagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Sliding window de máximo 10 páginas
  const maxVisiblePages = 10;
  let startPage = Math.max(1, currentPage - 5);
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="px-6 py-4 bg-background-light dark:bg-gray-800/30 border-t border-[#dbe0e6] dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
      <p className="text-xs text-[#617589]">
        Mostrando {startItem} a {endItem} de {totalItems.toLocaleString()} items
      </p>
      <div className="flex gap-2">
        <button
          className="w-8 h-8 flex items-center justify-center rounded border border-[#dbe0e6] dark:border-gray-600 hover:bg-white dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft className="w-4 h-4 text-sm" />
        </button>

        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 flex items-center justify-center rounded text-xs font-bold ${
              currentPage === page
                ? 'border border-primary bg-primary text-white'
                : 'border border-[#dbe0e6] dark:border-gray-600 hover:bg-white dark:hover:bg-gray-700'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          className="w-8 h-8 flex items-center justify-center rounded border border-[#dbe0e6] dark:border-gray-600 hover:bg-white dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight className="w-4 h-4 text-sm" />
        </button>
      </div>
    </div>
  );
};
