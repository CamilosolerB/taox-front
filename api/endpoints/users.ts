import { waterApi } from "@/api/waterApi";
import type {
  UserDetailDTO,
  UserWithRelationsDTO,
  CreateUserDTO,
  UpdateUserDTO,
  UserDTO,
} from "@/api/types";

/** GET /users/ */
export async function getAllUsers(): Promise<UserDetailDTO[]> {
  const { data } = await waterApi.get<UserDetailDTO[]>("/users/");
  return data;
}

/** POST /users/ */
export async function createUser(body: CreateUserDTO): Promise<UserDTO> {
  const { data } = await waterApi.post<UserDTO>("/users/", body);
  return data;
}

/** GET /users/{user_id} */
export async function getUserById(userId: string): Promise<UserWithRelationsDTO> {
  const { data } = await waterApi.get<UserWithRelationsDTO>(`/users/${userId}`);
  return data;
}

/** PUT /users/{user_id} */
export async function updateUser(userId: string, body: UpdateUserDTO): Promise<UserDTO> {
  const { data } = await waterApi.put<UserDTO>(`/users/${userId}`, body);
  return data;
}

/** DELETE /users/{user_id} */
export async function deleteUser(userId: string): Promise<void> {
  await waterApi.delete(`/users/${userId}`);
}
