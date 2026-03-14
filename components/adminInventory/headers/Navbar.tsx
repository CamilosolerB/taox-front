"use client";

import { useState } from "react";
import { LogOut, Bell } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { useAlerts } from "@/hooks";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { companyId } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const alerts = useAlerts(companyId).useGetActiveAlerts();

  const activeAlertsCount = alerts.data?.length || 0;

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-slate-800 shadow-lg">
      <div className="max-w-full px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <h1 className="text-xl font-bold text-white hidden sm:block">TAOX</h1>
          </div>

          {/* Center - Empty space for navigation items if needed */}
          <div className="flex-1" />

          {/* Right section - User info and actions */}
          <div className="flex items-center gap-4">
            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2 rounded-lg transition-colors ${
                  showNotifications
                    ? "bg-slate-800 text-blue-400"
                    : "hover:bg-slate-800 text-slate-400"
                }`}
                title="Notificaciones"
              >
                <Bell size={20} />
                {activeAlertsCount > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {activeAlertsCount > 9 ? "9+" : activeAlertsCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-800 rounded-lg shadow-xl border border-slate-700 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-slate-700">
                    <h3 className="text-white font-semibold">
                      Alertas Activas ({activeAlertsCount})
                    </h3>
                  </div>

                  {alerts.isLoading ? (
                    <div className="p-4 text-center text-slate-400">
                      Cargando alertas...
                    </div>
                  ) : alerts.isError ? (
                    <div className="p-4 text-center text-red-400">
                      Error cargando alertas
                    </div>
                  ) : activeAlertsCount === 0 ? (
                    <div className="p-4 text-center text-slate-400">
                      No hay alertas activas
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-700">
                      {alerts.data?.map((alert) => (
                        <div
                          key={alert.id_alerta}
                          className="p-3 hover:bg-slate-700/50 transition-colors"
                        >
                          <div className="flex items-start gap-2">
                            <div
                              className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                                alert.tipo_alerta === "stock_critico"
                                  ? "bg-red-500"
                                  : alert.tipo_alerta === "stock_bajo"
                                    ? "bg-yellow-500"
                                    : "bg-orange-500"
                              }`}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-medium truncate">
                                Producto: {alert.codigo_producto}
                              </p>
                              <p className="text-slate-400 text-xs mt-1">
                                {alert.tipo_alerta === "stock_critico" &&
                                  "Stock Crítico"}
                                {alert.tipo_alerta === "stock_bajo" &&
                                  "Stock Bajo"}
                                {alert.tipo_alerta === "exceso" &&
                                  "Exceso de Stock"}
                              </p>
                              {alert.descripcion && (
                                <p className="text-slate-400 text-xs mt-1 line-clamp-2">
                                  {alert.descripcion}
                                </p>
                              )}
                              <p className="text-slate-500 text-xs mt-1">
                                Actual: {alert.cantidad_actual.toFixed(2)} /
                                Ref: {alert.cantidad_referencia.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User Info */}
            {user && (
              <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-white truncate">
                    {user.username}
                  </p>
                  <p className="text-xs text-slate-400">{user.email}</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              </div>
            )}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-red-400 transition-colors"
              title="Cerrar sesión"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
