import React from "react";
import { ProcessStockStat } from "@/hooks/useDashboard";

const colors = ["bg-primary", "bg-secondary", "bg-green-500", "bg-amber-500"];

export const StockByProcess = ({ data = [] }: { data?: ProcessStockStat[] }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        Stock por Proceso
      </h3>
      {data.length === 0 ? (
        <p className="text-sm text-slate-500 text-center py-4">No hay datos de stock en los procesos.</p>
      ) : (
        <div className="space-y-4">
          {data.map((item, index) => {
            const colorClass = colors[index % colors.length];
            return (
              <div key={item.process_id}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">{item.process_name}</span>
                  <span className="font-semibold">{Math.round(item.percentage)}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                  <div
                    className={`${colorClass} h-2 rounded-full`}
                    style={{ width: `${Math.round(item.percentage)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
