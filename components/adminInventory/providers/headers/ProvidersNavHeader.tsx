'use client';

import { Search, Bell, HelpCircle } from 'lucide-react';

export interface ProvidersNavHeaderProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export const ProvidersNavHeader = ({
  searchPlaceholder = 'Search partners by name, NIT or city...',
  searchValue = '',
  onSearchChange,
}: ProvidersNavHeaderProps) => {
  return (
    <header className="flex items-center justify-between bg-white dark:bg-background-dark px-8 py-4 border-b border-[#e5e7eb] dark:border-[#2d3748] sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <label className="flex flex-col min-w-64 max-w-md">
          <div className="flex w-full items-stretch rounded-lg h-10 border border-[#e5e7eb] dark:border-gray-700">
            <div className="text-[#617589] flex bg-white dark:bg-gray-800 items-center justify-center pl-4 rounded-l-lg">
              <Search className="w-5 h-5 text-xl" />
            </div>
            <input
              className="form-input flex w-full min-w-0 flex-1 border-none bg-white dark:bg-gray-800 text-[#111418] dark:text-white focus:ring-0 h-full placeholder:text-[#617589] px-4 rounded-r-lg text-sm"
              placeholder={searchPlaceholder}
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </div>
        </label>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="p-2 text-[#617589] dark:text-gray-400 hover:bg-[#f0f2f4] dark:hover:bg-gray-800 rounded-lg"
        >
          <Bell className="w-5 h-5" />
        </button>
        <button
          type="button"
          className="p-2 text-[#617589] dark:text-gray-400 hover:bg-[#f0f2f4] dark:hover:bg-gray-800 rounded-lg"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
