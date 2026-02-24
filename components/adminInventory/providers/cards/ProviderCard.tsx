'use client';

import { MapPin, Phone, Mail, FileText, MoreHorizontal } from 'lucide-react';
import type { ProviderItem } from '@/data/providersData';

export interface ProviderCardProps {
  provider: ProviderItem;
  onViewContracts?: (id: string) => void;
  onMore?: (id: string) => void;
}

const roleBadgeClass: Record<ProviderItem['role'], string> = {
  Supplier: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
  Client: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400',
};

export const ProviderCard = ({ provider, onViewContracts, onMore }: ProviderCardProps) => {
  const isInactive = provider.status === 'INACTIVE';

  return (
    <div
      className={`bg-white dark:bg-background-dark border border-[#e5e7eb] dark:border-gray-700 rounded-xl overflow-hidden card-shadow hover:ring-2 hover:ring-primary/20 transition-all flex flex-col ${isInactive ? 'opacity-80' : ''}`}
    >
      <div className="p-5 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div
            className={`size-12 rounded-xl flex items-center justify-center font-black text-lg ${provider.avatarClass ?? 'bg-primary/10 text-primary'}`}
          >
            {provider.initials}
          </div>
          <div className="flex flex-col items-end gap-2">
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                isInactive
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
              }`}
            >
              <span
                className={`size-1.5 rounded-full ${isInactive ? 'bg-gray-400' : 'bg-green-500'}`}
              />
              {provider.status}
            </span>
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold tracking-tight uppercase ${roleBadgeClass[provider.role]}`}
            >
              {provider.role}
            </span>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-[#111418] dark:text-white font-bold text-lg leading-tight">
            {provider.name}
          </h3>
          <p className="text-xs text-[#617589] dark:text-gray-400 font-medium">NIT: {provider.nit}</p>
        </div>
        <div className="space-y-2.5 mb-6">
          <div className="flex items-center gap-2 text-sm text-[#4a5568] dark:text-gray-300">
            <MapPin className="w-5 h-5 text-lg text-[#617589] shrink-0" />
            <span>{provider.city}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#4a5568] dark:text-gray-300">
            <Phone className="w-5 h-5 text-lg text-[#617589] shrink-0" />
            <span>{provider.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#4a5568] dark:text-gray-300 truncate">
            <Mail className="w-5 h-5 text-lg text-[#617589] shrink-0" />
            <span className="truncate">{provider.email}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#f0f2f4] dark:border-gray-700">
          <div>
            <p className="text-[10px] text-[#617589] dark:text-gray-500 font-bold uppercase tracking-wider">
              Active Contracts
            </p>
            <p
              className={`text-sm font-bold ${provider.activeContractsMuted ? 'text-gray-400' : 'text-[#111418] dark:text-white'}`}
            >
              {provider.activeContracts}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-[#617589] dark:text-gray-500 font-bold uppercase tracking-wider">
              Last Order
            </p>
            <p className="text-sm font-bold text-[#111418] dark:text-white">
              {provider.lastOrder}
            </p>
          </div>
        </div>
      </div>
      <div className="px-5 py-3 bg-[#f9fafb] dark:bg-gray-800/50 flex items-center justify-between border-t border-[#e5e7eb] dark:border-gray-700">
        <button
          type="button"
          onClick={() => onViewContracts?.(provider.id)}
          className="text-primary text-xs font-bold hover:underline flex items-center gap-1"
        >
          <FileText className="w-4 h-4 text-sm" />
          View Contracts
        </button>
        <button
          type="button"
          onClick={() => onMore?.(provider.id)}
          className="p-1.5 text-[#617589] dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 rounded-md transition-colors shadow-sm"
        >
          <MoreHorizontal className="w-5 h-5 text-xl" />
        </button>
      </div>
    </div>
  );
};
