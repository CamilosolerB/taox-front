'use client';

interface Tab {
  id: string;
  label: string;
  badge?: number;
}

interface InventoryTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const InventoryTabs = ({ tabs, activeTab, onTabChange }: InventoryTabsProps) => {
  return (
    <div className="flex border-b border-[#dbe0e6] dark:border-gray-700">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-3 border-b-2 font-bold text-sm flex items-center gap-2 transition-all ${
            activeTab === tab.id
              ? 'border-primary text-primary'
              : 'border-transparent text-[#617589] hover:text-primary'
          }`}
        >
          {tab.label}
          {tab.badge !== undefined && (
            <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};
