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
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="px-6 py-4 bg-background-light dark:bg-gray-800/30 border-t border-[#dbe0e6] dark:border-gray-700 flex items-center justify-between">
      <p className="text-xs text-[#617589]">
        Showing {startItem} to {endItem} of {totalItems.toLocaleString()} items
      </p>
      <div className="flex gap-2">
        <button
          className="w-8 h-8 flex items-center justify-center rounded border border-[#dbe0e6] dark:border-gray-600 hover:bg-white dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft className="w-4 h-4 text-sm" />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight className="w-4 h-4 text-sm" />
        </button>
      </div>
    </div>
  );
};
