"use client";

import { Edit2, Trash2, MoreVertical } from "lucide-react";
import type { ProviderDTO } from "@/interfaces/types";

interface ProvidersTableProps {
  providers: ProviderDTO[];
  isLoading?: boolean;
  onEdit: (provider: ProviderDTO) => void;
  onDelete: (provider: ProviderDTO) => void;
}

export function ProvidersTable({
  providers,
  isLoading = false,
  onEdit,
  onDelete,
}: ProvidersTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-slate-400">Cargando proveedores...</p>
      </div>
    );
  }

  if (providers.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-slate-400">No hay proveedores registrados</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-200">
              Código
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-200">
              Nombre
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-200">
              Contacto
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-200">
              Teléfono
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-200">
              Correo
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-200">
              Estado
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-200">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700">
          {providers.map((provider) => (
            <tr
              key={provider.cad_proveedor}
              className="hover:bg-slate-800/50 transition-colors"
            >
              <td className="px-4 py-3 text-sm text-slate-300">
                {provider.cad_proveedor}
              </td>
              <td className="px-4 py-3 text-sm text-slate-300">
                {provider.nombre}
              </td>
              <td className="px-4 py-3 text-sm text-slate-400">
                {provider.contacto}
              </td>
              <td className="px-4 py-3 text-sm text-slate-400">
                {provider.telefono}
              </td>
              <td className="px-4 py-3 text-sm text-slate-400 truncate max-w-xs">
                {provider.correo}
              </td>
              <td className="px-4 py-3 text-sm">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    provider.is_active
                      ? "bg-green-900/30 text-green-400 border border-green-600/50"
                      : "bg-red-900/30 text-red-400 border border-red-600/50"
                  }`}
                >
                  {provider.is_active ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td className="px-4 py-3 text-sm">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(provider)}
                    className="p-1.5 hover:bg-slate-700 rounded transition-colors text-slate-400 hover:text-blue-400"
                    title="Editar"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(provider)}
                    className="p-1.5 hover:bg-slate-700 rounded transition-colors text-slate-400 hover:text-red-400"
                    title="Eliminar"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
