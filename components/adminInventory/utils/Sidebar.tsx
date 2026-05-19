"use client";

import { useState } from "react";
import {
  Archive,
  History,
  LayoutDashboard,
  MapPin,
  Moon,
  Package,
  Sun,
  Truck,
  Users,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuth, useCompanies } from "@/hooks";

interface SidebarProps {
  children: React.ReactNode;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export const Sidebar = ({ children, isCollapsed, setIsCollapsed }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { companyId } = useAuth();
  const { useGetCompany } = useCompanies();
  const { data: company } = useGetCompany(companyId);

  const getLinkClass = (href: string) => {
    const isActive = pathname === href || pathname.startsWith(`${href}/`);
    return isActive
      ? `flex items-center ${isCollapsed ? "justify-center" : "space-x-3"} px-3 py-2.5 bg-primary/10 text-primary rounded-xl font-semibold transition-all duration-200`
      : `flex items-center ${isCollapsed ? "justify-center" : "space-x-3"} px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-primary transition-all duration-200 rounded-xl`;
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          {company?.logo ? (
            <div className="w-9 h-9 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm bg-white">
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${company.logo}`}
                alt={company.name}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-bold text-white text-xs shadow-md">
              {company?.name?.charAt(0).toUpperCase() || "T"}
            </div>
          )}
          <span className="text-lg font-bold tracking-tight text-slate-800 dark:text-white uppercase truncate max-w-[180px]">
            {company?.name || "Taox"}
          </span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar Aside */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 transition-all duration-300 ease-in-out shadow-xl lg:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${isCollapsed ? "w-20" : "w-72"}`}
      >
        {/* Collapse Toggle (Desktop only) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full items-center justify-center text-slate-500 hover:text-primary shadow-sm z-50 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Branding Section */}
        <div className={`p-6 mb-4 flex items-center ${isCollapsed ? "justify-center" : "space-x-4"}`}>
          {company?.logo ? (
            <div className={`rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm bg-white transition-all duration-300 flex-shrink-0 ${isCollapsed ? "w-10 h-10" : "w-14 h-14"}`}>
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${company.logo}`}
                alt={company.name}
                className="w-full h-full object-contain p-1"
              />
            </div>
          ) : (
            <div className={`rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-bold text-white shadow-md transition-all duration-300 flex-shrink-0 ${isCollapsed ? "w-10 h-10 text-sm" : "w-14 h-14 text-xl"}`}>
              {company?.name?.charAt(0).toUpperCase() || "T"}
            </div>
          )}
          {!isCollapsed && (
            <div className="flex flex-col min-w-0 overflow-hidden">
              <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white uppercase truncate leading-none mb-1">
                {company?.name || "Taox"}
              </span>
              <span className="text-[10px] text-primary font-bold tracking-[0.2em] uppercase opacity-80">
                Enterprise
              </span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-180px)] custom-scrollbar">
          {!isCollapsed && (
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-2 mt-4">
              Principal
            </p>
          )}
          
          <a className={getLinkClass("/company/dashboard")} href="/company/dashboard" title={isCollapsed ? "Dashboard" : ""}>
            <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span>Dashboard</span>}
          </a>
          <a className={getLinkClass("/company/inventory")} href="/company/inventory" title={isCollapsed ? "Inventario" : ""}>
            <Archive className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span>Inventario</span>}
          </a>
          <a className={getLinkClass("/company/warehouses")} href="/company/warehouses" title={isCollapsed ? "Almacenes" : ""}>
            <Package className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span>Almacenes</span>}
          </a>
          <a className={getLinkClass("/company/movements")} href="/company/movements" title={isCollapsed ? "Movimientos" : ""}>
            <History className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span>Movimientos</span>}
          </a>

          {!isCollapsed && (
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mt-8 mb-2">
              Administración
            </p>
          )}
          
          <a className={getLinkClass("/company/providers")} href="/company/providers" title={isCollapsed ? "Proveedores" : ""}>
            <Truck className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span>Proveedores</span>}
          </a>

          <a className={getLinkClass("/company/clients")} href="/company/clients" title={isCollapsed ? "Clientes" : ""}>
            <Users className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span>Clientes</span>}
          </a>
          <a className={getLinkClass("/company/users")} href="/company/users" title={isCollapsed ? "Usuarios" : ""}>
            <Users className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span>Usuarios & Roles</span>}
          </a>
        </nav>

        {/* Footer Actions */}
        <div className={`absolute bottom-0 w-full p-4 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm`}>
          <button className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"} w-full px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 group`}>
            <div className="flex items-center space-x-2">
              <Moon className="w-5 h-5 group-hover:text-primary transition-colors" />
              {!isCollapsed && <span className="font-medium">Modo Oscuro</span>}
            </div>
          </button>
        </div>
      </aside>

      {/* Content Wrapper */}
      <main className={`transition-all duration-300 ease-in-out mt-10 ${isCollapsed ? "lg:ml-20" : "lg:ml-72"} min-h-screen bg-slate-50 dark:bg-slate-950`}>
        <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 pt-24 transition-all duration-300">
          {children}
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
        }
      `}</style>
    </>
  );
};
