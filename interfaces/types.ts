// Providers
export interface ProviderDTO {
  cad_proveedor: string;
  nombre: string;
  contacto: string;
  direccion: string;
  telefono: string;
  celular: string;
  web: string | null;
  correo: string;
  company_id: string;
  is_active: boolean;
}

export interface ProviderCreateDTO {
  cad_proveedor: string;
  nombre: string;
  contacto: string;
  direccion: string;
  telefono: string;
  celular: string;
  web?: string | null;
  correo: string;
  company_id: string;
}

export interface ProviderUpdateDTO {
  nombre?: string | null;
  contacto?: string | null;
  direccion?: string | null;
  telefono?: string | null;
  celular?: string | null;
  web?: string | null;
  correo?: string | null;
  is_active?: boolean | null;
}

// Product-Provider relationship
export interface ProductProviderDTO {
  codigo_producto: string;
  cad_proveedor: string;
  es_principal: boolean;
  precio?: number;
}

export interface ProductProviderCreateDTO {
  codigo_producto: string;
  cad_proveedor: string;
  es_principal?: boolean;
  precio?: number;
}

export interface ProductProviderUpdateDTO {
  es_principal?: boolean | null;
  precio?: number | null;
}

// Movements
export interface ProductMovementCreateDTO {
  codigo_producto: string;
  id_proceso_origen: string;
  id_proceso_destino: string;
  tipo_movimiento?: string;
  cantidad: number;
  notas?: string | null;
  id_empresa: string;
}

export interface ProductMovementResponseDTO {
  id_movimiento: number;
  codigo_producto: string;
  id_proceso_origen: string;
  id_proceso_destino: string;
  tipo_movimiento: string;
  cantidad: number;
  notas: string | null;
  id_empresa: string;
  estado: string;
  created_at: string;
  updated_at: string;
}

export interface ProductMovementUpdateDTO {
  estado?: string | null;
  notas?: string | null;
}

// Stock Alerts
export interface StockAlertResponseDTO {
  id_alerta: number;
  codigo_producto: string;
  id_proceso: number;
  tipo_alerta: string; // "stock_critico", "stock_bajo", "exceso"
  cantidad_actual: number;
  cantidad_referencia: number;
  id_empresa: string;
  estado: string; // "activa", "resuelta", "ignorada"
  descripcion: string | null;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface StockAlertCreateDTO {
  codigo_producto: string;
  id_proceso: number;
  tipo_alerta: string;
  cantidad_actual: number;
  cantidad_referencia: number;
  id_empresa: string;
  descripcion?: string | null;
}

export interface StockAlertUpdateDTO {
  estado?: string | null;
  descripcion?: string | null;
}

// Chemical Stock
export interface ChemicalStockResponseDTO {
  id_stock_quimico: number;
  codigo_producto: string;
  id_proceso: number;
  cantidad_actual: number;
  cantidad_minima: number;
  cantidad_maxima: number;
  unidad_medida: string;
  id_empresa: string;
  is_active: boolean;
  es_stock_critico: boolean;
  es_stock_bajo: boolean;
  porcentaje_stock: number;
  created_at: string;
  updated_at: string;
}

export interface ChemicalStockCreateDTO {
  codigo_producto: string;
  id_proceso: number;
  cantidad_actual: number;
  cantidad_minima: number;
  cantidad_maxima: number;
  unidad_medida: string;
  id_empresa: string;
}

export interface ChemicalStockUpdateDTO {
  cantidad_actual?: number | null;
  cantidad_minima?: number | null;
  cantidad_maxima?: number | null;
  unidad_medida?: string | null;
  is_active?: boolean | null;
}

// Process
export interface ProcessResponseDTO {
  id_proceso: string;
  nombre: string;
  descripcion: string | null;
  tipo_proceso: string;
  id_empresa: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProcessCreateDTO {
  nombre: string;
  descripcion?: string | null;
  tipo_proceso: string;
  id_empresa: string;
}

export interface ProcessUpdateDTO {
  nombre?: string | null;
  descripcion?: string | null;
  tipo_proceso?: string | null;
  is_active?: boolean | null;
}

// Legacy types (keep for backward compatibility)
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
