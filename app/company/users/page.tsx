import { Sidebar } from "@/components/adminInventory/utils";
import { Search, Bell, Users, TrendingUp, Lock, Wrench, Layers, UserPlus, Pencil, Trash2 } from "lucide-react";

const CompanyUsersPage = () => {
  return (
    <>
      <Sidebar>
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <header className="h-16 flex items-center justify-between px-8 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <h1 className="text-xl font-semibold text-slate-800 dark:text-white">
              Gestión de Usuarios y Roles
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  className="pl-10 pr-4 py-1.5 bg-slate-100 dark:bg-slate-800 border-none rounded-full text-sm focus:ring-2 focus:ring-primary w-64 text-slate-700 dark:text-slate-200"
                  placeholder="Buscar usuarios..."
                  type="text"
                />
              </div>
              <button className="relative p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
              </button>
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">
                JD
              </div>
            </div>
          </header>
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Total de Usuarios
                  </span>
                  <Users className="text-primary w-5 h-5" />
                </div>
                <div className="text-2xl font-bold">124</div>
                <div className="text-xs text-green-500 mt-1 flex items-center">
                  <TrendingUp className="text-xs mr-1 w-4 h-4" />
                  +5 nuevos este mes
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Administradores Activos
                  </span>
                  <Lock className="text-amber-500 w-5 h-5" />
                </div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-xs text-slate-400 mt-1">
                  Acceso limitado
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Operadores
                  </span>
                  <Wrench className="text-cyan-500 w-5 h-5" />
                </div>
                <div className="text-2xl font-bold">102</div>
                <div className="text-xs text-slate-400 mt-1">
                  Personal de campo
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Roles del Sistema
                  </span>
                  <Layers className="text-purple-500 w-5 h-5" />
                </div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-xs text-slate-400 mt-1">Jerárquico</div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                    Directorio de Usuarios
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Administra los miembros del equipo de tratamiento de agua y permisos.
                  </p>
                </div>
                <button className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-all shadow-lg shadow-primary/20">
                  <UserPlus className="mr-2 w-4 h-4" />
                  Crear Usuario
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 uppercase text-xs font-bold tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Usuario</th>
                      <th className="px-6 py-4">Rol</th>
                      <th className="px-6 py-4">Estado</th>
                      <th className="px-6 py-4">Último Inicio de Sesión</th>
                      <th className="px-6 py-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-bold mr-3">
                            AM
                          </div>
                          <div>
                            <div className="font-medium text-slate-900 dark:text-white">
                              Alejandro Morales
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                              alejandro.m@taox.com
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                          Company Admin
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm">
                          <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                          Active
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                        2 hours ago
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="p-1 hover:text-primary transition-colors">
                            <Pencil className="w-5 h-5" />
                          </button>
                          <button className="p-1 hover:text-red-500 transition-colors">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-bold mr-3">
                            SR
                          </div>
                          <div>
                            <div className="font-medium text-slate-900 dark:text-white">
                              Sofia Rodriguez
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                              s.rodriguez@plant-a.com
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400">
                          Operator
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm">
                          <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                          Active
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                        12 mins ago
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="p-1 hover:text-primary transition-colors">
                            <Pencil className="w-5 h-5" />
                          </button>
                          <button className="p-1 hover:text-red-500 transition-colors">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-bold mr-3">
                            CL
                          </div>
                          <div>
                            <div className="font-medium text-slate-900 dark:text-white">
                              Carlos Lopez
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                              c.lopez@taox.com
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
                          Super Admin
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm">
                          <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600 mr-2"></span>
                          Inactive
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                        5 days ago
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="p-1 hover:text-primary transition-colors">
                            <Pencil className="w-5 h-5" />
                          </button>
                          <button className="p-1 hover:text-red-500 transition-colors">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-bold mr-3">
                            VG
                          </div>
                          <div>
                            <div className="font-medium text-slate-900 dark:text-white">
                              Valeria Garcia
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                              v.garcia@waterex.net
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400">
                          Operator
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm">
                          <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                          Active
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                        Yesterday
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="p-1 hover:text-primary transition-colors">
                            <Pencil className="w-5 h-5" />
                          </button>
                          <button className="p-1 hover:text-red-500 transition-colors">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Mostrando 4 de 124 usuarios
                </span>
                <div className="flex space-x-1">
                  <button className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-sm hover:bg-slate-50 transition-colors">
                    Anterior
                  </button>
                  <button className="px-3 py-1 bg-primary text-white border border-primary rounded text-sm font-medium">
                    1
                  </button>
                  <button className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-sm hover:bg-slate-50 transition-colors">
                    2
                  </button>
                  <button className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-sm hover:bg-slate-50 transition-colors">
                    3
                  </button>
                  <button className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-sm hover:bg-slate-50 transition-colors">
                    Siguiente
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Sidebar>
    </>
  );
};

export default CompanyUsersPage;
