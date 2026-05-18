"use client";
import { useState, useCallback } from "react";
import { Input, PrimaryButton } from "@/components/utils";
import { Search, Upload } from "lucide-react";

import { useAuth } from "@/providers/AuthProvider";

interface HeaderMainProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onNewProductClick?: () => void;
  onBulkUploadClick?: () => void;
}

export const HeaderMain = ({
  searchValue = "",
  onSearchChange,
  onNewProductClick,
  onBulkUploadClick,
}: HeaderMainProps) => {
  const { user } = useAuth();

  const isAdmin = true; // Todo usuario en el panel puede ver el botón de Importar, la validación se hace en backend

  const handleSearchChange = useCallback(
    (value: string) => {
      onSearchChange?.(value);
    },
    [onSearchChange]
  );

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Panel de Control de Inventario
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Bienvenido de nuevo,{" "}
          <span className="font-medium">{user?.username || "Admin"}</span>
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <div className="relative group">
          <Input
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Buscar producto..."
            icon={Search}
            value={searchValue}
          />
        </div>
        {isAdmin && onBulkUploadClick && (
          <button
            type="button"
            onClick={onBulkUploadClick}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Upload className="w-4 h-4" />
            Importar
          </button>
        )}
        <PrimaryButton type="button" onClick={onNewProductClick}>
          Nuevo producto
        </PrimaryButton>
      </div>
    </header>
  );
};

