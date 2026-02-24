"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, PrimaryButton } from "@/components/utils";
import { Key, User } from "lucide-react";
import { useAuthHook } from "@/hooks";

interface LoginAdminFormState {
  email: string;
  password: string;
}

export const LoginAdminForm = () => {
  const router = useRouter();
  const { loginMutation } = useAuthHook();
  const [formState, setFormState] = useState<LoginAdminFormState>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await loginMutation.mutateAsync({
        email: formState.email.trim(),
        password: formState.password,
      });
      router.push("/company/dashboard");
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: string }; status?: number } })
          ?.response?.data?.error ||
        (err as Error)?.message ||
        "Error al iniciar sesión";
      setError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error && (
        <p className="text-sm text-red-500 dark:text-red-400 mb-3" role="alert">
          {error}
        </p>
      )}
      <Input
        label="Correo electrónico"
        type="email"
        placeholder="Ingrese su correo electrónico"
        value={formState.email}
        onChange={(e) =>
          setFormState((prev) => ({ ...prev, email: e.target.value }))
        }
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
      <PrimaryButton type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? "Ingresando…" : "Ingresar"}
      </PrimaryButton>
    </form>
  );
};
