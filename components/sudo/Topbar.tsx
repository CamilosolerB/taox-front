"use client";

import { Bell, Search, LogOut } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

export default function Topbar() {
  const { user, logout } = useAuth();

  return (
    <header className="h-20 border-b border-[#f0f2f4] dark:border-white/10 flex items-center justify-between px-8 bg-white dark:bg-background-dark">
      <div className="flex-1 max-w-2xl relative">
        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search companies, users..."
          className="w-full bg-[#f8fafc] dark:bg-slate-800/50 border-none rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 dark:text-slate-300"
        />
      </div>

      <div className="flex items-center space-x-6 ml-4">
        <button className="relative text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute 1 top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>

        <div className="flex items-center space-x-3 group">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {user?.username || "Super Admin"}
            </p>
            <p className="text-xs text-slate-500">{user?.email || "admin@taox.com"}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-md shadow-primary/20 transition-transform">
            SA
          </div>
        </div>

        <button 
          onClick={logout}
          className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition-colors border border-transparent hover:border-red-200 dark:hover:border-red-800"
          title="Cerrar sesión"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
