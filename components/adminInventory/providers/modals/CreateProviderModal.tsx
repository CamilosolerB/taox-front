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
      <form className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
        {/* Header decoration matches the new interactive style */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-600 opacity-50" />

        {/* Success Message */}
        {success && (
          <div className="flex items-center gap-3 p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
            <CheckCircle2 size={20} className="text-emerald-400 flex-shrink-0" />
            <p className="text-emerald-300 antialiased font-medium">¡Proveedor creado exitosamente!</p>
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
          {/* Código Proveedor */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Código *
            </label>
            <input
              type="text"
              name="cad_proveedor"
              value={formData.cad_proveedor}
              onChange={handleInputChange}
              placeholder="Ej: PROV-001"
              className="block w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
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
              placeholder="Nombre de la empresa"
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

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 mt-2 border-t border-slate-800">
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
            {loading ? "Procesando..." : success ? "✓ Creado" : "Guardar Proveedor"}
          </PrimaryButton>
        </div>
      </form>
    </Modal>
  );
}
