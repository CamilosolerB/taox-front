/**
 * DTOs alineados con la TAOX API (OpenAPI).
 * Usar en llamadas y respuestas de waterApi.
 */

// --- Auth ---
export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  username: string;
  email: string;
  password: string;
  role_id: string;
  company_id: string;
}

export interface TokenDTO {
  access_token: string;
  token_type: string;
  user_id: string;
  username: string;
  email: string;
  role_id: string;
  is_active: boolean;
}

export interface CurrentUserDTO {
  user_id: string;
  username: string;
  email: string;
  role_id: string;
  company_id: string;
  is_active: boolean;
}

// --- Users ---
export interface CreateUserDTO {
  id_user: string | null;
  username: string;
  email: string;
  password: string;
  is_active: boolean;
  role_id: string;
  company_id: string;
}

export interface UpdateUserDTO {
  username?: string | null;
  email?: string | null;
  password?: string | null;
  is_active?: boolean | null;
  role_id?: string | null;
  company_id?: string | null;
}

export interface UserDTO {
  id_user: string | null;
  username: string;
  email: string;
  password: string;
  is_active: boolean;
  role_id: string;
  company_id: string;
}

export interface UserDetailDTO {
  id_user: string;
  username: string;
  email: string;
  password: string;
  is_active: boolean;
  role_id: string;
  company_id: string;
}

export interface UserWithRelationsDTO {
  id_user: string;
  username: string;
  email: string;
  password: string;
  is_active: boolean;
  role?: RoleDTO | null;
  company?: CompanyDTO | null;
}

// --- Roles ---
export interface RoleDTO {
  id_role: string;
  name: string;
}

export interface CreateRoleDTO {
  name: string;
}

export interface UpdateRoleDTO {
  name?: string | null;
}

// --- Companies ---
export interface CompanyDTO {
  id_company: string;
  name: string;
  nit: string;
  address: string;
  phone: string;
  email: string;
  is_active: boolean;
}

export interface CreateCompanyDTO {
  name: string;
  nit: string;
  address: string;
  phone: string;
  email: string;
  is_active?: boolean;
}

export interface UpdateCompanyDTO {
  name?: string | null;
  nit?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  is_active?: boolean | null;
}

// --- Products ---
export interface ProductDTO {
  id_product: string;
  name: string;
  generic_name: string;
  price: number;
  unit_measure: string;
  unit_price: number;
  min_unit_price: number;
  lead_time_days: number;
  restorage: string;
  limite_critico: number;
  company_id: string;
}

export interface CreateProductDTO {
  id_product: string;
  name: string;
  generic_name: string;
  price: number;
  unit_measure: string;
  unit_price: number;
  min_unit_price: number;
  lead_time_days: number;
  restorage: string;
  limite_critico: number;
  company_id: string;
}

export interface UpdateProductDTO {
  name?: string | null;
  generic_name?: string | null;
  price?: number | null;
  unit_measure?: string | null;
  unit_price?: number | null;
  min_unit_price?: number | null;
  lead_time_days?: number | null;
  restorage?: string | null;
  limite_critico?: number | null;
}

// --- Providers ---
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

// --- Locations ---
export interface LocationDTO {
  id_ubicacion: number;
  ubicacion: string;
  posicion: string;
  nivel: string;
  tipo_ubicacion: string;
  localizador: string;
  company_id: string;
  is_active: boolean;
}

export interface LocationCreateDTO {
  ubicacion: string;
  posicion: string;
  nivel: string;
  tipo_ubicacion: string;
  localizador: string;
  company_id: string;
}

export interface LocationUpdateDTO {
  ubicacion?: string | null;
  posicion?: string | null;
  nivel?: string | null;
  tipo_ubicacion?: string | null;
  localizador?: string | null;
  is_active?: boolean | null;
}

// --- Stock ---
export interface StockLocationDTO {
  id_ubicacion: number;
  codigo_producto: string;
  cantidad: number;
  company_id: string;
}

export interface StockLocationCreateDTO {
  id_ubicacion: number;
  codigo_producto: string;
  cantidad: number;
  company_id: string;
}

export interface StockLocationUpdateDTO {
  cantidad: number;
}

export interface StockWarehouseDTO {
  codigo_producto: string;
  cantidad: string;
  company_id: string;
}

export interface StockWarehouseCreateDTO {
  codigo_producto: string;
  cantidad: number;
  company_id: string;
}

// --- Clients ---
export interface ClientDTO {
  codigo_cliente: string;
  cliente: string;
  telefono1: string;
  telefono2: string | null;
  contacto: string;
  correo: string;
  ciudad: string;
  tipo_agua: string;
  cantidad_promedio_kg: number;
  company_id: string;
  is_active: boolean;
}

export interface ClientCreateDTO {
  codigo_cliente: string;
  cliente: string;
  telefono1: string;
  telefono2?: string | null;
  contacto: string;
  correo: string;
  ciudad: string;
  tipo_agua: string;
  cantidad_promedio_kg: number;
  company_id: string;
}

export interface ClientUpdateDTO {
  cliente?: string | null;
  telefono1?: string | null;
  telefono2?: string | null;
  contacto?: string | null;
  correo?: string | null;
  ciudad?: string | null;
  tipo_agua?: string | null;
  cantidad_promedio_kg?: number | null;
  is_active?: boolean | null;
}

// --- Product-Providers ---
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
