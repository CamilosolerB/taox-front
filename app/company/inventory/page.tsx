'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/adminInventory/utils';
import {
  InventoryFilters,
  InventoryHeader,
  InventoryTabs,
  InventoryTable,
  InventoryPagination,
} from '@/components/adminInventory/inventory';
import {
  categories,
  stockStatuses,
  locations as defaultLocations,
  inventoryTabs,
} from '@/data/inventoryData';
import { InventoryProvider, useInventoryStore } from '@/providers/InventoryProvider';
import { useLocations } from '@/hooks';

const ITEMS_PER_PAGE = 4;

function InventoryPageContent() {
  const {
    items,
    isLoading,
    isStockLoading,
    error,
    refetch,
    companyId,
  } = useInventoryStore();

  const { useGetLocations } = useLocations(companyId);
  const locationsQuery = useGetLocations();
  const locationsFromApi = locationsQuery.data?.map((loc) => loc.ubicacion) ?? [];
  const locations = locationsFromApi.length > 0
    ? ['Todos los Almacenes', ...locationsFromApi]
    : defaultLocations;

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const loading = isLoading || isStockLoading;
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = items.slice(start, start + ITEMS_PER_PAGE);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const handleEditItem = (id: string) => {
    // TODO: abrir modal de edición (UpdateProductDTO)
    console.log('Editar artículo:', id);
  };

  if (!companyId) {
    return (
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-200">
        <Sidebar>
          <main className="flex-1 overflow-auto p-8 flex items-center justify-center">
            <p className="text-slate-500">Inicia sesión para ver el inventario.</p>
          </main>
        </Sidebar>
      </div>
    );
  }

  if (loading && items.length === 0) {
    return (
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-200">
        <Sidebar>
          <main className="flex-1 overflow-auto p-8 flex items-center justify-center">
            <p className="text-slate-500">Cargando inventario…</p>
          </main>
        </Sidebar>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-200">
        <Sidebar>
          <main className="flex-1 overflow-auto p-8 flex flex-col items-center justify-center gap-4">
            <p className="text-red-500">Error al cargar inventario.</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium"
            >
              Reintentar
            </button>
          </main>
        </Sidebar>
      </div>
    );
  }

  const lowStockItems = items.filter((i) => i.minStock > 0 && i.currentStock < i.minStock).length;

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-200">
      <Sidebar>
        <main className="flex-1 overflow-auto p-8 flex gap-8">
          <InventoryFilters
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
            statuses={stockStatuses}
            selectedStatuses={selectedStatuses}
            onStatusChange={handleStatusChange}
            locations={locations}
            selectedLocation={selectedLocation}
            onLocationChange={setSelectedLocation}
            totalItems={totalItems}
            lowStockItems={lowStockItems}
          />

          <div className="flex-1 flex flex-col gap-6">
            <InventoryHeader
              title="Químicos & Stock de Repuestos"
              breadcrumb="Inventory"
            />

            <InventoryTabs
              tabs={inventoryTabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            {loading && items.length > 0 ? (
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <span className="inline-block w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                Actualizando…
              </div>
            ) : null}

            <InventoryTable
              items={paginatedItems}
              onEdit={handleEditItem}
            />

            <InventoryPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setCurrentPage}
            />
          </div>
        </main>
      </Sidebar>
    </div>
  );
}

const InventoryCompanyPage = () => (
  <InventoryProvider>
    <InventoryPageContent />
  </InventoryProvider>
);

export default InventoryCompanyPage;
