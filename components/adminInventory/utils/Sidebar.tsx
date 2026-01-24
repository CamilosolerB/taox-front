import {
  Archive,
  History,
  LayoutDashboard,
  MapPin,
  Moon,
  Sun,
  Truck,
  Users,
} from "lucide-react";
import Image from "next/image";

interface SidebarProps {
  children: React.ReactNode;
}

export const Sidebar = ({ children }: SidebarProps) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden hidden"
        id="sidebar-overlay"
      >
        
      </div>
      <aside
        className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 transition-transform -translate-x-full lg:translate-x-0 overflow-y-auto"
        id="sidebar"
      >
        <div className="p-6 flex items-center space-x-3">
          <Image
            alt="Taox Logo"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
            src="/taox-logo.png"
          />
          <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white uppercase">
            Taox
          </span>
        </div>
        <nav className="mt-4 px-4 space-y-1">
          <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Principal
          </p>
          <a
            className="flex items-center space-x-3 px-3 py-2 bg-primary/10 text-primary rounded-lg font-medium"
            href="#"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </a>
          <a
            className="flex items-center space-x-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary transition-all rounded-lg"
            href="#"
          >
            <Archive className="w-5 h-5" />
            <span>Inventario</span>
          </a>
          <a
            className="flex items-center space-x-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary transition-all rounded-lg"
            href="#"
          >
            <History className="w-5 h-5" />
            <span>Movimientos</span>
          </a>
          <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mt-8 mb-2">
            Administración
          </p>
          <a
            className="flex items-center space-x-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary transition-all rounded-lg"
            href="#"
          >
            <Truck className="w-5 h-5" />
            <span>Proveedores</span>
          </a>
          <a
            className="flex items-center space-x-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary transition-all rounded-lg"
            href="#"
          >
            <MapPin className="w-5 h-5" />
            <span>Ubicaciones</span>
          </a>
          <a
            className="flex items-center space-x-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary transition-all rounded-lg"
            href="#"
          >
            <Users className="w-5 h-5" />
            <span>Usuarios &amp; Roles</span>
          </a>
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-slate-200 dark:border-slate-800">
          <button className="flex items-center justify-between w-full px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
            <div className="flex items-center space-x-2">
              <Moon className="w-5 h-5" />
              <Sun className="w-5 h-5 hidden" />
              <span className="dark:hidden">Modo Oscuro</span>
              <span className="hidden dark:block">Modo Claro</span>
            </div>
          </button>
        </div>
      </aside>
      <main className="lg:ml-64 p-4 lg:p-8">{children}</main>
    </>
  );
};
