import { Sidebar } from "@/components/adminInventory/utils";
import { HeaderMain } from "@/components/adminInventory/headers";
import { cardMainData } from "@/data/cardMainData";
import {
  NotifyCard,
  ProductsCard,
  RecentMovements,
  StockByLocation,
} from "@/components/adminInventory/cards/main";

const DashboardPage = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-200">
      <Sidebar>
        <HeaderMain />
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
        <ProductsCard />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <RecentMovements />
          <StockByLocation />
        </div>
      </Sidebar>
    </div>
  );
};

export default DashboardPage;
