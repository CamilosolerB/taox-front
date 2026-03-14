import { waterApi } from "@/api/waterApi";
import type {
  ProcessResponseDTO,
  ProcessCreateDTO,
  ProcessUpdateDTO,
} from "@/interfaces/types";

/** GET /processes/ */
export async function getAllProcesses(companyId: string): Promise<ProcessResponseDTO[]> {
  const { data } = await waterApi.get<ProcessResponseDTO[]>("/processes/", {
    params: { company_id: companyId },
  });
  return data;
}

/** GET /processes/{id_proceso} */
export async function getProcessById(
  processId: string,
  companyId: string
): Promise<ProcessResponseDTO> {
  const { data } = await waterApi.get<ProcessResponseDTO>(`/processes/${processId}`, {
    params: { company_id: companyId },
  });
  return data;
}

/** POST /processes/ */
export async function createProcess(body: ProcessCreateDTO): Promise<ProcessResponseDTO> {
  const { data } = await waterApi.post<ProcessResponseDTO>("/processes/", body);
  return data;
}

/** PUT /processes/{id_proceso} */
export async function updateProcess(
  processId: string,
  body: ProcessUpdateDTO
): Promise<ProcessResponseDTO> {
  const { data } = await waterApi.put<ProcessResponseDTO>(`/processes/${processId}`, body);
  return data;
}

/** DELETE /processes/{id_proceso} */
export async function deleteProcess(processId: string, companyId: string): Promise<void> {
  await waterApi.delete(`/processes/${processId}`, {
    params: { company_id: companyId },
  });
}
