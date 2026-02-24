"use client";
import { useState, useCallback } from "react";
import { Input, PrimaryButton } from "@/components/utils";
import { Search } from "lucide-react";

interface HeaderMainProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onNewProductClick?: () => void;
}

export const HeaderMain = ({
  searchValue = "",
  onSearchChange,
  onNewProductClick,
}: HeaderMainProps) => {
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
          <span className="font-medium">Camilo Soler</span>
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
        <PrimaryButton type="button" onClick={onNewProductClick}>
          Nuevo producto
        </PrimaryButton>
      </div>
    </header>
  );
};
