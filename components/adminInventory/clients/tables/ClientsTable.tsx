"use client";

import { Edit2, Trash2 } from "lucide-react";
import type { ClientDTO } from "@/api/types";

interface ClientsTableProps {
  clients: ClientDTO[];
  isLoading?: boolean;
  onEdit: (client: ClientDTO) => void;
  onDelete: (client: ClientDTO) => void;
}

export function ClientsTable({
  clients,
  isLoading = false,
  onEdit,
  onDelete,
}: ClientsTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-slate-400">Cargando clientes...</p>
      </div>
    );
  }

  if (clients.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-slate-400">No hay clientes registrados</p>
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
              Ciudad
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
          {clients.map((client) => (
            <tr
              key={client.codigo_cliente}
              className="hover:bg-slate-800/50 transition-colors"
            >
              <td className="px-4 py-3 text-sm text-slate-300">
                {client.codigo_cliente}
              </td>
              <td className="px-4 py-3 text-sm text-slate-300">
                {client.cliente}
              </td>
              <td className="px-4 py-3 text-sm text-slate-400">
                {client.contacto}
              </td>
              <td className="px-4 py-3 text-sm text-slate-400">
                {client.ciudad}
              </td>
              <td className="px-4 py-3 text-sm text-slate-400">
                {client.telefono1}
              </td>
              <td className="px-4 py-3 text-sm text-slate-400 truncate max-w-xs">
                {client.correo}
              </td>
              <td className="px-4 py-3 text-sm">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    client.is_active
                      ? "bg-green-900/30 text-green-400 border border-green-600/50"
                      : "bg-red-900/30 text-red-400 border border-red-600/50"
                  }`}
                >
                  {client.is_active ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td className="px-4 py-3 text-sm">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(client)}
                    className="p-1.5 hover:bg-slate-700 rounded transition-colors text-slate-400 hover:text-blue-400"
                    title="Editar"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(client)}
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
