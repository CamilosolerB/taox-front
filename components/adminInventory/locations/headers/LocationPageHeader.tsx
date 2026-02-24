'use client';

import { History, ArrowRightLeft } from 'lucide-react';

interface LocationPageHeaderProps {
  title: string;
  description: string;
  onAuditHistory?: () => void;
  onTransferStock?: () => void;
}

export const LocationPageHeader = ({
  title,
  description,
  onAuditHistory,
  onTransferStock,
}: LocationPageHeaderProps) => {
  return (
    <div className="flex flex-wrap justify-between items-end gap-3 mb-8">
      <div className="flex flex-col gap-1">
        <p className="text-[#111418] dark:text-white text-3xl font-black leading-tight tracking-tight">
          {title}
        </p>
        <p className="text-[#617589] text-base font-normal">{description}</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onAuditHistory}
          className="flex items-center justify-center rounded-lg h-10 px-4 bg-[#f0f2f4] dark:bg-[#2d3947] text-[#111418] dark:text-white text-sm font-bold border border-[#dbe0e6] dark:border-[#3a4755] hover:bg-gray-200 dark:hover:bg-[#3a4755] transition-colors"
        >
          <History className="mr-2 text-lg w-5 h-5" /> Audit History
        </button>
        <button
          onClick={onTransferStock}
          className="flex items-center justify-center rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold tracking-[0.015em] shadow-lg shadow-primary/20 hover:bg-blue-600 transition-colors"
        >
          <ArrowRightLeft className="mr-2 text-lg w-5 h-5" /> Transfer Stock
        </button>
      </div>
    </div>
  );
};
