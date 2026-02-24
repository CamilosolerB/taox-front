'use client';

import { Truck, User } from 'lucide-react';

export interface ProviderTabItem {
  id: string;
  label: string;
  count: number;
  icon: 'truck' | 'user';
}

export interface ProvidersTabsProps {
  tabs: ProviderTabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const iconMap = { truck: Truck, user: User };

export const ProvidersTabs = ({ tabs, activeTab, onTabChange }: ProvidersTabsProps) => {
  return (
    <div className="mb-6 border-b border-[#dbe0e6] dark:border-gray-700">
      <div className="flex gap-8">
        {tabs.map((tab) => {
          const Icon = iconMap[tab.icon];
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 border-b-2 pb-3 px-1 transition-all ${
                isActive
                  ? 'border-primary text-primary'
                  : 'border-transparent text-[#617589] dark:text-gray-400 hover:text-primary'
              }`}
            >
              <Icon className="w-5 h-5 text-lg" />
              <p className="text-sm font-bold">{tab.label}</p>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'bg-gray-100 dark:bg-gray-800 text-[#617589]'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
