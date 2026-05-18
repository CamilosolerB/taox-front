import React from 'react';
import { Package, ArrowRight, Database } from 'lucide-react';
import type { ProcessResponseDTO } from '@/interfaces/types';

interface WarehouseSelectorProps {
  warehouses: ProcessResponseDTO[];
  onSelect: (warehouse: ProcessResponseDTO) => void;
  isLoading?: boolean;
}

export function WarehouseSelector({ warehouses, onSelect, isLoading }: WarehouseSelectorProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 rounded-xl bg-slate-800/50 animate-pulse border border-slate-700" />
        ))}
      </div>
    );
  }

  // Filter only storage-type processes (warehouses)
  const storageWarehouses = warehouses.filter(w => w.tipo_proceso === 'almacenamiento');

  if (storageWarehouses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-slate-900/50 border border-dashed border-slate-700 rounded-2xl">
        <Database size={48} className="text-slate-600 mb-4" />
        <p className="text-slate-400 font-medium">No hay almacenes configurados.</p>
        <p className="text-slate-500 text-sm mt-1">Contacta al administrador para definir almacenes.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {storageWarehouses.map((warehouse) => (
        <button
          key={warehouse.id_proceso}
          onClick={() => onSelect(warehouse)}
          className="group relative flex flex-col p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/50 transition-all duration-300 text-left overflow-hidden shadow-lg shadow-black/20"
        >
          {/* Decorative Gradient Blob */}
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-500/10 blur-3xl group-hover:bg-emerald-500/20 transition-colors duration-500 rounded-full" />
          
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
              <Package size={24} />
            </div>
            <ArrowRight size={20} className="text-slate-600 group-hover:text-emerald-400 transform group-hover:translate-x-1 transition-all" />
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
            {warehouse.nombre}
          </h3>
          
          <p className="text-slate-400 text-sm line-clamp-2 mb-4 flex-grow">
            {warehouse.descripcion || 'Sin descripción adicional disponible.'}
          </p>
          
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between mt-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 group-hover:text-slate-300">
              Ver Inventario
            </span>
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-800" />
              <div className="w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-700" />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
