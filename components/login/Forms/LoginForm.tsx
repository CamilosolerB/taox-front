"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Input, PrimaryButton } from "@/components/utils";
import { Key, User, AlertCircle } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

interface LoginFormState {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [formState, setFormState] = useState<LoginFormState>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setIsLoading(true);

      try {
        await login(formState.email.trim(), formState.password);
        // El login fue exitoso, redirigir al dashboard
        router.push("/company/dashboard");
      } catch (err) {
        // Extraer mensaje de error del backend o genérico
        const errorMessage =
          (err as { response?: { data?: { detail?: string; message?: string } } })
            ?.response?.data?.detail ||
          (err as { response?: { data?: { detail?: string; message?: string } } })
            ?.response?.data?.message ||
          (err as Error)?.message ||
          "Error al iniciar sesión. Verifica tus credenciales.";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [formState, login, router]
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error && (
        <div
          className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3"
          role="alert"
        >
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}
      <Input
        label="Correo electrónico"
        type="email"
        placeholder="Ingrese su correo electrónico"
        value={formState.email}
        onChange={(e) =>
          setFormState((prev) => ({ ...prev, email: e.target.value }))
        }
        disabled={isLoading}
        icon={User}
      />
      <Input
        label="Contraseña"
        placeholder="Ingrese su contraseña"
        type="password"
        value={formState.password}
        onChange={(e) =>
          setFormState((prev) => ({ ...prev, password: e.target.value }))
        }
        disabled={isLoading}
        icon={Key}
      />
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <a
            className="text-primary text-xs font-bold hover:underline"
            href="#"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
      <PrimaryButton type="submit" disabled={isLoading}>
        {isLoading ? "Ingresando…" : "Ingresar"}
      </PrimaryButton>
    </form>
  );
};
