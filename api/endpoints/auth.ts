import { waterApi } from "@/api/waterApi";
import type { LoginDTO, RegisterDTO, TokenDTO, CurrentUserDTO } from "@/api/types";
import { setToken } from "@/lib/auth";

/** POST /auth/login - Retorna TokenDTO; guarda access_token en localStorage. */
export async function login(body: LoginDTO): Promise<TokenDTO> {
  const { data } = await waterApi.post<TokenDTO>("/auth/login", body);
  setToken(data.access_token);
  return data;
}

/** POST /auth/register - Registro; retorna TokenDTO y guarda token. */
export async function register(body: RegisterDTO): Promise<TokenDTO> {
  const { data } = await waterApi.post<TokenDTO>("/auth/register", body);
  setToken(data.access_token);
  return data;
}

/** GET /auth/me - Usuario actual (requiere Bearer). */
export async function getCurrentUser(): Promise<CurrentUserDTO> {
  const { data } = await waterApi.get<CurrentUserDTO>("/auth/me");
  return data;
}

/** POST /auth/validate-token - Valida el token actual. */
export async function validateToken(): Promise<void> {
  await waterApi.post("/auth/validate-token");
}
