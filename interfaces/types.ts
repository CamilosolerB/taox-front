export interface Movement {
  id: string;
  codigo_producto: string;
  tipo: "entrada" | "salida" | "transferencia";
  cantidad: number;
  ubicacion_origen: string;
  ubicacion_destino: string;
  fecha: string;
  descripcion: string;
  usuario: string;
}

export interface Location {
  id: string;
  nombre: string;
  capacidad: number;
  capacidad_usada: number;
  descripcion: string;
}

export interface User {
  id: string;
  nombre: string;
  email: string;
  rol: "admin" | "operator" | "viewer";
  estado: boolean;
}

export interface Provider {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  total: number;
  page: number;
  limit: number;
}
