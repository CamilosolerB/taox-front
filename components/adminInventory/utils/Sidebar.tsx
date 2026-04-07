"use client";

import { useState } from "react";
import {
  Archive,
  History,
  LayoutDashboard,
  MapPin,
  Moon,
  Sun,
  Truck,
  Users,
  Menu,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface SidebarProps {
  children: React.ReactNode;
}

export const Sidebar = ({ children }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const getLinkClass = (href: string) => {
    const isActive = pathname === href || pathname.startsWith(`${href}/`);
    return isActive
      ? "flex items-center space-x-3 px-3 py-2 bg-primary/10 text-primary rounded-lg font-medium"
      : "flex items-center space-x-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary transition-all rounded-lg";
  };

  return (
    <>
      <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <Image
            alt="Taox Logo"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
            src="/taox-logo.png"
          />
          <span className="text-lg font-bold tracking-tight text-slate-800 dark:text-white uppercase">
            Taox
          </span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        id="sidebar-overlay"
        onClick={() => setIsOpen(false)}
      ></div>
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 transition-transform overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
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
            className={getLinkClass("/company/dashboard")}
            href="/company/dashboard"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </a>
          <a
            className={getLinkClass("/company/inventory")}
            href="/company/inventory"
          >
            <Archive className="w-5 h-5" />
            <span>Inventario</span>
          </a>
          <a
            className={getLinkClass("/company/movements")}
            href="/company/movements"
          >
            <History className="w-5 h-5" />
            <span>Movimientos</span>
          </a>
          <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mt-8 mb-2">
            Administración
          </p>
          <a
            className={getLinkClass("/company/providers")}
            href="/company/providers"
          >
            <Truck className="w-5 h-5" />
            <span>Proveedores</span>
          </a>
          <a
            className={getLinkClass("/company/locations")}
            href="/company/locations"
          >
            <MapPin className="w-5 h-5" />
            <span>Ubicaciones</span>
          </a>
          <a
            className={getLinkClass("/company/users")}
            href="/company/users"
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
