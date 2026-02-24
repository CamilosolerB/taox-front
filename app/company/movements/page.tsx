'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/adminInventory/utils';
import {
  MovementsNavHeader,
  MovementsPageHeader,
  MovementsStatsGrid,
  MovementsFilters,
  MovementsTable,
  MovementsPagination,
} from '@/components/adminInventory/movements';
import {
  movementsList,
  dateRangeOptions,
  movementTypeOptions,
  categoryOptions,
} from '@/data/movementsData';
import {
  ArrowRightLeft,
  DollarSign,
  Beaker,
  Zap,
  TrendingUp,
} from 'lucide-react';

const PAGE_SIZE = 10;
const TOTAL_RESULTS = 1284;

const CompanyMovementsPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [dateRange, setDateRange] = useState(dateRangeOptions[0].value);
  const [movementType, setMovementType] = useState(movementTypeOptions[0].value);
  const [category, setCategory] = useState(categoryOptions[0].value);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(TOTAL_RESULTS / PAGE_SIZE);

  const handleClearFilters = () => {
    setDateRange(dateRangeOptions[0].value);
    setMovementType(movementTypeOptions[0].value);
    setCategory(categoryOptions[0].value);
  };

  const handleExportExcel = () => {
    console.log('Exportar Excel');
  };

  const handleExportPdf = () => {
    console.log('Exportar PDF');
  };

  const handleMovementAction = (id: string) => {
    console.log('Acción movimiento:', id);
  };

  const stats = [
    {
      label: 'Movimientos Mensuales',
      value: '1,284',
      description: (
        <p className="text-[#078838] text-xs font-bold flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5 text-[14px]" />
          +12.5% desde el mes pasado
        </p>
      ),
      icon: <ArrowRightLeft className="text-primary w-5 h-5 text-[20px]" />,
    },
    {
      label: 'Valor Total del Inventario',
      value: '$45,230.00',
      description: (
        <p className="text-[#078838] text-xs font-bold flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5 text-[14px]" />
          +5.4% este trimestre
        </p>
      ),
      icon: <DollarSign className="text-primary w-5 h-5 text-[20px]" />,
    },
    {
      label: 'Artículos de Stock Activos',
      value: '342',
      description: <p className="text-[#617589] text-xs font-medium">Across 5 categories</p>,
      icon: <Beaker className="text-primary w-5 h-5 text-[20px]" />,
    },
    {
      label: 'Reordenes Pendientes',
      value: '8',
      description: <p className="text-red-500 text-xs font-bold">Acción requerida</p>,
      icon: <Zap className="text-red-500 w-5 h-5 text-[20px]" />,
    },
  ];

  return (
    <Sidebar>
      <main className="flex-1 flex flex-col min-w-0">
        <MovementsNavHeader
          title="Historial de Movimientos"
          searchPlaceholder="Buscar por producto o usuario..."
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          userName="Usuario Admin"
        />
        <div className="p-8 max-w-[1200px] mx-auto w-full">
          <MovementsPageHeader
            title="Historial de Movimientos & Reportes"
            description="Pista de auditoría y análisis del flujo de inventario para Planta Alfa."
            onExportExcel={handleExportExcel}
            onExportPdf={handleExportPdf}
          />

          <MovementsStatsGrid stats={stats} />

          <div className="bg-white dark:bg-background-dark rounded-xl border border-[#dbe0e6] dark:border-gray-800 shadow-sm mb-6 overflow-hidden">
            <MovementsFilters
              dateRange={dateRange}
              dateRangeOptions={dateRangeOptions}
              onDateRangeChange={setDateRange}
              movementType={movementType}
              movementTypeOptions={movementTypeOptions}
              onMovementTypeChange={setMovementType}
              category={category}
              categoryOptions={categoryOptions}
              onCategoryChange={setCategory}
              onClearFilters={handleClearFilters}
            />
            <MovementsTable
              movements={movementsList}
              onActionClick={handleMovementAction}
            />
            <MovementsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalResults={TOTAL_RESULTS}
              pageSize={PAGE_SIZE}
              onPageChange={setCurrentPage}
            />
          </div>

          <div className="flex justify-between items-center text-[#617589] text-xs">
            <p>© 2023 WaterFlow Systems LLC. All rights reserved.</p>
            <div className="flex gap-4">
              <a className="hover:text-primary" href="#">
                Privacy Policy
              </a>
              <a className="hover:text-primary" href="#">
                Support Center
              </a>
            </div>
          </div>
        </div>
      </main>
    </Sidebar>
  );
};

export default CompanyMovementsPage;
