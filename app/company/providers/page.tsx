'use client';

import { useMemo, useState } from 'react';
import { Sidebar } from '@/components/adminInventory/utils';
import {
  ProvidersNavHeader,
  ProvidersPageHeader,
  ProvidersTabs,
  ProvidersToolbar,
  ProvidersGrid,
  ProvidersPagination,
  ProvidersStatsGrid,
} from '@/components/adminInventory/providers';
import {
  providerTabs,
  cityOptions,
  statusOptions,
} from '@/data/providersData';
import { useAuth, useProviders } from '@/hooks';
import { mapProviderToItem } from '@/lib/mapProviderToItem';
import {
  BarChart3,
  TrendingUp,
  ClipboardCheck,
  Calendar,
  Building,
  Map,
} from 'lucide-react';

const PAGE_SIZE = 4;

const CompanyProviderPage = () => {
  const { companyId } = useAuth();
  const { useGetProviders } = useProviders(companyId);
  const providersQuery = useGetProviders();

  const providersList = useMemo(() => {
    const list = providersQuery.data ?? [];
    return list.map((dto, i) => mapProviderToItem(dto, i));
  }, [providersQuery.data]);

  const [searchValue, setSearchValue] = useState('');
  const [activeTab, setActiveTab] = useState(providerTabs[0].id);
  const [cityFilter, setCityFilter] = useState(cityOptions[0]);
  const [statusFilter, setStatusFilter] = useState(statusOptions[0]);

  const cycleCityFilter = () => {
    const idx = cityOptions.findIndex((c) => c.value === cityFilter.value);
    setCityFilter(cityOptions[(idx + 1) % cityOptions.length]);
  };
  const cycleStatusFilter = () => {
    const idx = statusOptions.findIndex((s) => s.value === statusFilter.value);
    setStatusFilter(statusOptions[(idx + 1) % statusOptions.length]);
  };
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = providersList.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const start = (currentPage - 1) * PAGE_SIZE;
  const paginatedProviders = providersList.slice(start, start + PAGE_SIZE);
  const showingCount = paginatedProviders.length;

  const handleAddEntity = () => {
    console.log('Añadir nueva entidad');
  };

  const handleExportCsv = () => {
    console.log('Exportar CSV');
  };

  const handleViewContracts = (id: string) => {
    console.log('Ver contratos:', id);
  };

  const handleProviderMore = (id: string) => {
    console.log('Más opciones:', id);
  };

  if (!companyId) {
    return (
      <Sidebar>
        <main className="flex-1 overflow-y-auto flex flex-col">
          <div className="p-8 flex items-center justify-center">
            <p className="text-slate-500">Inicia sesión para ver proveedores.</p>
          </div>
        </main>
      </Sidebar>
    );
  }

  if (providersQuery.isLoading && providersList.length === 0) {
    return (
      <Sidebar>
        <main className="flex-1 overflow-y-auto flex flex-col">
          <div className="p-8 flex items-center justify-center">
            <p className="text-slate-500">Cargando proveedores…</p>
          </div>
        </main>
      </Sidebar>
    );
  }

  if (providersQuery.isError) {
    return (
      <Sidebar>
        <main className="flex-1 overflow-y-auto flex flex-col">
          <div className="p-8 flex flex-col items-center justify-center gap-4">
            <p className="text-red-500">Error al cargar proveedores.</p>
            <button
              type="button"
              onClick={() => providersQuery.refetch()}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium"
            >
              Reintentar
            </button>
          </div>
        </main>
      </Sidebar>
    );
  }

  const stats = [
    {
      icon: <BarChart3 className="w-5 h-5 text-primary" />,
      label: 'Socios Globales',
      value: '12 Proveedores',
      description: (
        <p className="text-green-600 dark:text-green-400 flex items-center gap-1">
          <TrendingUp className="w-4 h-4 text-xs" />
          +2 añadidos este mes
        </p>
      ),
    },
    {
      icon: <ClipboardCheck className="w-5 h-5 text-primary" />,
      label: 'Contratos Activos',
      value: '18 Activos',
      description: (
        <p className="text-[#617589] dark:text-gray-400 flex items-center gap-1">
          <Calendar className="w-4 h-4 text-xs" />
          4 expirando en 30 días
        </p>
      ),
    },
    {
      icon: <Building className="w-5 h-5 text-primary" />,
      label: 'Cobertura Regional',
      value: '6 Ciudades',
      description: (
        <p className="text-[#617589] dark:text-gray-400 flex items-center gap-1">
          <Map className="w-4 h-4 text-xs" />
          En Texas & Nuevo México
        </p>
      ),
    },
  ];

  return (
    <Sidebar>
      <main className="flex-1 overflow-y-auto flex flex-col">
        <ProvidersNavHeader
          searchPlaceholder="Search partners by name, NIT or city..."
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />
        <div className="p-8">
          <ProvidersPageHeader
            title="Directorio de Socios"
            description="Administra proveedores globales y clientes regionales de servicios de agua."
            onAddEntity={handleAddEntity}
          />

          <ProvidersTabs
            tabs={providerTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <ProvidersToolbar
            cityLabel={`Ciudad: ${cityFilter.label}`}
            statusLabel={`Estado: ${statusFilter.label}`}
            onCityClick={cycleCityFilter}
            onStatusClick={cycleStatusFilter}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onExportCsv={handleExportCsv}
          />

          <ProvidersGrid
            providers={paginatedProviders}
            onViewContracts={handleViewContracts}
            onMore={handleProviderMore}
          />

            <ProvidersPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              showingCount={showingCount}
              onPageChange={setCurrentPage}
            />

          <ProvidersStatsGrid stats={stats} />
        </div>
      </main>
    </Sidebar>
  );
};

export default CompanyProviderPage;
