import { waterApi } from "@/api/waterApi";
import type {
  ChemicalStockResponseDTO,
  ChemicalStockCreateDTO,
  ChemicalStockUpdateDTO,
} from "@/interfaces/types";

/** GET /stocks/ */
export async function getAllStocks(companyId: string): Promise<ChemicalStockResponseDTO[]> {
  const { data } = await waterApi.get<ChemicalStockResponseDTO[]>("/stocks/", {
    params: { company_id: companyId },
  });
  return data;
}

/** GET /stocks/critical */
export async function getCriticalStocks(companyId: string): Promise<ChemicalStockResponseDTO[]> {
  const { data } = await waterApi.get<ChemicalStockResponseDTO[]>("/stocks/critical", {
    params: { company_id: companyId },
  });
  return data;
}

/** GET /stocks/{id_stock_quimico} */
export async function getStockById(
  stockId: number,
  companyId: string
): Promise<ChemicalStockResponseDTO> {
  const { data } = await waterApi.get<ChemicalStockResponseDTO>(`/stocks/${stockId}`, {
    params: { company_id: companyId },
  });
  return data;
}

/** POST /stocks/ */
export async function createStock(
  body: ChemicalStockCreateDTO
): Promise<ChemicalStockResponseDTO> {
  const { data } = await waterApi.post<ChemicalStockResponseDTO>("/stocks/", body);
  return data;
}

/** PUT /stocks/{id_stock_quimico} */
export async function updateStock(
  stockId: number,
  body: ChemicalStockUpdateDTO
): Promise<ChemicalStockResponseDTO> {
  const { data } = await waterApi.put<ChemicalStockResponseDTO>(
    `/stocks/${stockId}`,
    body
  );
  return data;
}

/** DELETE /stocks/{id_stock_quimico} */
export async function deleteStock(stockId: number, companyId: string): Promise<void> {
  await waterApi.delete(`/stocks/${stockId}`, {
    params: { company_id: companyId },
  });
}
