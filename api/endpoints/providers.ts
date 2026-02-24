import { waterApi } from "@/api/waterApi";
import type {
  ProviderDTO,
  ProviderCreateDTO,
  ProviderUpdateDTO,
} from "@/api/types";

/** GET /providers?company_id= */
export async function getProviders(companyId: string): Promise<ProviderDTO[]> {
  const { data } = await waterApi.get<ProviderDTO[]>("/providers", {
    params: { company_id: companyId },
  });
  return data;
}

/** POST /providers */
export async function createProvider(body: ProviderCreateDTO): Promise<ProviderDTO> {
  const { data } = await waterApi.post<ProviderDTO>("/providers", body);
  return data;
}

/** GET /providers/{provider_id}?company_id= */
export async function getProvider(
  providerId: string,
  companyId: string
): Promise<ProviderDTO> {
  const { data } = await waterApi.get<ProviderDTO>(`/providers/${providerId}`, {
    params: { company_id: companyId },
  });
  return data;
}

/** PUT /providers/{provider_id}?company_id= */
export async function updateProvider(
  providerId: string,
  companyId: string,
  body: ProviderUpdateDTO
): Promise<ProviderDTO> {
  const { data } = await waterApi.put<ProviderDTO>(
    `/providers/${providerId}`,
    body,
    { params: { company_id: companyId } }
  );
  return data;
}

/** DELETE /providers/{provider_id}?company_id= */
export async function deleteProvider(
  providerId: string,
  companyId: string
): Promise<void> {
  await waterApi.delete(`/providers/${providerId}`, {
    params: { company_id: companyId },
  });
}
