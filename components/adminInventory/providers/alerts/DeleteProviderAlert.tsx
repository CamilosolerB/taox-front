"use client";

import { AlertCircle } from "lucide-react";
import { useProviders } from "@/hooks";

interface DeleteProviderAlertProps {
  isOpen: boolean;
  provider: any | null;
  onClose: () => void;
  companyId: string;
}

export function DeleteProviderAlert({
  isOpen,
  provider,
  onClose,
  companyId,
}: DeleteProviderAlertProps) {
  const { useDeleteProvider } = useProviders(companyId);
  const deleteProviderMutation = useDeleteProvider();

  if (!isOpen || !provider) return null;

  const handleConfirm = async () => {
    try {
      await deleteProviderMutation.mutateAsync({
        providerId: provider.cad_proveedor,
        companyId: companyId,
      });
      onClose();
    } catch (error) {
      console.error("Error deleting provider:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 rounded-lg shadow-xl border border-slate-700 w-96 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">
                ¿Eliminar proveedor?
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                ¿Está seguro de que desea eliminar a{" "}
                <span className="font-semibold text-slate-200">{provider.nombre}</span>?
                Esta acción no se puede deshacer.
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors font-medium"
              disabled={deleteProviderMutation.isPending}
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50"
              disabled={deleteProviderMutation.isPending}
            >
              {deleteProviderMutation.isPending ? "Eliminando..." : "Eliminar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
