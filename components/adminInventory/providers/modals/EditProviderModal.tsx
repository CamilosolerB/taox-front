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
      <form className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
        {/* Header decoration matches the new interactive style */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-600 opacity-50" />

        {/* Success Message */}
        {success && (
          <div className="flex items-center gap-3 p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
            <CheckCircle2 size={20} className="text-emerald-400 flex-shrink-0" />
            <p className="text-emerald-300 antialiased font-medium">¡Proveedor actualizado exitosamente!</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-950/30 border border-red-500/30 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
            <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
            <p className="text-red-300 antialiased font-medium">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Provider Code (Read-only) */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 italic">
              Código (Identificador Único)
            </label>
            <input
              type="text"
              value={provider.cad_proveedor}
              disabled
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-500 cursor-not-allowed font-mono text-sm opacity-70"
            />
          </div>

          {/* Nombre */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Nombre Comercial *
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Nombre del proveedor"
              className="block w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
            />
          </div>
        </div>

        {/* Contacto */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Persona de Contacto *
          </label>
          <input
            type="text"
            name="contacto"
            value={formData.contacto}
            onChange={handleInputChange}
            placeholder="Nombre completo"
            className="block w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
          />
        </div>

        {/* Dirección */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Dirección Física *
          </label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleInputChange}
            placeholder="Calle, Ciudad, País"
            className="block w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Teléfono */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Teléfono Fijo
            </label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              placeholder="+00 0 0000000"
              className="block w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
            />
          </div>

          {/* Celular */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Celular / WhatsApp *
            </label>
            <input
              type="tel"
              name="celular"
              value={formData.celular}
              onChange={handleInputChange}
              placeholder="+00 000 0000000"
              className="block w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Correo */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Correo Electrónico *
            </label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleInputChange}
              placeholder="ejemplo@correo.com"
              className="block w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
            />
          </div>

          {/* Web */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Sitio Web (Opcional)
            </label>
            <input
              type="url"
              name="web"
              value={formData.web}
              onChange={handleInputChange}
              placeholder="https://www.empresa.com"
              className="block w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
            />
          </div>
        </div>

        {/* Estado */}
        <div className="pt-2 px-1">
          <label className="group flex items-center gap-3 cursor-pointer">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleInputChange}
                className="peer sr-only"
              />
              <div className="w-10 h-5 bg-slate-800 rounded-full peer peer-checked:bg-emerald-500/50 transition-all shadow-inner" />
              <div className="absolute left-1 top-1 w-3 h-3 bg-slate-400 peer-checked:bg-emerald-400 peer-checked:translate-x-5 rounded-full transition-all shadow-md" />
            </div>
            <span className="text-sm font-bold tracking-widest uppercase text-slate-400 group-hover:text-slate-200 transition-colors">
              {formData.is_active ? "Proveedor Activo" : "Proveedor Inactivo"}
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 mt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-all font-bold text-sm tracking-widest uppercase border border-slate-800"
            disabled={loading}
          >
            Cancelar
          </button>
          <PrimaryButton
            onClick={handleSubmit}
            disabled={loading || success}
            className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all font-bold text-sm tracking-widest uppercase shadow-lg shadow-emerald-900/20"
          >
            {loading ? "Actualizando..." : success ? "✓ Guardado" : "Guardar Cambios"}
          </PrimaryButton>
        </div>
      </form>
    </Modal>
  );
}
