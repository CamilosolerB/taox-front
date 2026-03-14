import { waterApi } from "@/api/waterApi";

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

export interface ChemicalStockResponseDTO {
  id_stock_quimico: number;
  codigo_producto: string;
  id_proceso: number;
  cantidad_actual: number;
  cantidad_minima: number;
  cantidad_maxima: number;
  unidad_medida: string;
  is_active: boolean;
  id_empresa: string;
  created_at: string;
  updated_at: string;
}

/** POST /stocks/ */
export async function createChemicalStock(
  body: ChemicalStockCreateDTO
): Promise<ChemicalStockResponseDTO> {
  const { data } = await waterApi.post<ChemicalStockResponseDTO>("/stocks/", body);
  return data;
}

/** PUT /stocks/{id_stock_quimico} */
export async function updateChemicalStock(
  id_stock_quimico: number,
  body: ChemicalStockUpdateDTO
): Promise<ChemicalStockResponseDTO> {
  const { data } = await waterApi.put<ChemicalStockResponseDTO>(`/stocks/${id_stock_quimico}`, body);
  return data;
}

/** GET /stocks/?company_id= */
export async function getChemicalStocks(companyId: string): Promise<ChemicalStockResponseDTO[]> {
  const { data } = await waterApi.get<ChemicalStockResponseDTO[]>("/stocks/", {
    params: { company_id: companyId },
  });
  return data;
}

/** DELETE /stocks/{id_stock_quimico}?company_id= */
export async function deleteChemicalStock(
  id_stock_quimico: number,
  companyId: string
): Promise<void> {
  await waterApi.delete(`/stocks/${id_stock_quimico}`, {
    params: { company_id: companyId },
  });
}
