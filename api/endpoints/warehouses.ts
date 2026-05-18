import { waterApi } from "@/api/waterApi";
import type { ProcessResponseDTO } from "@/interfaces/types";

export interface WarehouseResponseDTO extends ProcessResponseDTO {
  tipo_proceso: "almacenamiento";
}

/** GET /warehouses/ - Obtiene todos los almacenes */
export async function getAllWarehouses(companyId: string): Promise<WarehouseResponseDTO[]> {
  const { data } = await waterApi.get<WarehouseResponseDTO[]>("/warehouses/", {
    params: { company_id: companyId },
  });
  return data;
}

/** GET /warehouses/{warehouse_id} */
export async function getWarehouseById(warehouseId: string): Promise<WarehouseResponseDTO> {
  const { data } = await waterApi.get<WarehouseResponseDTO>(`/warehouses/${warehouseId}`);
  return data;
}

/** POST /warehouses/ - Crear nuevo almacen */
export async function createWarehouse(body: {
  nombre: string;
  descripcion?: string;
}): Promise<WarehouseResponseDTO> {
  const { data } = await waterApi.post<WarehouseResponseDTO>("/warehouses/", body);
  return data;
}

/** PUT /warehouses/{warehouse_id} */
export async function updateWarehouse(
  warehouseId: string,
  body: {
    nombre?: string;
    descripcion?: string;
  }
): Promise<WarehouseResponseDTO> {
  const { data } = await waterApi.put<WarehouseResponseDTO>(`/warehouses/${warehouseId}`, body);
  return data;
}

/** DELETE /warehouses/{warehouse_id} */
export async function deleteWarehouse(warehouseId: string): Promise<void> {
  await waterApi.delete(`/warehouses/${warehouseId}`);
}