"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as usersApi from "@/api/endpoints/users";
import type { CreateUserDTO, UpdateUserDTO } from "@/api/types";

const USERS_QUERY_KEY = ["users"];

export function useUsers() {
  const queryClient = useQueryClient();

  const useGetUsers = () => {
    return useQuery({
      queryKey: USERS_QUERY_KEY,
      queryFn: () => usersApi.getAllUsers(),
      staleTime: 1000 * 60 * 5,
    });
  };

  const useGetUser = (userId: string | null) => {
    return useQuery({
      queryKey: [...USERS_QUERY_KEY, userId],
      queryFn: () => (userId ? usersApi.getUserById(userId) : null),
      enabled: !!userId,
      staleTime: 1000 * 60 * 5,
    });
  };

  const useCreateUser = () => {
    return useMutation({
      mutationFn: (body: CreateUserDTO) => usersApi.createUser(body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
      },
    });
  };

  const useUpdateUser = () => {
    return useMutation({
      mutationFn: ({
        userId,
        body,
      }: {
        userId: string;
        body: UpdateUserDTO;
      }) => usersApi.updateUser(userId, body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
      },
    });
  };

  const useDeleteUser = () => {
    return useMutation({
      mutationFn: (userId: string) => usersApi.deleteUser(userId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
      },
    });
  };

  return {
    useGetUsers,
    useGetUser,
    useCreateUser,
    useUpdateUser,
    useDeleteUser,
  };
}
