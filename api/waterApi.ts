import axios from "axios";
import { getToken, removeToken } from "@/lib/auth";

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export const waterApi = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Añadir token JWT a todas las peticiones (excepto login/register)
waterApi.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Manejar 401: token inválido o expirado → limpiar y redirigir al login
waterApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
      if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default waterApi;
