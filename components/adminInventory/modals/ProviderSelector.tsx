"use client";

import { useState, useEffect } from "react";
import { Check, X } from "lucide-react";
import { ProviderDTO } from "@/interfaces/types";

interface ProviderSelectorProps {
  providers: ProviderDTO[];
  selectedProviders: string[]; // cad_proveedor[]
  onSelectionChange: (providerIds: string[]) => void;
  mainProvider?: string | null;
  onMainProviderChange?: (providerId: string) => void;
  providerPrices?: Record<string, string>;
  onProviderPriceChange?: (providerId: string, price: string) => void;
  isLoading?: boolean;
}

export const ProviderSelector = ({
  providers,
  selectedProviders,
  onSelectionChange,
  mainProvider,
  onMainProviderChange,
  providerPrices = {},
  onProviderPriceChange,
  isLoading = false,
}: ProviderSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProviders, setFilteredProviders] = useState(providers);

  useEffect(() => {
    const filtered = providers.filter(
      (p) =>
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.cad_proveedor.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProviders(filtered);
  }, [searchTerm, providers]);

  const toggleProvider = (providerId: string) => {
    if (selectedProviders.includes(providerId)) {
      onSelectionChange(selectedProviders.filter((id) => id !== providerId));
      // Si era el proveedor principal, remover
      if (mainProvider === providerId && onMainProviderChange) {
        onMainProviderChange("");
      }
    } else {
      onSelectionChange([...selectedProviders, providerId]);
    }
  };

  const handleMainProvider = (providerId: string) => {
    if (onMainProviderChange) {
      // Si ya es el principal, deseleccionar
      if (mainProvider === providerId) {
        onMainProviderChange("");
      } else {
        // Asegurar que esté en la lista de seleccionados
        if (!selectedProviders.includes(providerId)) {
          onSelectionChange([...selectedProviders, providerId]);
        }
        onMainProviderChange(providerId);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
          Buscar Proveedores
        </label>
        <input
          type="text"
          placeholder="Buscar por nombre o código..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={isLoading}
          className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-800 placeholder-slate-400 dark:placeholder-slate-500 disabled:opacity-50"
        />
      </div>

      <div className="border border-slate-200 dark:border-slate-700 rounded-lg max-h-64 overflow-y-auto bg-slate-50 dark:bg-slate-900/50">
        {isLoading ? (
          <div className="p-4 text-center text-sm text-slate-500 dark:text-slate-400">
            Cargando proveedores...
          </div>
        ) : filteredProviders.length === 0 ? (
          <div className="p-4 text-center text-sm text-slate-500 dark:text-slate-400">
            {providers.length === 0
              ? "No hay proveedores disponibles"
              : "No se encontraron proveedores"}
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {filteredProviders.map((provider) => {
              const isSelected = selectedProviders.includes(provider.cad_proveedor);
              const isMain = mainProvider === provider.cad_proveedor;

              return (
                <div
                  key={provider.cad_proveedor}
                  className={`p-3 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                    isSelected ? "bg-white dark:bg-slate-800" : ""
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <button
                      type="button"
                      onClick={() => toggleProvider(provider.cad_proveedor)}
                      className="flex items-center gap-3 w-full text-left group"
                    >
                      <div
                        className={`flex-shrink-0 w-5 h-5 border rounded-md flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-blue-600 border-blue-600"
                            : "border-slate-300 dark:border-slate-600 group-hover:border-slate-400 dark:group-hover:border-slate-500"
                        }`}
                      >
                        {isSelected && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                          {provider.nombre}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {provider.cad_proveedor}
                        </p>
                      </div>
                    </button>
                  </div>
                  
                  {isSelected && onProviderPriceChange && (
                    <div className="ml-2 flex items-center">
                      <input
                        type="number"
                        placeholder="Precio"
                        step="0.01"
                        min="0"
                        value={providerPrices[provider.cad_proveedor] || ""}
                        onChange={(e) => onProviderPriceChange(provider.cad_proveedor, e.target.value)}
                        className="w-24 px-2 py-1 text-xs border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  )}

                  {isSelected && onMainProviderChange && (
                    <button
                      type="button"
                      onClick={() => handleMainProvider(provider.cad_proveedor)}
                      className={`ml-2 flex-shrink-0 px-2 py-1 text-xs font-medium rounded transition-colors ${
                        isMain
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                          : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600"
                      }`}
                    >
                      {isMain ? "Principal" : "Set Principal"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedProviders.length > 0 && (
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
            {selectedProviders.length} proveedor{selectedProviders.length !== 1 ? "es" : ""} seleccionado{selectedProviders.length !== 1 ? "s" : ""}
            {mainProvider && ` (Principal: ${mainProvider})`}
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedProviders.map((providerId) => {
              const provider = providers.find((p) => p.cad_proveedor === providerId);
              return (
                <div
                  key={providerId}
                  className="inline-flex items-center gap-2 px-2 py-1 bg-blue-100 dark:bg-blue-900/40 rounded text-xs text-blue-700 dark:text-blue-300 font-medium"
                >
                  {provider?.nombre}
                  <button
                    type="button"
                    onClick={() => toggleProvider(providerId)}
                    className="hover:text-blue-900 dark:hover:text-blue-100"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
