"use client";

import { useState, useMemo, useEffect } from "react";
import { Download, Filter } from "lucide-react";
import { ProductsTable } from "../../tables/main";
import { Pagination } from "@/components/utils";
import { useInventory } from "@/hooks";

const ITEMS_PER_PAGE = 10;

interface ProductsCardProps {
  searchFilter?: string;
  companyId: string;
}

export const ProductsCard = ({ searchFilter = "", companyId }: ProductsCardProps) => {
  const { useGetProducts } = useInventory(companyId);
  const { data: products = [], isLoading } = useGetProducts();
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrar productos según búsqueda
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchLower = searchFilter.toLowerCase();
      return (
        product.id_product.toLowerCase().includes(searchLower) ||
        product.name.toLowerCase().includes(searchLower) ||
        product.generic_name.toLowerCase().includes(searchLower)
      );
    });
  }, [products, searchFilter]);

  // Calcular productos para la página actual
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  // Resetear a página 1 cuando cambia el filtro
  useEffect(() => {
    setCurrentPage(1);
  }, [searchFilter]);

    return(
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Inventario de Productos
            </h2>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <button className="flex items-center space-x-1 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
                <Filter className="w-4 h-4" />
                <span>Filtros</span>
              </button>
              <button className="flex items-center space-x-1 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
                <Download className="w-4 h-4" />
                <span>Exportar</span>
              </button>
            </div>
          </div>
          {isLoading ? (
            <div className="p-6 text-center text-slate-500">
              Cargando productos...
            </div>
          ) : products.length === 0 ? (
            <div className="p-6 text-center text-slate-500">
              No hay productos disponibles
            </div>
          ) : (
            <ProductsTable products={paginatedProducts} companyId={companyId} />
          )}
          <div className="p-6 border-t border-slate-200 dark:border-slate-800">
            <Pagination
              currentPage={currentPage}
              totalItems={filteredProducts.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setCurrentPage}
              showInfo={true}
            />
          </div>
        </div>
    )
}
