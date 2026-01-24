"use client";
import { useState } from "react";
import { Input, PrimaryButton } from "@/components/utils";
import { Search } from "lucide-react";

export const HeaderMain = () => {
  const [search, setSearch] = useState<string>("");
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
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar producto..."
            icon={Search}
            value={search}
          />
        </div>
        <PrimaryButton type="button">Nuevo movimiento</PrimaryButton>
      </div>
    </header>
  );
};
