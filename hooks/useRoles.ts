"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as rolesApi from "@/api/endpoints/roles";
import type { CreateRoleDTO, UpdateRoleDTO } from "@/api/types";

const ROLES_QUERY_KEY = ["roles"];

export function useRoles() {
  const queryClient = useQueryClient();

  const useGetRoles = () => {
    return useQuery({
      queryKey: ROLES_QUERY_KEY,
      queryFn: () => rolesApi.getRoles(),
      staleTime: 1000 * 60 * 5,
    });
  };

  const useGetRole = (roleId: string | null) => {
    return useQuery({
      queryKey: [...ROLES_QUERY_KEY, roleId],
      queryFn: () => (roleId ? rolesApi.getRoleById(roleId) : null),
      enabled: !!roleId,
      staleTime: 1000 * 60 * 5,
    });
  };

  const useCreateRole = () => {
    return useMutation({
      mutationFn: (body: CreateRoleDTO) => rolesApi.createRole(body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ROLES_QUERY_KEY });
      },
    });
  };

  const useUpdateRole = () => {
    return useMutation({
      mutationFn: ({
        roleId,
        body,
      }: {
        roleId: string;
        body: UpdateRoleDTO;
      }) => rolesApi.updateRole(roleId, body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ROLES_QUERY_KEY });
      },
    });
  };

  const useDeleteRole = () => {
    return useMutation({
      mutationFn: (roleId: string) => rolesApi.deleteRole(roleId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ROLES_QUERY_KEY });
      },
    });
  };

  return {
    useGetRoles,
    useGetRole,
    useCreateRole,
    useUpdateRole,
    useDeleteRole,
  };
}
