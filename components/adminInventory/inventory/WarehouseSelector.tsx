import React, { useState } from 'react';
import { Package, ArrowRight, Database, Copy, Check } from 'lucide-react';
import type { ProcessResponseDTO } from '@/interfaces/types';

interface WarehouseSelectorProps {
  warehouses: ProcessResponseDTO[];
  onSelect: (warehouse: ProcessResponseDTO) => void;
  isLoading?: boolean;
}

function WarehouseCard({ 
  warehouse, 
  onSelect 
}: { 
  warehouse: ProcessResponseDTO; 
  onSelect: (w: ProcessResponseDTO) => void 
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent selecting the warehouse card when copying
    navigator.clipboard.writeText(warehouse.id_proceso);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={() => onSelect(warehouse)}
      className="group relative flex flex-col p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/50 transition-all duration-300 text-left overflow-hidden shadow-lg shadow-black/20"
    >
      {/* Decorative Gradient Blob */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-500/10 blur-3xl group-hover:bg-emerald-500/20 transition-colors duration-500 rounded-full" />
      
      <div className="flex items-start justify-between mb-3">
        <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
          <Package size={24} />
        </div>
        <ArrowRight size={20} className="text-slate-600 group-hover:text-emerald-400 transform group-hover:translate-x-1 transition-all" />
      </div>
      
      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
        {warehouse.nombre}
      </h3>

      {/* Copyable Warehouse Code Badge */}
      <div 
        onClick={handleCopy}
        className="flex items-center gap-1.5 mt-1 mb-3 text-[11px] font-mono bg-slate-800/80 hover:bg-slate-700/80 text-emerald-400 border border-slate-700/50 rounded-lg px-2.5 py-1 w-fit transition-colors cursor-pointer select-none"
        title="Copiar identificador del almacén"
      >
        <span className="text-slate-500 font-sans">Identificador:</span>
        <span className="select-all font-semibold tracking-tight">{warehouse.id_proceso.substring(0, 8)}...</span>
        {copied ? (
          <Check size={11} className="text-emerald-300 animate-scale-in" />
        ) : (
          <Copy size={11} className="text-slate-500 group-hover:text-emerald-400 transition-colors" />
        )}
      </div>
      
      <p className="text-slate-400 text-sm line-clamp-2 mb-4 flex-grow">
        {warehouse.descripcion || 'Sin descripción adicional disponible.'}
      </p>
      
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between mt-auto w-full">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 group-hover:text-slate-300">
          Ver Inventario
        </span>
        <span className="text-[10px] text-slate-600 font-mono">
          UUID Completo en portapapeles al copiar
        </span>
      </div>
    </button>
  );
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
        <WarehouseCard 
          key={warehouse.id_proceso} 
          warehouse={warehouse} 
          onSelect={onSelect} 
        />
      ))}
    </div>
  );
}
