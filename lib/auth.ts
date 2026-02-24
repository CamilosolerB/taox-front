/**
 * Almacenamiento del token JWT de sesión (retornado por POST /auth/login).
 * El token debe enviarse en header: Authorization: Bearer <access_token>
 */

const TOKEN_KEY = "taox_access_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}

export function hasToken(): boolean {
  return !!getToken();
}
