import { Minus, Plus, ArrowRightLeft } from "lucide-react";
import { ProductMovementResponseDTO } from "@/interfaces/types";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export const RecentMovements = ({ movements = [] }: { movements?: ProductMovementResponseDTO[] }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        Movimientos Recientes
      </h3>
      {movements.length === 0 ? (
        <p className="text-sm text-slate-500 py-4 text-center">No hay movimientos recientes.</p>
      ) : (
        <div className="space-y-4">
          {movements.map((movement) => {
            const isEntry = movement.tipo_movimiento?.toLowerCase() === 'entrada';
            const isExit = movement.tipo_movimiento?.toLowerCase() === 'salida';
            const Icon = isEntry ? Plus : isExit ? Minus : ArrowRightLeft;
            
            const colorClass = isEntry 
              ? "bg-green-100 dark:bg-green-900/30 text-green-600" 
              : isExit 
                ? "bg-red-100 dark:bg-red-900/30 text-red-600"
                : "bg-blue-100 dark:bg-blue-900/30 text-blue-600";
            
            const textClass = isEntry ? "text-green-600" : isExit ? "text-red-600" : "text-blue-600";
            const sign = isEntry ? "+" : isExit ? "-" : "";

            const timeAgo = movement.created_at ? formatDistanceToNow(new Date(movement.created_at), { addSuffix: true, locale: es }) : "";

            return (
              <div key={movement.id_movimiento} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${colorClass}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold capitalize">
                      {movement.tipo_movimiento}: {movement.codigo_producto}
                    </p>
                    <p className="text-xs text-slate-500">
                      {timeAgo}
                    </p>
                  </div>
                </div>
                <span className={`text-sm font-bold ${textClass}`}>{sign}{movement.cantidad}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
