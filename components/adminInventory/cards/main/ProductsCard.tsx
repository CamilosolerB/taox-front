import { Download, Filter } from "lucide-react";
import { ProductsTable } from "../../tables/main";
import { products } from "@/interfaces/product";
export const ProductsCard = () => {
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
          <ProductsTable products={products} />
          <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-sm text-slate-500">
              Mostrando 4 de 1,284 productos
            </span>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-md text-sm hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50">
                Anterior
              </button>
              <button className="px-3 py-1 bg-primary text-white border border-primary rounded-md text-sm">
                1
              </button>
              <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-md text-sm hover:bg-slate-50 dark:hover:bg-slate-800">
                2
              </button>
              <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-md text-sm hover:bg-slate-50 dark:hover:bg-slate-800">
                Siguiente
              </button>
            </div>
          </div>
        </div>
    )
}