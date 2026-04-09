import { waterApi } from "@/api/waterApi";
import type { StockAlertResponseDTO, StockAlertCreateDTO, StockAlertUpdateDTO } from "@/interfaces/types";

/** GET /alerts/ */
export async function getAllAlerts(companyId: string): Promise<StockAlertResponseDTO[]> {
  const { data } = await waterApi.get<StockAlertResponseDTO[]>("/alerts/", {
    params: { company_id: companyId },
  });
  return data;
}

/** GET /alerts/active */
export async function getActiveAlerts(companyId: string): Promise<StockAlertResponseDTO[]> {
  const { data } = await waterApi.get<StockAlertResponseDTO[]>("/alerts/active", {
    params: { company_id: companyId },
  });
  return data;
}

/** GET /alerts/{id_alerta} */
export async function getAlertById(
  alertId: number,
  companyId: string
): Promise<StockAlertResponseDTO> {
  const { data } = await waterApi.get<StockAlertResponseDTO>(`/alerts/${alertId}`, {
    params: { company_id: companyId },
  });
  return data;
}

/** POST /alerts/ */
export async function createAlert(body: StockAlertCreateDTO): Promise<StockAlertResponseDTO> {
  const { data } = await waterApi.post<StockAlertResponseDTO>("/alerts/", body);
  return data;
}

/** PUT /alerts/{id_alerta} */
export async function updateAlert(
  alertId: number,
  body: StockAlertUpdateDTO
): Promise<StockAlertResponseDTO> {
  const { data } = await waterApi.put<StockAlertResponseDTO>(`/alerts/${alertId}`, body);
  return data;
}

/** PATCH /alerts/{id_alerta}/resolve */
export async function resolveAlert(alertId: number): Promise<StockAlertResponseDTO> {
  const { data } = await waterApi.patch<StockAlertResponseDTO>(`/alerts/${alertId}/resolve`);
  return data;
}

/** DELETE /alerts/{id_alerta} */
export async function deleteAlert(alertId: number, companyId: string): Promise<void> {
  await waterApi.delete(`/alerts/${alertId}`, {
    params: { company_id: companyId },
  });
}
