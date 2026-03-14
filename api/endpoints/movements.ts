import { waterApi } from "@/api/waterApi";
import type {
  ProductMovementResponseDTO,
  ProductMovementCreateDTO,
  ProductMovementUpdateDTO,
} from "@/interfaces/types";

/** GET /movements/ */
export async function getAllMovements(companyId: string): Promise<ProductMovementResponseDTO[]> {
  const { data } = await waterApi.get<ProductMovementResponseDTO[]>("/movements/", {
    params: { company_id: companyId },
  });
  return data;
}

/** GET /movements/{id_movimiento} */
export async function getMovementById(
  movementId: number,
  companyId: string
): Promise<ProductMovementResponseDTO> {
  const { data } = await waterApi.get<ProductMovementResponseDTO>(
    `/movements/${movementId}`,
    {
      params: { company_id: companyId },
    }
  );
  return data;
}

/** POST /movements/ */
export async function createMovement(
  body: ProductMovementCreateDTO
): Promise<ProductMovementResponseDTO> {
  console.log(body);
  const { data } = await waterApi.post<ProductMovementResponseDTO>("/movements/", body);
  return data;
}

/** PUT /movements/{id_movimiento} */
export async function updateMovement(
  movementId: number,
  body: ProductMovementUpdateDTO
): Promise<ProductMovementResponseDTO> {
  const { data } = await waterApi.put<ProductMovementResponseDTO>(
    `/movements/${movementId}`,
    body
  );
  return data;
}

/** PATCH /movements/{id_movimiento}/status */
export async function updateMovementStatus(
  movementId: number,
  status: string
): Promise<ProductMovementResponseDTO> {
  const { data } = await waterApi.patch<ProductMovementResponseDTO>(
    `/movements/${movementId}/status`,
    {},
    {
      params: { nuevo_estado: status },
    }
  );
  return data;
}

/** DELETE /movements/{id_movimiento} */
export async function deleteMovement(movementId: number, companyId: string): Promise<void> {
  await waterApi.delete(`/movements/${movementId}`, {
    params: { company_id: companyId },
  });
}
