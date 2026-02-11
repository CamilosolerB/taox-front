import { Sidebar } from "@/components/adminInventory/utils";
import { Menu, Search, Bell, UserCircle, Download, FileText, ArrowRightLeft, TrendingUp, DollarSign, Calendar, Beaker, Sliders, Zap, MoreVertical } from "lucide-react";

const CompanyMovementsPage = () => {
  return (
    <Sidebar>
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-[#f0f2f4] dark:border-gray-800 bg-white dark:bg-background-dark flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-6 flex-1">
            <div className="lg:hidden">
              <Menu className="text-[#111418] dark:text-white cursor-pointer w-6 h-6" />
            </div>
            <h2 className="text-[#111418] dark:text-white text-lg font-bold">
              Historial de Movimientos
            </h2>
            <div className="hidden md:flex flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#617589] w-5 h-5 text-[20px]" />
              <input
                className="w-full bg-[#f0f2f4] dark:bg-gray-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary transition-all"
                placeholder="Buscar por producto o usuario..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#f0f2f4] dark:bg-gray-800 text-[#111418] dark:text-white hover:bg-gray-200 transition-colors relative">
              <Bell className="w-5 h-5 text-[20px]" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
            </button>
            <button className="flex items-center gap-2 h-10 px-3 rounded-lg bg-[#f0f2f4] dark:bg-gray-800 text-[#111418] dark:text-white hover:bg-gray-200 transition-colors">
              <UserCircle className="w-6 h-6 text-[24px]" />
              <span className="text-sm font-bold hidden sm:inline">
                Usuario Admin
              </span>
            </button>
          </div>
        </header>
        <div className="p-8 max-w-[1200px] mx-auto w-full">
          <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
            <div className="flex flex-col gap-1">
              <h1 className="text-[#111418] dark:text-white text-3xl font-black tracking-tight">
                Historial de Movimientos &amp; Reportes
              </h1>
              <p className="text-[#617589] text-base">
                Pista de auditoría y análisis del flujo de inventario para Planta Alfa.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 transition-all">
                <Download className="w-5 h-5 text-[20px]" />
                Exportar Excel
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:opacity-90 transition-all shadow-sm">
                <FileText className="w-5 h-5 text-[20px]" />
                Exportar PDF
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-[#dbe0e6] dark:border-gray-800 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[#617589] text-sm font-medium">
                  Movimientos Mensuales
                </p>
                <ArrowRightLeft className="text-primary w-5 h-5 text-[20px]" />
              </div>
              <p className="text-[#111418] dark:text-white text-2xl font-bold leading-tight mb-1">
                1,284
              </p>
              <p className="text-[#078838] text-xs font-bold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-[14px]" />
                +12.5% desde el mes pasado
              </p>
            </div>
            <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-[#dbe0e6] dark:border-gray-800 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[#617589] text-sm font-medium">
                  Valor Total del Inventario
                </p>
                <DollarSign className="text-primary w-5 h-5 text-[20px]" />
              </div>
              <p className="text-[#111418] dark:text-white text-2xl font-bold leading-tight mb-1">
                $45,230.00
              </p>
              <p className="text-[#078838] text-xs font-bold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-[14px]" />
                +5.4% este trimestre
              </p>
            </div>
            <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-[#dbe0e6] dark:border-gray-800 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[#617589] text-sm font-medium">
                  Artículos de Stock Activos
                </p>
                <Beaker className="text-primary w-5 h-5 text-[20px]" />
              </div>
              <p className="text-[#111418] dark:text-white text-2xl font-bold leading-tight mb-1">
                342
              </p>
              <p className="text-[#617589] text-xs font-medium">
                Across 5 categories
              </p>
            </div>
            <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-[#dbe0e6] dark:border-gray-800 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[#617589] text-sm font-medium">
                  Reordenes Pendientes
                </p>
                <Zap className="text-red-500 w-5 h-5 text-[20px]" />
              </div>
              <p className="text-[#111418] dark:text-white text-2xl font-bold leading-tight mb-1">
                8
              </p>
              <p className="text-red-500 text-xs font-bold">Acción requerida</p>
            </div>
          </div>
          <div className="bg-white dark:bg-background-dark rounded-xl border border-[#dbe0e6] dark:border-gray-800 shadow-sm mb-6 overflow-hidden">
            <div className="p-5 border-b border-[#f0f2f4] dark:border-gray-800 flex flex-wrap items-center gap-4">
              <div className="flex flex-col gap-1 min-w-[200px]">
                <label className="text-xs font-bold text-[#617589] uppercase tracking-wider">
                  Rango de Fechas
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#617589] w-4.5 h-4.5 text-[18px]" />
                  <select className="w-full bg-[#f0f2f4] dark:bg-gray-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm appearance-none focus:ring-2 focus:ring-primary transition-all">
                    <option>Últimos 30 Días</option>
                    <option>Este Mes</option>
                    <option>Último Trimestre</option>
                    <option>Rango Personalizado</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1 min-w-[150px]">
                <label className="text-xs font-bold text-[#617589] uppercase tracking-wider">
                  Tipo
                </label>
                <select className="bg-[#f0f2f4] dark:bg-gray-800 border-none rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary transition-all">
                  <option>Todos los Movimientos</option>
                  <option>Entrada de Stock (Entrada)</option>
                  <option>Salida de Stock (Salida)</option>
                </select>
              </div>
              <div className="flex flex-col gap-1 min-w-[150px]">
                <label className="text-xs font-bold text-[#617589] uppercase tracking-wider">
                  Categoría
                </label>
                <select className="bg-[#f0f2f4] dark:bg-gray-800 border-none rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary transition-all">
                  <option>Todas las Categorías</option>
                  <option>Químicos</option>
                  <option>Filtros</option>
                  <option>Bombas</option>
                </select>
              </div>
              <div className="flex-1 flex items-end justify-end">
                <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                  Limpiar Filtros
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <th className="px-6 py-4 text-[#617589] text-xs font-bold uppercase tracking-wider">
                      Date &amp; Time
                    </th>
                    <th className="px-6 py-4 text-[#617589] text-xs font-bold uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-4 text-[#617589] text-xs font-bold uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-4 text-[#617589] text-xs font-bold uppercase tracking-wider text-right">
                      Quantity
                    </th>
                    <th className="px-6 py-4 text-[#617589] text-xs font-bold uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-[#617589] text-xs font-bold uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f2f4] dark:divide-gray-800">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-[#111418] dark:text-white">
                          Oct 24, 2023
                        </span>
                        <span className="text-xs text-[#617589]">09:14 AM</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary">
                          <Beaker className="w-4.5 h-4.5 text-[18px]" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-[#111418] dark:text-white">
                            Liquid Chlorine 12%
                          </span>
                          <span className="text-xs text-[#617589]">
                            SKU: CHL-12-001
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#e7f6ed] text-[#078838]">
                        ENTRY
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-bold text-[#078838]">
                        +500 L
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary uppercase">
                          JD
                        </div>
                        <span className="text-sm text-[#111418] dark:text-white">
                          John Doe
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[#617589] hover:text-primary">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-[#111418] dark:text-white">
                          Oct 23, 2023
                        </span>
                        <span className="text-xs text-[#617589]">02:45 PM</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">
                          <Sliders className="w-4.5 h-4.5 text-[18px]" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-[#111418] dark:text-white">
                            Carbon Filter Cartridge
                          </span>
                          <span className="text-xs text-[#617589]">
                            SKU: FIL-C-10
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700">
                        EXIT
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-bold text-orange-700">
                        -24 Units
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-[10px] font-bold text-purple-600 uppercase">
                          AS
                        </div>
                        <span className="text-sm text-[#111418] dark:text-white">
                          Alice Smith
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[#617589] hover:text-primary">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-[#111418] dark:text-white">
                          Oct 22, 2023
                        </span>
                        <span className="text-xs text-[#617589]">11:20 AM</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary">
                          <Zap className="w-4.5 h-4.5 text-[18px]" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-[#111418] dark:text-white">
                            Dosing Pump Motor
                          </span>
                          <span className="text-xs text-[#617589]">
                            SKU: PMP-M-500
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#e7f6ed] text-[#078838]">
                        ENTRY
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-bold text-[#078838]">
                        +2 Units
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary uppercase">
                          JD
                        </div>
                        <span className="text-sm text-[#111418] dark:text-white">
                          John Doe
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[#617589] hover:text-primary">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-[#111418] dark:text-white">
                          Oct 20, 2023
                        </span>
                        <span className="text-xs text-[#617589]">04:05 PM</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary">
                          <Beaker className="w-4.5 h-4.5 text-[18px]" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-[#111418] dark:text-white">
                            Polyamide Membrane
                          </span>
                          <span className="text-xs text-[#617589]">
                            SKU: MEM-RO-40
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700">
                        EXIT
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-bold text-orange-700">
                        -5 Units
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-[10px] font-bold text-green-600 uppercase">
                          RM
                        </div>
                        <span className="text-sm text-[#111418] dark:text-white">
                          Robert Mike
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[#617589] hover:text-primary">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-[#f0f2f4] dark:border-gray-800 flex items-center justify-between">
              <p className="text-xs text-[#617589] font-medium">
                Mostrando 1 a 10 de 1,284 resultados
              </p>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 text-sm font-bold border border-[#dbe0e6] dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
                  disabled
                >
                  Previous
                </button>
                <button className="px-3 py-1 text-sm font-bold border border-[#dbe0e6] dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center text-[#617589] text-xs">
            <p>© 2023 WaterFlow Systems LLC. All rights reserved.</p>
            <div className="flex gap-4">
              <a className="hover:text-primary" href="#">
                Privacy Policy
              </a>
              <a className="hover:text-primary" href="#">
                Support Center
              </a>
            </div>
          </div>
        </div>
      </main>
    </Sidebar>
  );
};

export default CompanyMovementsPage;
