import { waterApi } from "@/api/waterApi";
import type {
  ClientDTO,
  ClientCreateDTO,
  ClientUpdateDTO,
} from "@/api/types";

/** GET /clients?company_id= */
export async function getClients(companyId: string): Promise<ClientDTO[]> {
  const { data } = await waterApi.get<ClientDTO[]>("/clients", {
    params: { company_id: companyId },
  });
  return data;
}

/** POST /clients */
export async function createClient(body: ClientCreateDTO): Promise<ClientDTO> {
  const { data } = await waterApi.post<ClientDTO>("/clients", body);
  return data;
}

/** GET /clients/{client_id}?company_id= */
export async function getClient(
  clientId: string,
  companyId: string
): Promise<ClientDTO> {
  const { data } = await waterApi.get<ClientDTO>(`/clients/${clientId}`, {
    params: { company_id: companyId },
  });
  return data;
}

/** PUT /clients/{client_id} */
export async function updateClient(
  clientId: string,
  body: ClientUpdateDTO
): Promise<ClientDTO> {
  const { data } = await waterApi.put<ClientDTO>(`/clients/${clientId}`, body);
  return data;
}

/** DELETE /clients/{client_id}?company_id= */
export async function deleteClient(
  clientId: string,
  companyId: string
): Promise<void> {
  await waterApi.delete(`/clients/${clientId}`, {
    params: { company_id: companyId },
  });
}

/** GET /clients/city/{city}?company_id= */
export async function getClientsByCity(
  city: string,
  companyId: string
): Promise<ClientDTO[]> {
  const { data } = await waterApi.get<ClientDTO[]>(`/clients/city/${city}`, {
    params: { company_id: companyId },
  });
  return data;
}
