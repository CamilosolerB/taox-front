"use client";

import { useState } from "react";
import { X, AlertCircle, CheckCircle2 } from "lucide-react";
import { Modal } from "@/components/utils/Modal";
import { PrimaryButton } from "@/components/utils/PrimaryButton";
import { useProviders } from "@/hooks";
import type { ProviderDTO } from "@/interfaces/types";

interface CreateProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyId: string;
}

export function CreateProviderModal({
  isOpen,
  onClose,
  companyId,
}: CreateProviderModalProps) {
  const [formData, setFormData] = useState({
    cad_proveedor: "",
    nombre: "",
    contacto: "",
    direccion: "",
    telefono: "",
    celular: "",
    web: "",
    correo: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { useCreateProvider } = useProviders(companyId);
  const createMutation = useCreateProvider();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess(false);

    // Validations
    if (!formData.cad_proveedor.trim()) {
      setError("El código de proveedor es requerido");
      return;
    }
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
      await createMutation.mutateAsync({
        cad_proveedor: formData.cad_proveedor,
        nombre: formData.nombre,
        contacto: formData.contacto,
        direccion: formData.direccion,
        telefono: formData.telefono,
        celular: formData.celular,
        web: formData.web || undefined,
        correo: formData.correo,
        company_id: companyId,
      });

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setFormData({
          cad_proveedor: "",
          nombre: "",
          contacto: "",
          direccion: "",
          telefono: "",
          celular: "",
          web: "",
          correo: "",
        });
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear el proveedor");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Crear Proveedor">
      <form className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {/* Success Message */}
        {success && (
          <div className="flex items-center gap-3 p-4 bg-green-900/30 border border-green-600 rounded-lg">
            <CheckCircle2 size={20} className="text-green-400 flex-shrink-0" />
            <p className="text-green-300">¡Proveedor creado exitosamente!</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-900/30 border border-red-600 rounded-lg">
            <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {/* Código Proveedor */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Código Proveedor *
          </label>
          <input
            type="text"
            name="cad_proveedor"
            value={formData.cad_proveedor}
            onChange={handleInputChange}
            placeholder="Ej: PROV001"
            maxLength={50}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary"
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
            Sitio Web (Opcional)
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
            {loading ? "Creando..." : success ? "✓ Crear" : "Crear Proveedor"}
          </PrimaryButton>
        </div>
      </form>
    </Modal>
  );
}
