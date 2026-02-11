import { Sidebar } from "@/components/adminInventory/utils";
import { Search, Bell, HelpCircle, Building2, Truck, User, Filter, CheckCircle2, Grid3X3, List, Download, MapPin, Phone, Mail, FileText, MoreHorizontal, BarChart3, TrendingUp, ClipboardCheck, Calendar, Building, Map } from "lucide-react";

const CompanyProviderPage = () => {
  return (
    <Sidebar>
      <main className="flex-1 overflow-y-auto flex flex-col">
        <header className="flex items-center justify-between bg-white dark:bg-background-dark px-8 py-4 border-b border-[#e5e7eb] dark:border-[#2d3748] sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <label className="flex flex-col min-w-64 max-w-md">
              <div className="flex w-full items-stretch rounded-lg h-10 border border-[#e5e7eb] dark:border-gray-700">
                <div className="text-[#617589] flex bg-white dark:bg-gray-800 items-center justify-center pl-4 rounded-l-lg">
                  <Search className="w-5 h-5 text-xl" />
                </div>
                <input
                  className="form-input flex w-full min-w-0 flex-1 border-none bg-white dark:bg-gray-800 text-[#111418] dark:text-white focus:ring-0 h-full placeholder:text-[#617589] px-4 rounded-r-lg text-sm"
                  placeholder="Search partners by name, NIT or city..."
                />
              </div>
            </label>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-[#617589] dark:text-gray-400 hover:bg-[#f0f2f4] dark:hover:bg-gray-800 rounded-lg">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-[#617589] dark:text-gray-400 hover:bg-[#f0f2f4] dark:hover:bg-gray-800 rounded-lg">
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </header>
        <div className="p-8">
          <div className="flex flex-wrap justify-between items-end gap-4 mb-6">
            <div className="flex flex-col gap-1">
              <p className="text-[#111418] dark:text-white text-3xl font-black leading-tight tracking-tight">
                Directorio de Socios
              </p>
              <p className="text-[#617589] dark:text-gray-400 text-sm font-medium">
                Administra proveedores globales y clientes regionales de servicios de agua.
              </p>
            </div>
            <button className="flex items-center justify-center gap-2 rounded-lg h-11 px-6 bg-primary text-white text-sm font-bold shadow-sm hover:bg-primary/90 transition-all">
              <Building2 className="w-5 h-5 text-lg" />
              <span>Añadir Nueva Entidad</span>
            </button>
          </div>
          <div className="mb-6 border-b border-[#dbe0e6] dark:border-gray-700">
            <div className="flex gap-8">
              <a
                className="flex items-center gap-2 border-b-2 border-primary text-primary pb-3 px-1 transition-all"
                href="#"
              >
                <Truck className="w-5 h-5 text-lg" />
                <p className="text-sm font-bold">Proveedores</p>
                <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold">
                  24
                </span>
              </a>
              <a
                className="flex items-center gap-2 border-b-2 border-transparent text-[#617589] dark:text-gray-400 pb-3 px-1 hover:text-primary transition-all"
                href="#"
              >
                <User className="w-5 h-5 text-lg" />
                <p className="text-sm font-bold">Clientes</p>
                <span className="bg-gray-100 dark:bg-gray-800 text-[#617589] text-[10px] px-2 py-0.5 rounded-full font-bold">
                  156
                </span>
              </a>
            </div>
          </div>
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <div className="flex gap-3">
              <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-[#e5e7eb] dark:border-gray-700 cursor-pointer text-sm font-medium text-[#111418] dark:text-white shadow-sm">
                <Filter className="w-5 h-5 text-lg text-[#617589]" />
                <span>Ciudad: Todas</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-[#e5e7eb] dark:border-gray-700 cursor-pointer text-sm font-medium text-[#111418] dark:text-white shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-lg text-green-500" />
                <span>Estado: Activo</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-[#617589] dark:text-gray-400 hover:text-primary">
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button className="p-2 text-[#617589] dark:text-gray-400 hover:text-primary">
                <List className="w-5 h-5" />
              </button>
              <button className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-[#e5e7eb] dark:border-gray-700 px-4 h-9 rounded-lg text-sm font-bold text-[#111418] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
                <Download className="w-5 h-5 text-lg" />
                <span>Exportar CSV</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-background-dark border border-[#e5e7eb] dark:border-gray-700 rounded-xl overflow-hidden card-shadow hover:ring-2 hover:ring-primary/20 transition-all flex flex-col">
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-lg">
                    HS
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-green-500"></span>{" "}
                      ACTIVE
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold tracking-tight uppercase">
                      Supplier
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <h3 className="text-[#111418] dark:text-white font-bold text-lg leading-tight">
                    HydroSolutions Inc.
                  </h3>
                  <p className="text-xs text-[#617589] dark:text-gray-400 font-medium">
                    NIT: 901.234.567-8
                  </p>
                </div>
                <div className="space-y-2.5 mb-6">
                  <div className="flex items-center gap-2 text-sm text-[#4a5568] dark:text-gray-300">
                    <MapPin className="w-5 h-5 text-lg text-[#617589]" />
                    <span>Austin, TX</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#4a5568] dark:text-gray-300">
                    <Phone className="w-5 h-5 text-lg text-[#617589]" />
                    <span>+1 (512) 555-0123</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#4a5568] dark:text-gray-300 truncate">
                    <Mail className="w-5 h-5 text-lg text-[#617589]" />
                    <span className="truncate">sales@hydrosolutions.com</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#f0f2f4] dark:border-gray-700">
                  <div>
                    <p className="text-[10px] text-[#617589] dark:text-gray-500 font-bold uppercase tracking-wider">
                      Active Contracts
                    </p>
                    <p className="text-sm font-bold text-[#111418] dark:text-white">
                      5 Activo
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#617589] dark:text-gray-500 font-bold uppercase tracking-wider">
                      Last Order
                    </p>
                    <p className="text-sm font-bold text-[#111418] dark:text-white">
                      Oct 12, 2023
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-5 py-3 bg-[#f9fafb] dark:bg-gray-800/50 flex items-center justify-between border-t border-[#e5e7eb] dark:border-gray-700">
                <button className="text-primary text-xs font-bold hover:underline flex items-center gap-1">
                  <FileText className="w-4 h-4 text-sm" />
                  View Contracts
                </button>
                <button className="p-1.5 text-[#617589] dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 rounded-md transition-colors shadow-sm">
                  <MoreHorizontal className="w-5 h-5 text-xl" />
                </button>
              </div>
            </div>
            <div className="bg-white dark:bg-background-dark border border-[#e5e7eb] dark:border-gray-700 rounded-xl overflow-hidden card-shadow hover:ring-2 hover:ring-primary/20 transition-all flex flex-col">
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="size-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400 font-black text-lg">
                    AW
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-green-500"></span>{" "}
                      ACTIVE
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold tracking-tight uppercase">
                      Supplier
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <h3 className="text-[#111418] dark:text-white font-bold text-lg leading-tight">
                    AquaWorks Equipment
                  </h3>
                  <p className="text-xs text-[#617589] dark:text-gray-400 font-medium">
                    NIT: 800.112.990-1
                  </p>
                </div>
                <div className="space-y-2.5 mb-6">
                  <div className="flex items-center gap-2 text-sm text-[#4a5568] dark:text-gray-300">
                    <MapPin className="w-5 h-5 text-lg text-[#617589]" />
                    <span>Houston, TX</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#4a5568] dark:text-gray-300">
                    <Phone className="w-5 h-5 text-lg text-[#617589]" />
                    <span>+1 (713) 444-2390</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#4a5568] dark:text-gray-300 truncate">
                    <Mail className="w-5 h-5 text-lg text-[#617589]" />
                    <span className="truncate">support@aquaworks.co</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#f0f2f4] dark:border-gray-700">
                  <div>
                    <p className="text-[10px] text-[#617589] dark:text-gray-500 font-bold uppercase tracking-wider">
                      Active Contracts
                    </p>
                    <p className="text-sm font-bold text-[#111418] dark:text-white">
                      2 Active
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#617589] dark:text-gray-500 font-bold uppercase tracking-wider">
                      Last Order
                    </p>
                    <p className="text-sm font-bold text-[#111418] dark:text-white">
                      Sep 28, 2023
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-5 py-3 bg-[#f9fafb] dark:bg-gray-800/50 flex items-center justify-between border-t border-[#e5e7eb] dark:border-gray-700">
                <button className="text-primary text-xs font-bold hover:underline flex items-center gap-1">
                  <FileText className="w-4 h-4 text-sm" />
                  View Contracts
                </button>
                <button className="p-1.5 text-[#617589] dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 rounded-md transition-colors shadow-sm">
                  <MoreHorizontal className="w-5 h-5 text-xl" />
                </button>
              </div>
            </div>
            <div className="bg-white dark:bg-background-dark border border-[#e5e7eb] dark:border-gray-700 rounded-xl overflow-hidden card-shadow hover:ring-2 hover:ring-primary/20 transition-all flex flex-col opacity-80">
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="size-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 font-black text-lg">
                    TC
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[10px] font-bold flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-gray-400"></span>{" "}
                      INACTIVE
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold tracking-tight uppercase">
                      Supplier
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <h3 className="text-[#111418] dark:text-white font-bold text-lg leading-tight">
                    Texas Chem Logistics
                  </h3>
                  <p className="text-xs text-[#617589] dark:text-gray-400 font-medium">
                    NIT: 770.456.123-K
                  </p>
                </div>
                <div className="space-y-2.5 mb-6">
                  <div className="flex items-center gap-2 text-sm text-[#4a5568] dark:text-gray-300">
                    <MapPin className="w-5 h-5 text-lg text-[#617589]" />
                    <span>Dallas, TX</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#4a5568] dark:text-gray-300">
                    <Phone className="w-5 h-5 text-lg text-[#617589]" />
                    <span>+1 (214) 777-8899</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#4a5568] dark:text-gray-300 truncate">
                    <Mail className="w-5 h-5 text-lg text-[#617589]" />
                    <span className="truncate">logistics@txchem.io</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#f0f2f4] dark:border-gray-700">
                  <div>
                    <p className="text-[10px] text-[#617589] dark:text-gray-500 font-bold uppercase tracking-wider">
                      Active Contracts
                    </p>
                    <p className="text-sm font-bold text-gray-400">0 Active</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#617589] dark:text-gray-500 font-bold uppercase tracking-wider">
                      Last Order
                    </p>
                    <p className="text-sm font-bold text-[#111418] dark:text-white">
                      Aug 05, 2022
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-5 py-3 bg-[#f9fafb] dark:bg-gray-800/50 flex items-center justify-between border-t border-[#e5e7eb] dark:border-gray-700">
                <button className="text-primary text-xs font-bold hover:underline flex items-center gap-1">
                  <FileText className="w-4 h-4 text-sm" />
                  View Contracts
                </button>
                <button className="p-1.5 text-[#617589] dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 rounded-md transition-colors shadow-sm">
                  <MoreHorizontal className="w-5 h-5 text-xl" />
                </button>
              </div>
            </div>
            <div className="bg-white dark:bg-background-dark border border-[#e5e7eb] dark:border-gray-700 rounded-xl overflow-hidden card-shadow hover:ring-2 hover:ring-primary/20 transition-all flex flex-col">
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="size-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-700 dark:text-purple-400 font-black text-lg">
                    PF
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-green-500"></span>{" "}
                      ACTIVE
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold tracking-tight uppercase">
                      Client
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <h3 className="text-[#111418] dark:text-white font-bold text-lg leading-tight">
                    PureFlow Maintenance
                  </h3>
                  <p className="text-xs text-[#617589] dark:text-gray-400 font-medium">
                    NIT: 900.555.332-1
                  </p>
                </div>
                <div className="space-y-2.5 mb-6">
                  <div className="flex items-center gap-2 text-sm text-[#4a5568] dark:text-gray-300">
                    <MapPin className="w-5 h-5 text-lg text-[#617589]" />
                    <span>San Antonio, TX</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#4a5568] dark:text-gray-300">
                    <Phone className="w-5 h-5 text-lg text-[#617589]" />
                    <span>+1 (210) 333-2211</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#4a5568] dark:text-gray-300 truncate">
                    <Mail className="w-5 h-5 text-lg text-[#617589]" />
                    <span className="truncate">pureflow@maintenance.com</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#f0f2f4] dark:border-gray-700">
                  <div>
                    <p className="text-[10px] text-[#617589] dark:text-gray-500 font-bold uppercase tracking-wider">
                      Active Contracts
                    </p>
                    <p className="text-sm font-bold text-[#111418] dark:text-white">
                      8 Active
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#617589] dark:text-gray-500 font-bold uppercase tracking-wider">
                      Last Order
                    </p>
                    <p className="text-sm font-bold text-[#111418] dark:text-white">
                      Oct 15, 2023
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-5 py-3 bg-[#f9fafb] dark:bg-gray-800/50 flex items-center justify-between border-t border-[#e5e7eb] dark:border-gray-700">
                <button className="text-primary text-xs font-bold hover:underline flex items-center gap-1">
                  <FileText className="w-4 h-4 text-sm" />
                  View Contracts
                </button>
                <button className="p-1.5 text-[#617589] dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 rounded-md transition-colors shadow-sm">
                  <MoreHorizontal className="w-5 h-5 text-xl" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mb-10">
            <p className="text-sm text-[#617589] dark:text-gray-400 font-medium">
              Mostrando
              <span className="text-[#111418] dark:text-white font-bold"> 4</span> de
              <span className="text-[#111418] dark:text-white font-bold"> 24</span>
              proveedores
            </p>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 border border-[#e5e7eb] dark:border-gray-700 rounded-lg text-xs font-bold text-[#617589] dark:text-gray-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 shadow-sm"
                disabled
              >
                Anterior
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold shadow-sm">
                1
              </button>
              <button className="px-4 py-2 border border-[#e5e7eb] dark:border-gray-700 rounded-lg text-xs font-bold text-[#617589] dark:text-gray-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm">
                2
              </button>
              <button className="px-4 py-2 border border-[#e5e7eb] dark:border-gray-700 rounded-lg text-xs font-bold text-[#617589] dark:text-gray-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm">
                Siguiente
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-[#e5e7eb] dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
                <p className="text-xs font-bold text-[#617589] dark:text-gray-400 uppercase tracking-widest">
                  Socios Globales
                </p>
              </div>
              <p className="text-3xl font-black text-[#111418] dark:text-white">
                12 Proveedores
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-2 font-semibold flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-xs" />
                +2 añadidos este mes
              </p>
            </div>
            <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-[#e5e7eb] dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <ClipboardCheck className="w-5 h-5 text-primary" />
                </div>
                <p className="text-xs font-bold text-[#617589] dark:text-gray-400 uppercase tracking-widest">
                  Contratos Activos
                </p>
              </div>
              <p className="text-3xl font-black text-[#111418] dark:text-white">
                18 Activos
              </p>
              <p className="text-xs text-[#617589] dark:text-gray-400 mt-2 font-semibold flex items-center gap-1">
                <Calendar className="w-4 h-4 text-xs" />
                4 expirando en 30 días
              </p>
            </div>
            <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-[#e5e7eb] dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Building className="w-5 h-5 text-primary" />
                </div>
                <p className="text-xs font-bold text-[#617589] dark:text-gray-400 uppercase tracking-widest">
                  Cobertura Regional
                </p>
              </div>
              <p className="text-3xl font-black text-[#111418] dark:text-white">
                6 Ciudades
              </p>
              <p className="text-xs text-[#617589] dark:text-gray-400 mt-2 font-semibold flex items-center gap-1">
                <Map className="w-4 h-4 text-xs" />
                En Texas &amp; Nuevo México
              </p>
            </div>
          </div>
        </div>
      </main>
    </Sidebar>
  );
};

export default CompanyProviderPage;
