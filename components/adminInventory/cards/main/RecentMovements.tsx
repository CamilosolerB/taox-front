import { Minus, Plus } from "lucide-react";

export const RecentMovements = () => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        Movimientos Recientes
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold">
                Entrada: Sulfato de Alúmina
              </p>
              <p className="text-xs text-slate-500">
                Por: Proveedor S.A. | Hace 2 horas
              </p>
            </div>
          </div>
          <span className="text-sm font-bold text-green-600">+500 KG</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full">
              <Minus className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold">
                Salida: Hipoclorito de Sodio
              </p>
              <p className="text-xs text-slate-500">
                Uso: Planta Sector B | Hace 4 horas
              </p>
            </div>
          </div>
          <span className="text-sm font-bold text-red-600">-120 KG</span>
        </div>
      </div>
    </div>
  );
};
