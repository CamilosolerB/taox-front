'use client';

import { useState } from 'react';
import {
  CreateClientModal,
  EditClientModal,
  ClientsTable,
  DeleteClientAlert,
} from '@/components/adminInventory/clients';
import { useAuth, useClients } from '@/hooks';
import { BarChart3, TrendingUp, Building, Users } from 'lucide-react';

const CompanyClientsPage = () => {
  const { companyId } = useAuth();
  const { useGetClients } = useClients(companyId);
  const clientsQuery = useGetClients();

  // Modal state management
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any | null>(null);

  const handleAddEntity = () => {
    setShowCreateModal(true);
  };

  const handleEdit = (client: any) => {
    setSelectedClient(client);
    setShowEditModal(true);
  };

  const handleDelete = (client: any) => {
    setSelectedClient(client);
    setShowDeleteAlert(true);
  };

  if (!companyId) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <p className="text-slate-500">
          Inicia sesión para ver clientes.
        </p>
      </div>
    );
  }

  if (clientsQuery.isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <p className="text-slate-500 animate-pulse">Cargando clientes…</p>
      </div>
    );
  }

  if (clientsQuery.isError) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-red-500">Error al cargar clientes.</p>
        <button
          type="button"
          onClick={() => clientsQuery.refetch()}
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium transition-colors hover:bg-primary/90"
        >
          Reintentar
        </button>
      </div>
    );
  }

  const clients = clientsQuery.data ?? [];

  const stats = [
    {
      icon: <BarChart3 className="w-5 h-5 text-primary" />,
      label: 'Total de Clientes',
      value: `${clients.length} Clientes`,
      description: (
        <p className="text-green-600 dark:text-green-400 flex items-center gap-1">
          <TrendingUp className="w-4 h-4 text-xs" />
          Gestión de consumidores de agua
        </p>
      ),
    },
    {
      icon: <Building className="w-5 h-5 text-primary" />,
      label: 'Clientes Activos',
      value: `${clients.filter((c: any) => c.is_active).length} Activos`,
      description: (
        <p className="text-[#617589] dark:text-gray-400">
          Clientes con servicio activo
        </p>
      ),
    },
    {
      icon: <Users className="w-5 h-5 text-primary" />,
      label: 'Ciudades Únicas',
      value: `${new Set(clients.map((c: any) => c.ciudad).filter(Boolean)).size} Ciudades`,
      description: (
        <p className="text-[#617589] dark:text-gray-400">
          Distribución regional
        </p>
      ),
    },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
              Gestión de Clientes
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              Administra los clientes y consumidores de servicios de agua.
            </p>
          </div>
          <button
            onClick={handleAddEntity}
            className="inline-flex items-center justify-center px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all shadow-lg shadow-primary/20 active:scale-95"
          >
            + Nuevo Cliente
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                {stat.icon}
              </div>
              <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.label}</h3>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {stat.value}
            </p>
            {stat.description}
          </div>
        ))}
      </div>

      {/* Clients Table */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
        <ClientsTable
          clients={clients}
          isLoading={clientsQuery.isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Modals */}
      <CreateClientModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        companyId={companyId}
      />

      <EditClientModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedClient(null);
        }}
        client={selectedClient}
        companyId={companyId}
      />

      <DeleteClientAlert
        isOpen={showDeleteAlert}
        onClose={() => {
          setShowDeleteAlert(false);
          setSelectedClient(null);
        }}
        client={selectedClient}
        companyId={companyId}
      />
    </div>
  );
};

export default CompanyClientsPage;
