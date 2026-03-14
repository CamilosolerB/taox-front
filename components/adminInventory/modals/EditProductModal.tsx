"use client";

import { useState, useCallback, useEffect } from "react";
import { Input, PrimaryButton, Modal } from "@/components/utils";
import { useInventory } from "@/hooks";
import { useProviders } from "@/hooks/useProviders";
import { useStock } from "@/hooks/useStock";
import { AlertCircle } from "lucide-react";
import { Product } from "@/interfaces/product";
import { ProviderSelector } from "./ProviderSelector";

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
  currentStockWarehouse: string;
}

export const EditProductModal = ({
  isOpen,
  onClose,
  product,
  companyId,
}: EditProductModalProps) => {
  const { useUpdateProduct } = useInventory(companyId);
  const updateMutation = useUpdateProduct();

  const { useGetProviders, useGetProvidersByProduct, useCreateProductProvider, useDeleteProductProvider, useSetMainProvider } = useProviders(companyId);
  const { data: providersData, isLoading: loadingProviders } = useGetProviders();
  const { data: productProvidersData, isLoading: loadingProductProviders } = useGetProvidersByProduct(product?.id_product || null);
  const createProductProviderMutation = useCreateProductProvider();
  const deleteProductProviderMutation = useDeleteProductProvider();
  const setMainProviderMutation = useSetMainProvider();

  const { useGetStockWarehouse, useCreateStockWarehouse, useIncrementStockWarehouse, useDecrementStockWarehouse } = useStock(companyId);
  const { data: stockWarehouseData } = useGetStockWarehouse();
  const createStockWarehouseMutation = useCreateStockWarehouse();
  const incrementStockMutation = useIncrementStockWarehouse();
  const decrementStockMutation = useDecrementStockWarehouse();

  const [formState, setFormState] = useState<FormState>({
    name: "",
    generic_name: "",
    price: "",
    unit_measure: "",
    unit_price: "",
    min_unit_price: "",
    lead_time_days: "",
    restorage: "",
    currentStockWarehouse: "",
  });

  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [mainProvider, setMainProvider] = useState<string | null>(null);
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
        currentStockWarehouse: "",
      });
      setError(null);

      // Cargar stock actual del almacén
      const stock = stockWarehouseData?.find(
        (s: any) => s.codigo_producto === product.id_product
      );
      if (stock) {
        setFormState((prev) => ({
          ...prev,
          currentStockWarehouse: stock.cantidad.toString(),
        }));
      }
    }
  }, [isOpen, product, stockWarehouseData]);

  // Cargar proveedores del producto
  useEffect(() => {
    if (productProvidersData && Array.isArray(productProvidersData)) {
      const providers = productProvidersData.map((pp: any) => pp.cad_proveedor);
      const main = productProvidersData.find((pp: any) => pp.es_principal)?.cad_proveedor || null;
      setSelectedProviders(providers);
      setMainProvider(main);
    }
  }, [productProvidersData]);

  const handleInputChange = useCallback(
    (field: keyof FormState, value: string) => {
      setFormState((prev) => ({ ...prev, [field]: value }));
      setError(null);
    },
    []
  );

  const handleProviderChange = useCallback(
    async (newProviders: string[]) => {
      if (!product) return;

      try {
        const currentProviders = selectedProviders;
        
        // Eliminar proveedores que se deseleccionaron
        const toRemove = currentProviders.filter((p) => !newProviders.includes(p));
        for (const providerId of toRemove) {
          await deleteProductProviderMutation.mutateAsync({
            productCode: product.id_product,
            providerId,
          });
        }

        // Añadir nuevos proveedores
        const toAdd = newProviders.filter((p) => !currentProviders.includes(p));
        for (const providerId of toAdd) {
          await createProductProviderMutation.mutateAsync({
            codigo_producto: product.id_product,
            cad_proveedor: providerId,
            es_principal: false,
          });
        }

        setSelectedProviders(newProviders);
      } catch (err) {
        const errorMessage = (err as Error)?.message || "Error al actualizar proveedores";
        setError(errorMessage);
      }
    },
    [product, selectedProviders, deleteProductProviderMutation, createProductProviderMutation]
  );

  const handleMainProviderChange = useCallback(
    async (providerId: string) => {
      if (!product) return;

      try {
        if (mainProvider === providerId) {
          // Deseleccionar como proveedor principal (sin eliminar la relación)
          setMainProvider(null);
        } else {
          // Establecer como principal
          await setMainProviderMutation.mutateAsync({
            productCode: product.id_product,
            providerId,
          });
          setMainProvider(providerId);
        }
      } catch (err) {
        const errorMessage = (err as Error)?.message || "Error al establecer proveedor principal";
        setError(errorMessage);
      }
    },
    [product, mainProvider, setMainProviderMutation]
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
        // 1. Actualizar el producto
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

        // 2. Actualizar stock si la cantidad ha cambiado
        const currentStock = stockWarehouseData?.find(
          (s: any) => s.codigo_producto === product.id_product
        );
        const newStock = parseFloat(formState.currentStockWarehouse) || 0;
        const oldStock = currentStock?.cantidad || 0;

        if (newStock !== oldStock) {
          const difference = newStock - oldStock;

          if (!currentStock && newStock > 0) {
            // Crear stock si no existe
            await createStockWarehouseMutation.mutateAsync({
              codigo_producto: product.id_product,
              cantidad: newStock,
              company_id: companyId,
            });
          } else if (difference > 0) {
            // Incrementar stock
            await incrementStockMutation.mutateAsync({
              productCode: product.id_product,
              quantity: difference,
              companyId,
            });
          } else if (difference < 0) {
            // Decrementar stock
            await decrementStockMutation.mutateAsync({
              productCode: product.id_product,
              quantity: Math.abs(difference),
              companyId,
            });
          }
        }

        onClose();
      } catch (err) {
        let errorMessage = "Error al actualizar producto";
        
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
    [formState, product, updateMutation, companyId, onClose, stockWarehouseData, createStockWarehouseMutation, incrementStockMutation, decrementStockMutation]
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

        {/* Stock Actual */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
            Stock en Almacén
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <Input
              label="Cantidad en Almacén"
              type="number"
              placeholder="0"
              step="0.01"
              value={formState.currentStockWarehouse}
              onChange={(e) =>
                handleInputChange("currentStockWarehouse", e.target.value)
              }
            />
          </div>
        </div>

        {/* Proveedores */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
            Gestionar Proveedores
          </h3>
          <ProviderSelector
            providers={providersData || []}
            selectedProviders={selectedProviders}
            onSelectionChange={handleProviderChange}
            mainProvider={mainProvider}
            onMainProviderChange={handleMainProviderChange}
            isLoading={loadingProviders || loadingProductProviders}
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
              disabled={updateMutation.isPending || incrementStockMutation.isPending || decrementStockMutation.isPending || createStockWarehouseMutation.isPending}
            >
              {updateMutation.isPending || incrementStockMutation.isPending || decrementStockMutation.isPending || createStockWarehouseMutation.isPending ? "Guardando…" : "Actualizar Producto"}
            </PrimaryButton>
          </div>
        </div>
      </form>
    </Modal>
  );
};
