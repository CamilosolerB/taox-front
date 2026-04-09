import { waterApi } from "@/api/waterApi";
import type { RoleDTO, CreateRoleDTO, UpdateRoleDTO } from "@/api/types";

/** GET /roles/ */
export async function getRoles(): Promise<RoleDTO[]> {
  const { data } = await waterApi.get<RoleDTO[]>("/roles/");
  return data;
}

/** POST /roles/ */
export async function createRole(body: CreateRoleDTO): Promise<RoleDTO> {
  const { data } = await waterApi.post<RoleDTO>("/roles/", body);
  return data;
}

/** GET /roles/{role_id} */
export async function getRoleById(roleId: string): Promise<RoleDTO> {
  const { data } = await waterApi.get<RoleDTO>(`/roles/${roleId}`);
  return data;
}

/** PUT /roles/{role_id} */
export async function updateRole(roleId: string, body: UpdateRoleDTO): Promise<RoleDTO> {
  const { data } = await waterApi.put<RoleDTO>(`/roles/${roleId}`, body);
  return data;
}

/** DELETE /roles/{role_id} */
export async function deleteRole(roleId: string): Promise<void> {
  await waterApi.delete(`/roles/${roleId}`);
}
