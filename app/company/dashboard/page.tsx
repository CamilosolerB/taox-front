'use client';

import { useState } from "react";
import { HeaderMain } from "@/components/adminInventory/headers";
import {
  NotifyCard,
  ProductsCard,
  RecentMovements,
  StockByProcess,
} from "@/components/adminInventory/cards/main";
import { CreateProductModal } from "@/components/adminInventory/modals/CreateProductModal";
import { BulkUploadModal } from "@/components/adminInventory/modals/BulkUploadModal";
import { useDashboard } from "@/hooks/useDashboard";
import { useMovements } from "@/hooks/useMovements";
import { ClipboardCheck, TriangleAlert, ArrowRightLeft, Factory, Loader2 } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

const DashboardPage = () => {
  const [searchFilter, setSearchFilter] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  
  const { companyId } = useAuth();
  
  const { useGetDashboardStats } = useDashboard(companyId as string);
  const { data: stats, isLoading: isLoadingStats } = useGetDashboardStats();
  
  const { useGetMovements } = useMovements(companyId as string);
  const { data: movementsResponse } = useGetMovements();
  const recentMovements = (movementsResponse?.data || []).slice(0, 5);

  const dynamicCardData = [
    {
      icon: ClipboardCheck,
      text: "Total productos",
      value: stats ? stats.total_products.toString() : "0",
      color: "blue",
      isDash: false
    },
    {
      icon: TriangleAlert,
      text: "Stock bajo",
      value: stats ? stats.low_stock_alerts.toString() : "0",
      color: "amber",
      isDash: stats && stats.low_stock_alerts > 0 ? true : false,
      colorDash: "red",
      valueDash: "Alerta"
    },
    {
      icon: ArrowRightLeft,
      text: "Movimientos hoy",
      value: stats ? stats.movements_today.toString() : "0",
      color: "green",
      isDash: false
    },
    {
      icon: Factory,
      text: "Procesos activos",
      value: stats ? stats.active_processes.toString() : "0",
      color: "orange",
      isDash: false
    }
  ];

  return (
    <div className="w-full">
      <HeaderMain
        searchValue={searchFilter}
        onSearchChange={setSearchFilter}
        onNewProductClick={() => setIsCreateModalOpen(true)}
        onBulkUploadClick={() => setIsBulkUploadOpen(true)}
      />
      {isLoadingStats ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-slate-500 text-sm animate-pulse">Cargando métricas del dashboard...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dynamicCardData.map((card, idx) => {
              return (
                <NotifyCard
                  icon={card.icon}
                  text={card.text}
                  value={card.value}
                  isDash={card.isDash}
                  color={card.color as any}
                  colorDash={card.colorDash as any}
                  valueDash={card.valueDash}
                  key={idx}
                />
              );
            })}
          </div>
          <ProductsCard searchFilter={searchFilter} companyId={companyId as string} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <RecentMovements movements={recentMovements} />
            <StockByProcess data={stats?.stock_by_process || []} />
          </div>
        </>
      )}

      <CreateProductModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        companyId={companyId as string}
      />

      <BulkUploadModal
        isOpen={isBulkUploadOpen}
        onClose={() => setIsBulkUploadOpen(false)}
        companyId={companyId as string}
      />
    </div>
  );
};

export default DashboardPage;
