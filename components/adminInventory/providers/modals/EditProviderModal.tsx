"use client";

import { useState, useEffect } from "react";
import { X, AlertCircle, CheckCircle2 } from "lucide-react";
import { Modal } from "@/components/utils/Modal";
import { PrimaryButton } from "@/components/utils/PrimaryButton";
import { useProviders } from "@/hooks";
import type { ProviderDTO, ProviderUpdateDTO } from "@/interfaces/types";

interface EditProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: ProviderDTO | null;
  companyId: string;
}

export function EditProviderModal({
  isOpen,
  onClose,
  provider,
  companyId,
}: EditProviderModalProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    contacto: "",
    direccion: "",
    telefono: "",
    celular: "",
    web: "",
    correo: "",
    is_active: true,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { useUpdateProvider } = useProviders(companyId);
  const updateMutation = useUpdateProvider();

  useEffect(() => {
    if (provider && isOpen) {
      setFormData({
        nombre: provider.nombre,
        contacto: provider.contacto,
        direccion: provider.direccion,
        telefono: provider.telefono,
        celular: provider.celular,
        web: provider.web || "",
        correo: provider.correo,
        is_active: provider.is_active,
      });
      setError("");
      setSuccess(false);
    }
  }, [provider, isOpen]);

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
    if (!provider) return;

    setError("");
    setSuccess(false);

    // Validations
    if (!formData.nombre.trim()) {
      setError("El nombre del proveedor es requerido");
      return;
    }
    if (!formData.contacto.trim()) {
      setError("El contacto es requerido");
      return;
    }
    if (!formData.direccion.trim()) {
      setError("La dirección es requerida");
      return;
    }
    if (!formData.telefono.trim()) {
      setError("El teléfono es requerido");
      return;
    }
    if (!formData.celular.trim()) {
      setError("El celular es requerido");
      return;
    }
    if (!formData.correo.trim()) {
      setError("El correo es requerido");
      return;
    }

    setLoading(true);
    try {
      await updateMutation.mutateAsync({
        providerId: provider.cad_proveedor,
        companyId: companyId,
        body: {
          nombre: formData.nombre,
          contacto: formData.contacto,
          direccion: formData.direccion,
          telefono: formData.telefono,
          celular: formData.celular,
          web: formData.web || undefined,
          correo: formData.correo,
          is_active: formData.is_active,
        },
      });

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al actualizar el proveedor");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !provider) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Proveedor">
      <form className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {/* Success Message */}
        {success && (
          <div className="flex items-center gap-3 p-4 bg-green-900/30 border border-green-600 rounded-lg">
            <CheckCircle2 size={20} className="text-green-400 flex-shrink-0" />
            <p className="text-green-300">¡Proveedor actualizado exitosamente!</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-900/30 border border-red-600 rounded-lg">
            <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {/* Provider Code (Read-only) */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Código Proveedor
          </label>
          <input
            type="text"
            value={provider.cad_proveedor}
            disabled
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 disabled:opacity-50 cursor-not-allowed"
          />
        </div>

        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Nombre *
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            placeholder="Nombre del proveedor"
            maxLength={100}
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

        {/* Dirección */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Dirección *
          </label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleInputChange}
            placeholder="Dirección completa"
            maxLength={255}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Teléfono *
          </label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
            placeholder="Ej: +57 1 2345678"
            maxLength={20}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Celular */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Celular *
          </label>
          <input
            type="tel"
            name="celular"
            value={formData.celular}
            onChange={handleInputChange}
            placeholder="Ej: +57 300 1234567"
            maxLength={20}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Web */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Sitio Web
          </label>
          <input
            type="url"
            name="web"
            value={formData.web}
            onChange={handleInputChange}
            placeholder="https://www.ejemplo.com"
            maxLength={255}
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
            placeholder="contacto@proveedor.com"
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
