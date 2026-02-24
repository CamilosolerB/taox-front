"use client";

import { useState } from "react";
import { Sidebar } from "@/components/adminInventory/utils";
import { HeaderMain } from "@/components/adminInventory/headers";
import { cardMainData } from "@/data/cardMainData";
import {
  NotifyCard,
  ProductsCard,
  RecentMovements,
  StockByLocation,
} from "@/components/adminInventory/cards/main";
import { CreateProductModal } from "@/components/adminInventory/modals/CreateProductModal";

const COMPANY_ID = "b27ce798-2a16-47fa-89c4-0b7f8e46cda0";

const DashboardPage = () => {
  const [searchFilter, setSearchFilter] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-200">
      <Sidebar>
        <HeaderMain
          searchValue={searchFilter}
          onSearchChange={setSearchFilter}
          onNewProductClick={() => setIsCreateModalOpen(true)}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cardMainData.map((card, idx) => {
            return (
              <NotifyCard
                icon={card.icon}
                text={card.text}
                value={card.value}
                isDash={card.isDash}
                color={card.color}
                colorDash={card.colorDash}
                valueDash={card.valueDash}
                key={idx}
              />
            );
          })}
        </div>
        <ProductsCard searchFilter={searchFilter} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <RecentMovements />
          <StockByLocation />
        </div>

        <CreateProductModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          companyId={COMPANY_ID}
        />
      </Sidebar>
    </div>
  );
};

export default DashboardPage;
