import { Sidebar } from "@/components/adminInventory/utils";
import { ChevronRight, Edit2, ChevronLeft } from "lucide-react";

const InventoryCompanyPage = () => {
  return (
    <Sidebar>
      <main className="flex-1 overflow-auto p-8 flex gap-8">
        <div className="w-64 flex-shrink-0 flex flex-col gap-6">
          <div>
            <h3 className="text-sm font-bold mb-3 uppercase tracking-wider text-[#617589]">
              Categorías
            </h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                  type="checkbox"
                />
                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                  Químicos
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                  type="checkbox"
                />
                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                  Repuestos
                </span>
              </label>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold mb-3 uppercase tracking-wider text-[#617589]">
              Estado de Stock
            </h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                  type="checkbox"
                />
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                  Crítico (&lt; Mín)
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                  type="checkbox"
                />
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                  Advertencia (Bajo)
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                  type="checkbox"
                />
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                  En Stock
                </span>
              </label>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold mb-3 uppercase tracking-wider text-[#617589]">
              Ubicación
            </h3>
            <select className="w-full text-sm rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:ring-primary">
              <option>Todos los Almacenes</option>
              <option>Almacenamiento Principal A</option>
              <option>Búnker Químico 1</option>
              <option>Depósito de Repuestos B</option>
            </select>
          </div>
          <div className="mt-auto p-4 bg-primary/5 rounded-xl border border-primary/20">
            <p className="text-xs font-bold text-primary uppercase mb-2">
              Estadísticas de Inventario
            </p>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-[#617589]">Total de Artículos:</span>
              <span className="text-sm font-bold">1,248</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#617589]">Stock Bajo:</span>
              <span className="text-sm font-bold text-red-500">12</span>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-[#617589] mb-2">
              <span>Home</span>
              <ChevronRight className="w-4 h-4 text-xs" />
              <span className="text-[#111418] dark:text-white font-medium">
                Inventory
              </span>
            </div>
            <h1 className="text-3xl font-bold">
              Químicos &amp; Stock de Repuestos
            </h1>
          </div>
          <div className="flex border-b border-[#dbe0e6] dark:border-gray-700">
            <button className="px-6 py-3 border-b-2 border-primary text-primary font-bold text-sm">
              Todos los Artículos
            </button>
            <button className="px-6 py-3 border-b-2 border-transparent text-[#617589] font-bold text-sm hover:text-primary transition-all flex items-center gap-2">
              Stock Crítico
              <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                12
              </span>
            </button>
            <button className="px-6 py-3 border-b-2 border-transparent text-[#617589] font-bold text-sm hover:text-primary transition-all">
              Pedidos Recientes
            </button>
          </div>
          <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-[#dbe0e6] dark:border-gray-700 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-background-light dark:bg-gray-800/50">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#617589]">
                    Código
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#617589]">
                    Nombre
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#617589]">
                    Categoría
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#617589]">
                    Current Stock
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#617589]">
                    Min Stock
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#617589]">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#617589]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dbe0e6] dark:divide-gray-700">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-[#617589]">
                    CHM-2041
                  </td>
                  <td className="px-6 py-4 text-sm font-bold">
                    Liquid Chlorine 12% (20L)
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold">
                      Chemical
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-red-600">
                    45 Units
                  </td>
                  <td className="px-6 py-4 text-sm text-[#617589]">
                    100 Units
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full w-fit">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                      <span className="text-[10px] font-bold uppercase">
                        Critical
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-primary hover:text-blue-800">
                      <Edit2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-[#617589]">
                    SPR-8821
                  </td>
                  <td className="px-6 py-4 text-sm font-bold">
                    Replacement O-Ring Kit (Type B)
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded bg-purple-100 text-purple-700 text-xs font-bold">
                      Spare Part
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-yellow-600">
                    14 Units
                  </td>
                  <td className="px-6 py-4 text-sm text-[#617589]">12 Units</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full w-fit">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-600"></div>
                      <span className="text-[10px] font-bold uppercase">
                        Warning
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-primary hover:text-blue-800">
                      <Edit2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-[#617589]">
                    CHM-1022
                  </td>
                  <td className="px-6 py-4 text-sm font-bold">
                    Ferric Chloride Coagulant
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold">
                      Chemical
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-green-600">
                    450 Units
                  </td>
                  <td className="px-6 py-4 text-sm text-[#617589]">
                    150 Units
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full w-fit">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
                      <span className="text-[10px] font-bold uppercase">
                        Healthy
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-primary hover:text-blue-800">
                      <Edit2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-[#617589]">
                    SPR-5012
                  </td>
                  <td className="px-6 py-4 text-sm font-bold">
                    Mechanical Seal - Main Pump
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded bg-purple-100 text-purple-700 text-xs font-bold">
                      Spare Part
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-green-600">
                    8 Units
                  </td>
                  <td className="px-6 py-4 text-sm text-[#617589]">3 Units</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full w-fit">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
                      <span className="text-[10px] font-bold uppercase">
                        Healthy
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-primary hover:text-blue-800">
                      <Edit2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="px-6 py-4 bg-background-light dark:bg-gray-800/30 border-t border-[#dbe0e6] dark:border-gray-700 flex items-center justify-between">
              <p className="text-xs text-[#617589]">
                Showing 1 to 4 of 1,248 items
              </p>
              <div className="flex gap-2">
                <button
                  className="w-8 h-8 flex items-center justify-center rounded border border-[#dbe0e6] dark:border-gray-600 hover:bg-white dark:hover:bg-gray-700 disabled:opacity-50"
                  disabled
                >
                  <ChevronLeft className="w-4 h-4 text-sm" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-primary bg-primary text-white text-xs font-bold">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-[#dbe0e6] dark:border-gray-600 hover:bg-white dark:hover:bg-gray-700 text-xs font-bold">
                  2
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-[#dbe0e6] dark:border-gray-600 hover:bg-white dark:hover:bg-gray-700 text-xs font-bold">
                  3
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-[#dbe0e6] dark:border-gray-600 hover:bg-white dark:hover:bg-gray-700">
                  <ChevronRight className="w-4 h-4 text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Sidebar>
  );
};

export default InventoryCompanyPage;
