"use client";

import { useState, useCallback } from "react";
import { Input, PrimaryButton } from "@/components/utils";
import { Modal } from "@/components/utils/Modal";
import { useInventory } from "@/hooks";
import { useProviders } from "@/hooks/useProviders";
import { useStock } from "@/hooks/useStock";
import { AlertCircle } from "lucide-react";
import { ProviderSelector } from "./ProviderSelector";

interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyId: string;
}

interface FormState {
  id_product: string;
  name: string;
  generic_name: string;
  price: string;
  unit_measure: string;
  unit_price: string;
  min_unit_price: string;
  lead_time_days: string;
  restorage: string;
  limite_critico: string;
  initialStockWarehouse: string;
}

const generateProductId = () => {
  // Generar ID con formato A00000XXX
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(8, "0");
  return `A${random}`;
};

export const CreateProductModal = ({
  isOpen,
  onClose,
  companyId,
}: CreateProductModalProps) => {
  const { useCreateProduct } = useInventory(companyId);
  const createMutation = useCreateProduct();
  
  const { useGetProviders } = useProviders(companyId);
  const { data: providersData, isLoading: loadingProviders } = useGetProviders();
  const { useCreateProductProvider } = useProviders(companyId);
  const createProductProviderMutation = useCreateProductProvider();

  const { useCreateStockWarehouse } = useStock(companyId);
  const createStockWarehouseMutation = useCreateStockWarehouse();

  const [formState, setFormState] = useState<FormState>({
    id_product: generateProductId(),
    name: "",
    generic_name: "",
    price: "",
    unit_measure: "",
    unit_price: "",
    min_unit_price: "",
    lead_time_days: "",
    restorage: "",
    limite_critico: "",
    initialStockWarehouse: "",
  });

  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [mainProvider, setMainProvider] = useState<string | null>(null);
  const [providerPrices, setProviderPrices] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const handleProviderPriceChange = useCallback((providerId: string, price: string) => {
    setProviderPrices(prev => ({ ...prev, [providerId]: price }));
  }, []);

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
        // 1. Crear el producto
        await createMutation.mutateAsync({
          id_product: formState.id_product,
          name: formState.name,
          generic_name: formState.generic_name,
          price: parseFloat(formState.price) || 0,
          unit_measure: formState.unit_measure,
          unit_price: parseFloat(formState.unit_price) || 0,
          min_unit_price: parseFloat(formState.min_unit_price) || 0,
          lead_time_days: parseInt(formState.lead_time_days) || 0,
          restorage: formState.restorage || "",
          limite_critico: parseFloat(formState.limite_critico) || 0,
          company_id: companyId,
        });
        const initialStock = parseFloat(formState.initialStockWarehouse) || 0;
        if (initialStock > 0) {
          await createStockWarehouseMutation.mutateAsync({
            codigo_producto: formState.id_product,
            cantidad: initialStock,
            company_id: companyId,
          });
        }

        // 3. Crear relaciones con proveedores si hay seleccionados
        if (selectedProviders.length > 0) {
          for (const providerId of selectedProviders) {
            await createProductProviderMutation.mutateAsync({
              codigo_producto: formState.id_product,
              cad_proveedor: providerId,
              es_principal: mainProvider === providerId,
              precio: parseFloat(providerPrices[providerId]) || undefined,
            });
          }
        }

        // Reset form y cerrar
        setFormState({
          id_product: generateProductId(),
          name: "",
          generic_name: "",
          price: "",
          unit_measure: "",
          unit_price: "",
          min_unit_price: "",
          lead_time_days: "",
          restorage: "",
          limite_critico: "",
          initialStockWarehouse: "",
        });
        setSelectedProviders([]);
        setMainProvider(null);
        setProviderPrices({});
        onClose();
      } catch (err) {
        let errorMessage = "Error al crear producto";
        
        if (err instanceof Error) {
          errorMessage = err.message;
        } else if (
          err &&
          typeof err === "object" &&
          "response" in err
        ) {
          const response = (err as { response?: { data?: unknown } }).response;
          if (response?.data) {
            const data = response.data;
            if (typeof data === "string") {
              errorMessage = data;
            } else if (typeof data === "object" && data !== null) {
              const objData = data as Record<string, unknown>;
              if (objData.detail && typeof objData.detail === "string") {
                errorMessage = objData.detail;
              } else if (objData.message && typeof objData.message === "string") {
                errorMessage = objData.message;
              } else if (Array.isArray(objData)) {
                errorMessage = objData.map((e: unknown) => {
                  if (typeof e === "object" && e !== null && "msg" in e) {
                    return (e as Record<string, unknown>).msg;
                  }
                  return JSON.stringify(e);
                }).join(", ");
              }
            }
          }
        }
        
        setError(errorMessage);
      }
    },
    [formState, createMutation, createProductProviderMutation, createStockWarehouseMutation, companyId, onClose, selectedProviders, mainProvider]
  );

  const handleGenerateNewId = useCallback(() => {
    setFormState((prev) => ({
      ...prev,
      id_product: generateProductId(),
    }));
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Registrar Nuevo Producto" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* Información Básica */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
            Información Básica
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
                ID Producto *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formState.id_product}
                  disabled
                  className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white font-mono"
                />
                <button
                  type="button"
                  onClick={handleGenerateNewId}
                  className="px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Generar
                </button>
              </div>
            </div>

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

            <Input
              label="Límite Crítico *"
              type="number"
              placeholder="0"
              step="0.01"
              value={formState.limite_critico}
              onChange={(e) => handleInputChange("limite_critico", e.target.value)}
              required
            />
          </div>
        </div>

        {/* Stock Inicial */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
            Stock Inicial (Opcional)
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <Input
              label="Cantidad en Almacén"
              type="number"
              placeholder="0"
              step="0.01"
              value={formState.initialStockWarehouse}
              onChange={(e) =>
                handleInputChange("initialStockWarehouse", e.target.value)
              }
            />
          </div>
        </div>

        {/* Proveedores */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
            Relacionar Proveedores (Opcional)
          </h3>
          <ProviderSelector
            providers={providersData || []}
            selectedProviders={selectedProviders}
            onSelectionChange={setSelectedProviders}
            mainProvider={mainProvider}
            onMainProviderChange={setMainProvider}
            providerPrices={providerPrices}
            onProviderPriceChange={handleProviderPriceChange}
            isLoading={loadingProviders}
          />
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
              disabled={createMutation.isPending || createProductProviderMutation.isPending || createStockWarehouseMutation.isPending}
            >
              {createMutation.isPending || createProductProviderMutation.isPending || createStockWarehouseMutation.isPending ? "Guardando…" : "Guardar Producto"}
            </PrimaryButton>
          </div>
        </div>
      </form>
    </Modal>
  );
};
