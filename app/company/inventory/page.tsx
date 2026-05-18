'use client';

import { useState, useMemo } from 'react';

import {
  InventoryFilters,
  InventoryTabs,
  InventoryTable,
  InventoryPagination,
} from '@/components/adminInventory/inventory';
import {
  categories,
  stockStatuses,
  inventoryTabs,
} from '@/data/inventoryData';
import { InventoryProvider, useInventoryStore } from '@/providers/InventoryProvider';
import { WarehouseSelector } from '@/components/adminInventory/inventory/WarehouseSelector';
import { useWarehouses } from '@/hooks/useWarehouses';
import { useStock } from '@/hooks/useStock';
import { ChevronRight, Home, LayoutGrid, AlertTriangle } from 'lucide-react';
import { mapProductToStockItem } from '@/lib/mapProductToStockItem';
import type { ProcessResponseDTO } from '@/interfaces/types';
import { ProductDetailModal } from '@/components/adminInventory/modals';

const ITEMS_PER_PAGE = 10;

function InventoryPageContent() {
  const {
    items: globalItems,
    isLoading: isGlobalLoading,
    isStockLoading: isGlobalStockLoading,
    error: globalError,
    companyId,
  } = useInventoryStore();

  const [currentWarehouse, setCurrentWarehouse] = useState<ProcessResponseDTO | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const { useGetAllWarehouses } = useWarehouses(companyId);
  const { data: warehouses = [] } = useGetAllWarehouses();
  
  const { useGetStockWarehouse } = useStock(companyId);
  const { data: stockData = [] } = useGetStockWarehouse();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedItemDetail, setSelectedItemDetail] = useState<any | null>(null);

  // Filter stock items by current selected warehouse
  const stockItems = useMemo(() => {
    if (!currentWarehouse) return globalItems;
    return globalItems.filter(item => item.warehouse_id === currentWarehouse.id_proceso);
  }, [globalItems, currentWarehouse]);

  // Get unique categories from current stock items
  const productCategories = useMemo(() => {
    const cats = new Set(stockItems.map(p => p.category).filter(Boolean));
    return Array.from(cats).sort();
  }, [stockItems]);

  // Filter items based on search, categories and statuses
  const displayItems = useMemo(() => {
    let items = stockItems;
    
    // Filter by tab (all, critical, low)
    if (activeTab === 'critical') {
      items = items.filter(item => item.status.label === 'Crítico');
    } else if (activeTab === 'low') {
      items = items.filter(item => item.status.label === 'Bajo');
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.name?.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query) ||
        item.code?.toLowerCase().includes(query)
      );
    }
    
    // Filter by categories
    if (selectedCategories.length > 0) {
      items = items.filter(item => selectedCategories.includes(item.category));
    }
    
    return items;
  }, [stockItems, activeTab, searchQuery, selectedCategories]);

  // Calculate critical stock count
  const criticalStockCount = useMemo(() => {
    return stockItems.filter(item => item.status.label === 'Crítico').length;
  }, [stockItems]);

  const loading = isGlobalLoading || isGlobalStockLoading;
  const totalItems = displayItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = displayItems.slice(start, start + ITEMS_PER_PAGE);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  if (!companyId) {
    return (
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-200">
        <>
          <main className="flex-1 overflow-auto p-8 flex items-center justify-center">
            <p className="text-slate-500">Inicia sesión para ver el inventario.</p>
          </main>
        </>
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-200">
      <>
        <main className="flex-1 overflow-auto p-8 flex flex-col gap-8">
          
          {/* Breadcrumbs & Header */}
          <div className="flex flex-col gap-4">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-emerald-500/70 font-medium">
              <button 
                onClick={() => setCurrentWarehouse(null)}
                className="flex items-center gap-1 hover:text-emerald-400 transition-colors"
              >
                <Home size={14} />
                <span>Inventario</span>
              </button>
              {currentWarehouse && (
                <>
                  <ChevronRight size={14} />
                  <span className="text-slate-200">{currentWarehouse.nombre}</span>
                </>
              )}
            </nav>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  {currentWarehouse ? currentWarehouse.nombre : "Gestión de Inventario"}
                </h1>
                <p className="text-slate-400 mt-1">
                  {currentWarehouse 
                    ? `Visualizando inventario de ${currentWarehouse.nombre}`
                    : "Todos los productos de tu empresa"}
                </p>
              </div>
              {!currentWarehouse && (
                <div className="flex items-center gap-4">
                  {criticalStockCount > 0 && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg border border-red-500/20">
                      <AlertTriangle size={18} />
                      <span className="font-semibold">{criticalStockCount} Críticos</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
                    <LayoutGrid size={18} />
                    <span className="font-semibold">{warehouses.length} Almacenes</span>
                  </div>
                </div>
              )}
            </div>
          </div>

              {!currentWarehouse ? (
            <div className="flex-1">
              <WarehouseSelector 
                warehouses={warehouses} 
                onSelect={setCurrentWarehouse}
                isLoading={!companyId}
              />
            </div>
          ) : (
            <div className="flex gap-8">
              <InventoryFilters
                categories={productCategories}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
                statuses={stockStatuses}
                selectedStatuses={selectedStatuses}
                onStatusChange={handleStatusChange}
                locations={[]}
                selectedLocation="Todos"
                onLocationChange={() => {}}
                totalItems={totalItems}
                lowStockItems={criticalStockCount}
              />

              <div className="flex-1 flex flex-col gap-6">
                <InventoryTabs
                  tabs={inventoryTabs}
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                />

                {loading ? (
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <span className="inline-block w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    Cargando inventario...
                  </div>
                ) : (
                  <InventoryTable
                    items={paginatedItems}
                    onEdit={() => {}}
                    onViewDetail={(item) => {
                      setSelectedItemDetail(item);
                      setIsDetailOpen(true);
                    }}
                  />
                )}

                <InventoryPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  itemsPerPage={ITEMS_PER_PAGE}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          )}
        </main>

        <ProductDetailModal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          item={selectedItemDetail}
        />
      </>
    </div>
  );
}

const InventoryCompanyPage = () => (
  <InventoryProvider>
    <InventoryPageContent />
  </InventoryProvider>
);

export default InventoryCompanyPage;
