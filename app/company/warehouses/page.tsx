'use client';

import { useState } from 'react';

import { useWarehouses } from '@/hooks/useWarehouses';
import { useAuth } from '@/providers/AuthProvider';
import { Plus, Package, Edit2, Trash2, Building2 } from 'lucide-react';

interface Warehouse {
  id: string;
  nombre: string;
  descripcion?: string;
}

function WarehousesPageContent() {
  const { companyId } = useAuth();
  const {
    useGetAllWarehouses,
    useCreateWarehouse,
    useUpdateWarehouse,
    useDeleteWarehouse
  } = useWarehouses(companyId);

  const { data: warehouses = [], isLoading } = useGetAllWarehouses();
  const createMutation = useCreateWarehouse();
  const updateMutation = useUpdateWarehouse();
  const deleteMutation = useDeleteWarehouse();

  const [showModal, setShowModal] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(null);
  const [formData, setFormData] = useState({ nombre: '', descripcion: '' });

  const handleOpenCreate = () => {
    setFormData({ nombre: '', descripcion: '' });
    setEditingWarehouse(null);
    setShowModal(true);
  };

  const handleOpenEdit = (warehouse: Warehouse) => {
    setFormData({ nombre: warehouse.nombre, descripcion: warehouse.descripcion || '' });
    setEditingWarehouse(warehouse);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.nombre.trim()) return;
    try {
      if (editingWarehouse) {
        await updateMutation.mutateAsync({ warehouseId: editingWarehouse.id, body: formData });
      } else {
        await createMutation.mutateAsync(formData);
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error saving warehouse:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este almacén?')) return;
    try {
      await deleteMutation.mutateAsync(id);
    } catch (error) {
      console.error('Error deleting warehouse:', error);
    }
  };

  if (!companyId) {
    return (
      <>
        <main className="flex-1 overflow-auto p-8 flex items-center justify-center">
          <p className="text-slate-500">Inicia sesión para ver los almacenes.</p>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="flex-1 overflow-auto p-8 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Almacenes</h1>
            <p className="text-slate-400 mt-1">Gestiona los almacenes de tu empresa</p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus size={18} />
            Nuevo Almacén
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center gap-2 text-slate-500">
            <span className="inline-block w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            Cargando...
          </div>
        ) : warehouses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-500">
            <Building2 size={48} className="mb-4 opacity-50" />
            <p className="text-lg">No hay almacenes registrados</p>
            <p className="text-sm">Crea tu primer almacén para gestionar inventario</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {warehouses.map((w: any) => (
              <div
                key={w.id}
                className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Package className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{w.nombre}</h3>
                    <p className="text-sm text-slate-500">{w.descripcion || 'Sin descripción'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(w)}
                    className="p-2 text-slate-500 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(w.id)}
                    disabled={deleteMutation.isPending}
                    className="p-2 text-slate-500 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                {editingWarehouse ? 'Editar Almacén' : 'Nuevo Almacén'}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    placeholder="Nombre del almacén"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Descripción
                  </label>
                  <textarea
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white resize-none"
                    rows={3}
                    placeholder="Descripción opcional"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={createMutation.isPending || updateMutation.isPending || !formData.nombre.trim()}
                  className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {createMutation.isPending || updateMutation.isPending ? 'Guardando...' : editingWarehouse ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default function WarehousesPage() {
  return <WarehousesPageContent />;
}