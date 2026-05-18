"use client";

import { useState } from "react";
import { Shield, ShieldCheck, CheckCircle, XCircle, Search, Building2 } from "lucide-react";
import { useUsers } from "@/hooks";

export default function SudoUsersPage() {
  const { useGetAdminUsers } = useUsers();
  const { data: users, isLoading } = useGetAdminUsers();
  const [search, setSearch] = useState("");

  const filtered = users?.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.username?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.role_name?.toLowerCase().includes(q) ||
      u.company_name?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Global User Administration
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Administra los usuarios con acceso administrativo — Company Admins y Sudo.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre, email, empresa..."
          className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
        />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-background-dark border border-[#f0f2f4] dark:border-white/10 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50 border-b border-[#f0f2f4] dark:border-white/10">
              <tr>
                <th className="px-6 py-4 font-semibold">Usuario</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Rol</th>
                <th className="px-6 py-4 font-semibold">Empresa</th>
                <th className="px-6 py-4 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f2f4] dark:divide-white/10">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-400">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      <span>Cargando usuarios...</span>
                    </div>
                  </td>
                </tr>
              ) : filtered?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-400">
                    No se encontraron usuarios administrativos.
                  </td>
                </tr>
              ) : (
                filtered?.map((user) => {
                  const initials = (user.username || "U")
                    .split(/[\s_]/)
                    .map((n: string) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2);

                  const isSudo = user.role_name === "sudo";

                  return (
                    <tr
                      key={user.id_user}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors"
                    >
                      {/* Username */}
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                              isSudo
                                ? "bg-violet-100 text-violet-700 dark:bg-violet-400/10 dark:text-violet-400"
                                : "bg-primary/10 text-primary"
                            }`}
                          >
                            {initials}
                          </div>
                          <span className="font-medium text-slate-900 dark:text-white">
                            {user.username}
                          </span>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                        {user.email}
                      </td>

                      {/* Role badge */}
                      <td className="px-6 py-4">
                        {isSudo ? (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-100 text-violet-700 dark:bg-violet-400/10 dark:text-violet-400">
                            <ShieldCheck className="w-3 h-3" />
                            <span>Sudo</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-400/10 dark:text-blue-400">
                            <Shield className="w-3 h-3" />
                            <span>Company Admin</span>
                          </span>
                        )}
                      </td>

                      {/* Company */}
                      <td className="px-6 py-4">
                        {user.company_name ? (
                          <div className="flex items-center space-x-1.5 text-slate-600 dark:text-slate-400">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" />
                            <span>{user.company_name}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic">Global HQ</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        {user.is_active ? (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400">
                            <CheckCircle className="w-3 h-3" />
                            <span>Activo</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400">
                            <XCircle className="w-3 h-3" />
                            <span>Inactivo</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer count */}
        {!isLoading && (
          <div className="px-6 py-3 border-t border-[#f0f2f4] dark:border-white/10 text-xs text-slate-400">
            Mostrando {filtered?.length ?? 0} usuario(s) administrativo(s)
          </div>
        )}
      </div>
    </div>
  );
}
