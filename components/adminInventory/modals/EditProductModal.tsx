"use client";

import { useState, useCallback, useEffect } from "react";
import { Input, PrimaryButton, Modal } from "@/components/utils";
import { useInventory } from "@/hooks";
import { AlertCircle } from "lucide-react";
import { Product } from "@/interfaces/product";

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  companyId: string;
}

interface FormState {
  name: string;
  generic_name: string;
  price: string;
  unit_measure: string;
  unit_price: string;
  min_unit_price: string;
  lead_time_days: string;
  restorage: string;
}

export const EditProductModal = ({
  isOpen,
  onClose,
  product,
  companyId,
}: EditProductModalProps) => {
  const { useUpdateProduct } = useInventory(companyId);
  const updateMutation = useUpdateProduct();

  const [formState, setFormState] = useState<FormState>({
    name: "",
    generic_name: "",
    price: "",
    unit_measure: "",
    unit_price: "",
    min_unit_price: "",
    lead_time_days: "",
    restorage: "",
  });

  const [error, setError] = useState<string | null>(null);

  // Cargar datos del producto cuando se abre el modal
  useEffect(() => {
    if (isOpen && product) {
      setFormState({
        name: product.name,
        generic_name: product.generic_name,
        price: product.price.toString(),
        unit_measure: product.unit_measure,
        unit_price: product.unit_price.toString(),
        min_unit_price: product.min_unit_price.toString(),
        lead_time_days: product.lead_time_days.toString(),
        restorage: product.restorage,
      });
      setError(null);
    }
  }, [isOpen, product]);

  const handleInputChange = useCallback(
    (field: keyof FormState, value: string) => {
      setFormState((prev) => ({ ...prev, [field]: value }));
      setError(null);
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      if (!product) return;

      // Validación básica
      if (
        !formState.name ||
        !formState.generic_name ||
        !formState.unit_measure
      ) {
        setError("Por favor completa los campos requeridos");
        return;
      }

      try {
        await updateMutation.mutateAsync({
          productId: product.id_product,
          body: {
            name: formState.name,
            generic_name: formState.generic_name,
            price: parseFloat(formState.price) || null,
            unit_measure: formState.unit_measure,
            unit_price: parseFloat(formState.unit_price) || null,
            min_unit_price: parseFloat(formState.min_unit_price) || null,
            lead_time_days: parseInt(formState.lead_time_days) || null,
            restorage: formState.restorage || null,
          },
        });

        onClose();
      } catch (err) {
        const errorMessage =
          (
            err as {
              response?: { data?: { detail?: string; message?: string } };
            }
          )?.response?.data?.detail ||
          (
            err as {
              response?: { data?: { detail?: string; message?: string } };
            }
          )?.response?.data?.message ||
          (err as Error)?.message ||
          "Error al actualizar producto";
        setError(errorMessage);
      }
    },
    [formState, product, updateMutation, onClose]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Producto" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {product && (
          <div className="text-sm text-slate-500 dark:text-slate-400">
            <strong>ID del Producto:</strong> {product.id_product}
          </div>
        )}

        {/* Información Básica */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
            Información Básica
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Nombre del Producto *"
              placeholder="Ej: SODA EN ESCAMAS"
              value={formState.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />

            <Input
              label="Nombre Genérico *"
              placeholder="Ej: HIDROXIDO DE SODIO"
              value={formState.generic_name}
              onChange={(e) =>
                handleInputChange("generic_name", e.target.value)
              }
              required
            />

            <Input
              label="Unidad de Medida *"
              placeholder="Ej: KG, L, SACO"
              value={formState.unit_measure}
              onChange={(e) =>
                handleInputChange("unit_measure", e.target.value)
              }
              required
            />
          </div>
        </div>

        {/* Precios */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
            Información de Precios
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Precio"
              type="number"
              placeholder="0.00"
              step="0.01"
              value={formState.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
            />

            <Input
              label="Precio Unitario"
              type="number"
              placeholder="0.00"
              step="0.01"
              value={formState.unit_price}
              onChange={(e) => handleInputChange("unit_price", e.target.value)}
            />

            <Input
              label="Precio Mínimo"
              type="number"
              placeholder="0.00"
              step="0.01"
              value={formState.min_unit_price}
              onChange={(e) =>
                handleInputChange("min_unit_price", e.target.value)
              }
            />
          </div>
        </div>

        {/* Otros datos */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
            Especificaciones
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Lead Time (días)"
              type="number"
              placeholder="0"
              value={formState.lead_time_days}
              onChange={(e) =>
                handleInputChange("lead_time_days", e.target.value)
              }
            />

            <Input
              label="Realmacenamiento"
              placeholder="Especificación"
              value={formState.restorage}
              onChange={(e) => handleInputChange("restorage", e.target.value)}
            />
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-3 pt-6 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Cancelar
          </button>
          <div className="flex-1">
            <PrimaryButton
              type="submit"
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? "Guardando…" : "Actualizar Producto"}
            </PrimaryButton>
          </div>
        </div>
      </form>
    </Modal>
  );
};
