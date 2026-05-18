"use client";

import { Modal } from "@/components/utils/Modal";
import { FileText, ShieldAlert, BadgeInfo, CheckCircle, Package, ArrowUpRight, Compass } from "lucide-react";

interface StockItem {
  id: string;
  code: string;
  name: string;
  category: string;
  categoryColor: string;
  currentStock: number;
  minStock: number;
  status: {
    label: string;
    backgroundColor: string;
    textColor: string;
    dotColor: string;
  };
  warehouse_id?: string;
  fds?: string;
  fds_url?: string;
}

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: StockItem | null;
}

export const ProductDetailModal = ({
  isOpen,
  onClose,
  item,
}: ProductDetailModalProps) => {
  if (!item) return null;

  const hasFds = !!item.fds_url && item.fds_url.trim().length > 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Detalles Técnicos y Ficha de Seguridad (FDS)`}
      size="3xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-slate-800 dark:text-slate-100">
        
        {/* Columna Izquierda: Documento FDS */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Ficha de Seguridad (FDS)
            </h3>
          </div>

          {hasFds ? (
            <div className="flex flex-col gap-3">
              <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 shadow-md bg-slate-950">
                <iframe
                  src={item.fds_url}
                  className="w-full h-[450px] rounded-xl border-none bg-slate-900"
                  title={`FDS - ${item.name}`}
                />
              </div>
              <a
                href={item.fds_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 hover:border-primary/50 dark:hover:border-primary/50 rounded-lg text-sm font-semibold text-primary hover:bg-primary/5 transition-all shadow-sm"
              >
                Abrir Ficha FDS en nueva pestaña
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-16 px-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 text-center">
              <div className="p-4 bg-amber-500/10 text-amber-500 rounded-full border border-amber-500/20">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">Ficha FDS No Adjunta</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-[320px]">
                  Este producto no cuenta con un documento de Ficha de Seguridad (PDF) cargado en la plataforma.
                </p>
              </div>
              {item.fds && (
                <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono text-slate-600 dark:text-slate-300">
                  Código de Registro FDS: <span className="font-bold">{item.fds}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Columna Derecha: Información Técnica y de Stock */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <BadgeInfo className="w-5 h-5 text-primary" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Ficha Técnica del Producto
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            {/* Header del producto con Badge de Estado */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">{item.code}</span>
                <h2 className="text-2xl font-black text-slate-950 dark:text-white mt-0.5 leading-tight">
                  {item.name}
                </h2>
              </div>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full whitespace-nowrap ${item.status.backgroundColor}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${item.status.dotColor}`} />
                <span className={`text-[10px] font-black uppercase ${item.status.textColor}`}>
                  {item.status.label}
                </span>
              </div>
            </div>

            {/* Grid de Información Detallada */}
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 rounded-xl">
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium block">Categoría</span>
                <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-bold mt-1.5 ${item.categoryColor}`}>
                  {item.category || "General"}
                </span>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 rounded-xl">
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium block">Código FDS</span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-200 mt-1 block">
                  {item.fds || "No registrado"}
                </span>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 rounded-xl">
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium block flex items-center gap-1">
                  <Package className="w-3.5 h-3.5 text-slate-400" />
                  Stock Disponible
                </span>
                <span className={`text-xl font-black mt-1.5 block ${
                  item.currentStock < item.minStock ? 'text-red-500' : 'text-green-500'
                }`}>
                  {item.currentStock} Unidades
                </span>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 rounded-xl">
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium block flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-slate-400" />
                  Stock Mínimo Alerta
                </span>
                <span className="text-xl font-black text-slate-900 dark:text-slate-200 mt-1.5 block">
                  {item.minStock} Unidades
                </span>
              </div>
            </div>

            {/* Tarjeta de Recomendaciones y Buenas Prácticas */}
            <div className="p-4 bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 rounded-2xl flex gap-3 mt-2">
              <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Indicaciones de Almacenamiento</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Consulte la Ficha de Seguridad adjunta para conocer las restricciones de incompatibilidad química, límites de exposición y equipo de protección personal requerido.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Modal>
  );
};
