"use client";

import { useState } from "react";
import { Modal, Input, PrimaryButton } from "@/components/utils";
import { Building2, FileText, MapPin, Phone, Mail, User, Lock, UserCog } from "lucide-react";
import { useCompanies } from "@/hooks";
import type { CreateCompanyDTO } from "@/api/types";
import { uploadLogo } from "@/api/endpoints/uploads";

interface CreateCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateCompanyModal({ isOpen, onClose }: CreateCompanyModalProps) {
  const { useCreateCompany } = useCompanies();
  const createMutation = useCreateCompany();

  const [form, setForm] = useState<CreateCompanyDTO>({
    name: "",
    nit: "",
    address: "",
    phone: "",
    email: "",
    is_active: true,
    admin_username: "",
    admin_email: "",
    admin_password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      let finalLogoUrl = form.logo;
      if (logoFile) {
        setIsUploading(true);
        const uploadRes = await uploadLogo(logoFile);
        finalLogoUrl = uploadRes.url;
        setIsUploading(false);
      }

      await createMutation.mutateAsync({ ...form, logo: finalLogoUrl });
      setForm({
        name: "",
        nit: "",
        address: "",
        phone: "",
        email: "",
        logo: "",
        is_active: true,
        admin_username: "",
        admin_email: "",
        admin_password: "",
      });
      setLogoFile(null);
      onClose();
    } catch (err: unknown) {
      const msg =
        (err as any)?.response?.data?.error ||
        (err as any)?.response?.data?.detail ||
        (err as Error)?.message ||
        "Error al crear la empresa";
      setError(msg);
      setIsUploading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Crear Nueva Empresa">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-sm text-red-500 font-medium bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-3 py-2 rounded-lg">{error}</p>}

        {/* Logo */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center overflow-hidden">
            {logoFile ? (
              <img src={URL.createObjectURL(logoFile)} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <Building2 className="w-6 h-6 text-slate-400" />
            )}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Logo de la Empresa (Opcional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-slate-500 dark:text-slate-400
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-primary/10 file:text-primary
                hover:file:bg-primary/20
                transition-colors cursor-pointer"
            />
          </div>
        </div>

        {/* Datos de la empresa */}
        <Input
          label="Nombre de la Empresa"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Ej. Taox Water Treatment"
          icon={Building2}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="NIT / Identificación"
            value={form.nit}
            onChange={(e) => setForm({ ...form, nit: e.target.value })}
            placeholder="Ej. 901234567-8"
            icon={FileText}
            required
          />
          <Input
            label="Teléfono"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Ej. +34 600 000 000"
            icon={Phone}
            required
          />
        </div>

        <Input
          label="Dirección"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          placeholder="Ej. Calle Principal 123"
          icon={MapPin}
          required
        />

        <Input
          label="Correo Electrónico de la Empresa"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="contacto@empresa.com"
          icon={Mail}
          required
        />

        <div className="flex items-center space-x-2 pt-1">
          <input
            type="checkbox"
            id="is_active"
            checked={form.is_active}
            onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
            className="w-4 h-4 text-primary bg-slate-100 border-slate-300 rounded focus:ring-primary"
          />
          <label htmlFor="is_active" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Empresa Activa
          </label>
        </div>

        {/* Separador - Sección admin */}
        <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
          <div className="flex items-center space-x-2 mb-3">
            <UserCog className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Administrador de la Empresa
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            Se creará un usuario <strong>Company Admin</strong> con estas credenciales para acceder al sistema.
          </p>

          <Input
            label="Nombre de usuario del Admin"
            value={form.admin_username}
            onChange={(e) => setForm({ ...form, admin_username: e.target.value })}
            placeholder="Ej. admin_empresa"
            icon={User}
            required
          />

          <div className="mt-3">
            <Input
              label="Correo electrónico del Admin"
              type="email"
              value={form.admin_email}
              onChange={(e) => setForm({ ...form, admin_email: e.target.value })}
              placeholder="admin@empresa.com"
              icon={Mail}
              required
            />
          </div>

          <div className="mt-3">
            <Input
              label="Contraseña del Admin"
              type="password"
              value={form.admin_password}
              onChange={(e) => setForm({ ...form, admin_password: e.target.value })}
              placeholder="Mínimo 8 caracteres"
              icon={Lock}
              required
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700 transition-colors"
          >
            Cancelar
          </button>
          <PrimaryButton type="submit" disabled={createMutation.isPending || isUploading}>
            {createMutation.isPending || isUploading ? "Creando..." : "Crear Empresa"}
          </PrimaryButton>
        </div>
      </form>
    </Modal>
  );
}
