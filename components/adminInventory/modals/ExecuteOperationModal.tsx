"use client";

import { useState, useEffect } from "react";
import { X, AlertCircle, CheckCircle2 } from "lucide-react";
import { Modal } from "@/components/utils/Modal";
import { Input } from "@/components/utils/Input";
import { PrimaryButton } from "@/components/utils/PrimaryButton";
import { useMovements, useChemicalStocks, useProviders, useProcesses, useInventory } from "@/hooks";
import type { ProductDTO } from "@/api/types";

interface ExecuteOperationModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyId: string;
  products: ProductDTO[];
}

export function ExecuteOperationModal({
  isOpen,
  onClose,
  companyId,
  products,
}: ExecuteOperationModalProps) {
  const [formData, setFormData] = useState({
    productCode: "",
    providerId: "",
    quantity: "",
    processOriginId: "",
    processDestinationId: "",
    operationType: "salida" as "entrada" | "salida",
    notes: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const movements = useMovements(companyId);
  const stocks = useChemicalStocks(companyId);
  const providers = useProviders(companyId);
  const processes = useProcesses(companyId);
  const products_hook = useInventory(companyId);

  // Get data
  const { data: processesList = [] } = processes.useGetAllProcesses();
  const { data: stocksList = [] } = stocks.useGetAllStocks();
  const { data: providersList = [] } = providers.useGetProviders();
  const { data: productProviders = [] } = providers.useGetProvidersByProduct(
    formData.productCode
  );

  // Mutations
  const createMovement = movements.useCreateMovement();

  // Get selected product
  const selectedProduct = products.find((p) => p.id_product === formData.productCode);

  // Get current stock for selected product
  const currentStock =
    stocksList.find((s) => s.codigo_producto === formData.productCode)
      ?.cantidad_actual || 0;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
    setSuccess(false);
  };

  const handleProductChange = (productCode: string) => {
    setFormData((prev) => ({
      ...prev,
      productCode,
      providerId: "",
      quantity: "",
    }));
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess(false);

    // Validations
    if (!formData.productCode) {
      setError("Debe seleccionar un producto");
      return;
    }
    if (!formData.providerId) {
      setError("Debe seleccionar un proveedor");
      return;
    }
    if (!formData.quantity || Number(formData.quantity) <= 0) {
      setError("Debe ingresar una cantidad válida");
      return;
    }
    if (!formData.processOriginId || !formData.processDestinationId) {
      setError("Debe seleccionar procesos de origen y destino");
      return;
    }

    const quantity = Number(formData.quantity);

    // Validate stock for "salida" operations
    if (formData.operationType === "salida" && quantity > currentStock) {
      setError(
        `Stock insuficiente. Disponible: ${currentStock.toFixed(2)}, Solicitado: ${quantity}`
      );
      return;
    }

    setLoading(true);
    try {
      await createMovement.mutateAsync({
        codigo_producto: formData.productCode,
        id_proceso_origen: formData.processOriginId,
        id_proceso_destino: formData.processDestinationId,
        cantidad: quantity,
        notas: formData.notes || undefined,
        id_empresa: companyId,
      });

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setFormData({
          productCode: "",
          providerId: "",
          quantity: "",
          processOriginId: "",
          processDestinationId: "",
          operationType: "salida",
          notes: "",
        });
      }, 1500);
    } catch (err) {
      let errorMessage = "Error al crear la operación";
      
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
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ejecutar Operación de Inventario">
      <form className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {/* Success Message */}
        {success && (
          <div className="flex items-center gap-3 p-4 bg-green-900/30 border border-green-600 rounded-lg">
            <CheckCircle2 size={20} className="text-green-400 flex-shrink-0" />
            <p className="text-green-300">¡Operación creada exitosamente!</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-900/30 border border-red-600 rounded-lg">
            <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {/* Product Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Producto *
          </label>
          <select
            name="productCode"
            value={formData.productCode}
            onChange={(e) => handleProductChange(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
          >
            <option value="">Seleccionar producto...</option>
            {products.map((product) => (
              <option key={product.id_product} value={product.id_product}>
                {product.name} ({product.id_product})
              </option>
            ))}
          </select>
        </div>

        {/* Current Stock Info */}
        {formData.productCode && (
          <div className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
            <p className="text-sm text-slate-300">
              <span className="font-medium">Stock Actual:</span>{" "}
              <span className={currentStock > 10 ? "text-green-400" : "text-yellow-400"}>
                {currentStock.toFixed(2)} {selectedProduct?.unit_measure || "u"}
              </span>
            </p>
          </div>
        )}

        {/* Provider Selection */}
        {formData.productCode && (
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Proveedor *
            </label>
            <select
              name="providerId"
              value={formData.providerId}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
            >
              <option value="">Seleccionar proveedor...</option>
              {productProviders.map((pp) => (
                <option key={pp.cad_proveedor} value={pp.cad_proveedor}>
                  {providersList.find((p) => p.cad_proveedor === pp.cad_proveedor)
                    ?.nombre || pp.cad_proveedor}
                  {pp.es_principal ? " (Principal)" : ""}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Operation Type */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Tipo de Operación *
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="operationType"
                value="entrada"
                checked={formData.operationType === "entrada"}
                onChange={handleInputChange}
                className="w-4 h-4"
              />
              <span className="text-slate-300">Entrada</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="operationType"
                value="salida"
                checked={formData.operationType === "salida"}
                onChange={handleInputChange}
                className="w-4 h-4"
              />
              <span className="text-slate-300">Salida</span>
            </label>
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Cantidad *
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            placeholder="Ej: 100"
            step="0.01"
            min="0"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Process Origin */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Proceso de Origen *
          </label>
          <select
            name="processOriginId"
            value={formData.processOriginId}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
          >
            <option value="">Seleccionar proceso...</option>
            {processesList.map((process) => (
              <option key={process.id_proceso} value={process.id_proceso}>
                {process.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Process Destination */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Proceso de Destino *
          </label>
          <select
            name="processDestinationId"
            value={formData.processDestinationId}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
          >
            <option value="">Seleccionar proceso...</option>
            {processesList
              .filter((p) => p.id_proceso !== formData.processOriginId)
              .map((process) => (
                <option key={process.id_proceso} value={process.id_proceso}>
                  {process.nombre}
                </option>
              ))}
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Notas (Opcional)
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Agregar notas sobre la operación..."
            rows={2}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-slate-700">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors font-medium"
            disabled={loading}
          >
            Cancelar
          </button>
          <PrimaryButton
            onClick={handleSubmit}
            disabled={loading || success}
            className="flex-1"
          >
            {loading ? "Creando..." : success ? "✓ Crear operación" : "Crear Operación"}
          </PrimaryButton>
        </div>
      </form>
    </Modal>
  );
}
