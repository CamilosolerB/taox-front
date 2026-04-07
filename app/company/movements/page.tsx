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
  NewMovementModal,
} from '@/components/adminInventory/movements';
import {
  movementsList,
  dateRangeOptions,
  movementTypeOptions,
  categoryOptions,
} from '@/data/movementsData';
import { Zap, TrendingUp, Loader2, ArrowRightLeft, DollarSign, Beaker } from 'lucide-react';
import { useAuth } from '@/hooks';
import { useMovements } from '@/hooks/useMovements';
import { useInventory } from '@/hooks/useInventory';
import type { MovementItem } from '@/data/movementsData';
import { ProductMovementResponseDTO } from '@/interfaces/types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const PAGE_SIZE = 10;
const TOTAL_RESULTS = 1284;

const CompanyMovementsPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [dateRange, setDateRange] = useState(dateRangeOptions[0].value);
  const [movementType, setMovementType] = useState(movementTypeOptions[0].value);
  const [category, setCategory] = useState(categoryOptions[0].value);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { companyId } = useAuth();

  const { useGetMovements } = useMovements(companyId);
  const { data: movementsData, isLoading: isLoadingMovements } = useGetMovements();
  const { useGetProducts } = useInventory(companyId);
  const { data: products = [], isLoading: isLoadingProducts } = useGetProducts();

  const movements: ProductMovementResponseDTO[] = movementsData?.data || [];
  const totalResults = movementsData?.total || 0;
  const totalPages = Math.ceil(totalResults / PAGE_SIZE);

  // Helper to map API data to UI items
  const mappedMovements: MovementItem[] = movements.map((m) => {
    const product = products.find((p: any) => p.id_product === m.codigo_producto);
    const dateObj = new Date(m.created_at);
    
    const typeStr = (m.tipo_movimiento || 'traslado').toUpperCase();
    const isEntry = typeStr === 'ENTRADA';
    const isExit = typeStr === 'SALIDA';

    return {
      id: String(m.id_movimiento),
      date: format(dateObj, "MMM dd, yyyy", { locale: es }),
      time: format(dateObj, "hh:mm a"),
      productName: product ? product.name : m.codigo_producto,
      productSku: m.codigo_producto,
      productIcon: 'beaker', // Default
      type: typeStr,
      quantity: `${isEntry ? '+' : isExit ? '-' : ''}${m.cantidad} Units`,
      userInitials: 'TA', // Mocked user until API provides it
      userName: 'TAOX User',
    };
  });

  const isLoading = isLoadingMovements || isLoadingProducts;

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
        {/* <MovementsNavHeader
          title="Historial de Movimientos"
          searchPlaceholder="Buscar por producto o usuario..."
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          userName="Usuario Admin"
        /> */}
        <div className="p-8 max-w-[1200px] mx-auto w-full">
          <MovementsPageHeader
            title="Historial de Movimientos & Reportes"
            description="Pista de auditoría y análisis del flujo de inventario para Planta Alfa."
            onExportExcel={handleExportExcel}
            onExportPdf={handleExportPdf}
            onRegisterMovement={() => setIsModalOpen(true)}
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
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="text-[#617589] text-sm animate-pulse">Cargando movimientos...</p>
              </div>
            ) : mappedMovements.length > 0 ? (
              <>
                <MovementsTable
                  movements={mappedMovements}
                  onActionClick={handleMovementAction}
                />
                <MovementsPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalResults={totalResults}
                  pageSize={PAGE_SIZE}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
                  <ArrowRightLeft className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">No hay movimientos</h3>
                <p className="text-[#617589] max-w-xs">
                  Aún no se han registrado movimientos de inventario para esta empresa.
                </p>
              </div>
            )}
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

        {companyId && (
          <NewMovementModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            companyId={companyId}
          />
        )}
      </main>
    </Sidebar>
  );
};

export default CompanyMovementsPage;
