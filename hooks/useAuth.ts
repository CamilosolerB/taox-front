"use client";

import { useMutation } from "@tanstack/react-query";
import { useAuth as useAuthContext } from "@/providers/AuthProvider";
import * as authApi from "@/api/endpoints/auth";

/** Hook de auth: contexto + mutación de login para formularios (isPending, error). */
export function useAuthHook() {
  const ctx = useAuthContext();

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.login({ email, password }),
    onSuccess: () => {
      ctx.refetchUser();
    },
  });

  return {
    ...ctx,
    loginMutation,
  };
}
