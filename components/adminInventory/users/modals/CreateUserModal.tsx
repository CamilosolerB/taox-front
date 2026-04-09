"use client";

import { useState } from "react";
import { X, AlertCircle, CheckCircle2 } from "lucide-react";
import { Modal } from "@/components/utils/Modal";
import { PrimaryButton } from "@/components/utils/PrimaryButton";
import { useUsers } from "@/hooks";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyId: string;
}

const AVAILABLE_ROLES = [
  { id: "f0bb4b28-38f7-4072-a6e9-c23dec4fb133", name: "Sudo" },
  { id: "e687ff93-cfec-4718-a03d-7bcbdacfef9d", name: "company_Admin" },
  { id: "3232b29d-5feb-4dae-b9e5-0c6b0d95d544", name: "observer" },
];

export function CreateUserModal({
  isOpen,
  onClose,
  companyId,
}: CreateUserModalProps) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role_id: AVAILABLE_ROLES[1].id, // default to company_Admin
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { useCreateUser } = useUsers();
  const createMutation = useCreateUser();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
    if (!formData.username.trim()) {
      setError("El nombre de usuario es requerido");
      return;
    }
    if (!formData.email.trim()) {
      setError("El correo es requerido");
      return;
    }
    if (!formData.password.trim() || formData.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    setLoading(true);
    try {
      await createMutation.mutateAsync({
        id_user: null,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role_id: formData.role_id,
        company_id: companyId,
        is_active: true,
      });

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setFormData({
          username: "",
          email: "",
          password: "",
          role_id: AVAILABLE_ROLES[1].id,
        });
      }, 1500);
    } catch (err: any) {
      setError(
        err?.response?.data?.detail || err.message || "Error al crear usuario"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Registrar nuevo Usuario">
      <form className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {/* Success Message */}
        {success && (
          <div className="flex items-center gap-3 p-4 bg-green-900/30 border border-green-600 rounded-lg">
            <CheckCircle2 size={20} className="text-green-400 flex-shrink-0" />
            <p className="text-green-300">¡Usuario registrado exitosamente!</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-900/30 border border-red-600 rounded-lg">
            <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Nombre de Usuario *
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Ej: jdoe"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Correo Electrónico *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="correo@ejemplo.com"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Contraseña *
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Mínimo 8 caracteres"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Role Select */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Rol del Usuario *
          </label>
          <div className="relative">
            <select
              name="role_id"
              value={formData.role_id}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white appearance-none focus:outline-none focus:border-primary"
            >
              {AVAILABLE_ROLES.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
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
            {loading ? "Registrando..." : success ? "✓ Registrado" : "Registrar"}
          </PrimaryButton>
        </div>
      </form>
    </Modal>
  );
}
