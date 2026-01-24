"use client";
import { useState } from "react";
import { Input, PrimaryButton } from "@/components/utils";
import { Key, User } from "lucide-react";

interface LoginFormState {
  userName: string;
  password: string;
}

export const LoginForm = () => {
  const [formState, setFormState] = useState<LoginFormState>({
    userName: "",
    password: "",
  });

  return (
    <form action="">
      <Input
        label="Correo electrónico o nombre de usuario"
        type="email"
        placeholder="Ingrese su correo electrónico o nombre de usuario"
        value={formState.userName}
        onChange={(e) =>
          setFormState((prev) => ({ ...prev, userName: e.target.value }))
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
      <PrimaryButton type="submit">Ingresar</PrimaryButton>
    </form>
  );
};
