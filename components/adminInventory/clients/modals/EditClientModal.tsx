"use client";

import { useState, useEffect } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Modal } from "@/components/utils/Modal";
import { PrimaryButton } from "@/components/utils/PrimaryButton";
import { useClients } from "@/hooks";
import type { ClientDTO } from "@/api/types";

interface EditClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: ClientDTO | null;
  companyId: string;
}

export function EditClientModal({
  isOpen,
  onClose,
  client,
  companyId,
}: EditClientModalProps) {
  const [formData, setFormData] = useState({
    cliente: "",
    telefono1: "",
    telefono2: "",
    contacto: "",
    correo: "",
    ciudad: "",
    tipo_agua: "",
    cantidad_promedio_kg: "",
    is_active: true,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { useUpdateClient } = useClients(companyId);
  const updateMutation = useUpdateClient();

  useEffect(() => {
    if (client && isOpen) {
      setFormData({
        cliente: client.cliente,
        telefono1: client.telefono1,
        telefono2: client.telefono2 || "",
        contacto: client.contacto,
        correo: client.correo,
        ciudad: client.ciudad,
        tipo_agua: client.tipo_agua,
        cantidad_promedio_kg: client.cantidad_promedio_kg.toString(),
        is_active: client.is_active,
      });
      setError("");
      setSuccess(false);
    }
  }, [client, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
    setError("");
  };

  const handleSubmit = async () => {
    if (!client) return;

    setError("");
    setSuccess(false);

    // Validations
    if (!formData.cliente.trim()) {
      setError("El nombre del cliente es requerido");
      return;
    }
    if (!formData.telefono1.trim()) {
      setError("El teléfono es requerido");
      return;
    }
    if (!formData.contacto.trim()) {
      setError("El contacto es requerido");
      return;
    }
    if (!formData.correo.trim()) {
      setError("El correo es requerido");
      return;
    }
    if (!formData.ciudad.trim()) {
      setError("La ciudad es requerida");
      return;
    }
    if (!formData.tipo_agua.trim()) {
      setError("El tipo de agua es requerido");
      return;
    }
    if (!formData.cantidad_promedio_kg) {
      setError("La cantidad promedio es requerida");
      return;
    }

    setLoading(true);
    try {
      await updateMutation.mutateAsync({
        clientId: client.codigo_cliente,
        body: {
          cliente: formData.cliente,
          telefono1: formData.telefono1,
          telefono2: formData.telefono2 || undefined,
          contacto: formData.contacto,
          correo: formData.correo,
          ciudad: formData.ciudad,
          tipo_agua: formData.tipo_agua,
          cantidad_promedio_kg: Number(formData.cantidad_promedio_kg),
          is_active: formData.is_active,
        },
      });

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al actualizar el cliente");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !client) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Cliente">
      <form className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {/* Success Message */}
        {success && (
          <div className="flex items-center gap-3 p-4 bg-green-900/30 border border-green-600 rounded-lg">
            <CheckCircle2 size={20} className="text-green-400 flex-shrink-0" />
            <p className="text-green-300">¡Cliente actualizado exitosamente!</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-900/30 border border-red-600 rounded-lg">
            <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {/* Código Cliente (Read-only) */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Código Cliente
          </label>
          <input
            type="text"
            value={client.codigo_cliente}
            disabled
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 disabled:opacity-50 cursor-not-allowed"
          />
        </div>

        {/* Nombre Cliente */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Nombre Cliente *
          </label>
          <input
            type="text"
            name="cliente"
            value={formData.cliente}
            onChange={handleInputChange}
            placeholder="Nombre del cliente"
            maxLength={100}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Teléfono 1 */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Teléfono *
          </label>
          <input
            type="tel"
            name="telefono1"
            value={formData.telefono1}
            onChange={handleInputChange}
            placeholder="Ej: +57 1 2345678"
            maxLength={20}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Teléfono 2 */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Teléfono Secundario
          </label>
          <input
            type="tel"
            name="telefono2"
            value={formData.telefono2}
            onChange={handleInputChange}
            placeholder="Ej: +57 1 9876543"
            maxLength={20}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Contacto */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Contacto *
          </label>
          <input
            type="text"
            name="contacto"
            value={formData.contacto}
            onChange={handleInputChange}
            placeholder="Persona de contacto"
            maxLength={100}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Correo */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Correo *
          </label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleInputChange}
            placeholder="contacto@cliente.com"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Ciudad */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Ciudad *
          </label>
          <input
            type="text"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleInputChange}
            placeholder="Ej: Bogotá"
            maxLength={100}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Tipo de Agua */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Tipo de Agua *
          </label>
          <input
            type="text"
            name="tipo_agua"
            value={formData.tipo_agua}
            onChange={handleInputChange}
            placeholder="Ej: Agua Destilada"
            maxLength={50}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Cantidad Promedio */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Cantidad Promedio (kg) *
          </label>
          <input
            type="number"
            name="cantidad_promedio_kg"
            value={formData.cantidad_promedio_kg}
            onChange={handleInputChange}
            placeholder="Ej: 500"
            step="0.01"
            min="0"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Estado */}
        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleInputChange}
              className="w-4 h-4 rounded border-slate-600"
            />
            <span className="text-sm font-medium text-slate-200">Activo</span>
          </label>
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
            {loading ? "Guardando..." : success ? "✓ Guardado" : "Guardar Cambios"}
          </PrimaryButton>
        </div>
      </form>
    </Modal>
  );
}
