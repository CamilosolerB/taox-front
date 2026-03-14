'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/adminInventory/utils';
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
      <Sidebar>
        <main className="flex-1 overflow-y-auto flex flex-col">
          <div className="p-8 flex items-center justify-center">
            <p className="text-slate-500">
              Inicia sesión para ver clientes.
            </p>
          </div>
        </main>
      </Sidebar>
    );
  }

  if (clientsQuery.isLoading) {
    return (
      <Sidebar>
        <main className="flex-1 overflow-y-auto flex flex-col">
          <div className="p-8 flex items-center justify-center">
            <p className="text-slate-500">Cargando clientes…</p>
          </div>
        </main>
      </Sidebar>
    );
  }

  if (clientsQuery.isError) {
    return (
      <Sidebar>
        <main className="flex-1 overflow-y-auto flex flex-col">
          <div className="p-8 flex flex-col items-center justify-center gap-4">
            <p className="text-red-500">Error al cargar clientes.</p>
            <button
              type="button"
              onClick={() => clientsQuery.refetch()}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium"
            >
              Reintentar
            </button>
          </div>
        </main>
      </Sidebar>
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
      value: `${clients.filter((c: any) => c.es_activo).length} Activos`,
      description: (
        <p className="text-[#617589] dark:text-gray-400">
          Clientes con servicio activo
        </p>
      ),
    },
    {
      icon: <Users className="w-5 h-5 text-primary" />,
      label: 'Por Ciudad',
      value: 'Múltiples ubicaciones',
      description: (
        <p className="text-[#617589] dark:text-gray-400">
          Distribuidores regionales
        </p>
      ),
    },
  ];

  return (
    <Sidebar>
      <main className="flex-1 overflow-y-auto flex flex-col">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Gestión de Clientes
                </h1>
                <p className="text-slate-400">
                  Administra los clientes y consumidores de servicios de agua.
                </p>
              </div>
              <button
                onClick={handleAddEntity}
                className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors"
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
                className="bg-slate-800 border border-slate-700 rounded-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {stat.icon}
                    <h3 className="text-slate-400 text-sm">{stat.label}</h3>
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-2">
                  {stat.value}
                </p>
                {stat.description}
              </div>
            ))}
          </div>

          {/* Clients Table */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
            <ClientsTable
              clients={clients}
              isLoading={clientsQuery.isLoading}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
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
      </main>
    </Sidebar>
  );
};

export default CompanyClientsPage;
