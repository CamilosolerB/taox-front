"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as clientsApi from "@/api/endpoints/clients";
import type { ClientCreateDTO, ClientUpdateDTO } from "@/api/types";

const CLIENTS_QUERY_KEY = ["clients"];

export function useClients(companyId: string | null) {
  const queryClient = useQueryClient();

  const useGetClients = () => {
    return useQuery({
      queryKey: [...CLIENTS_QUERY_KEY, companyId],
      queryFn: () =>
        companyId ? clientsApi.getClients(companyId) : Promise.resolve([]),
      enabled: !!companyId,
      staleTime: 1000 * 60 * 5,
    });
  };

  const useGetClientsByCity = (city: string | null) => {
    return useQuery({
      queryKey: [...CLIENTS_QUERY_KEY, "city", city, companyId],
      queryFn: () =>
        companyId && city
          ? clientsApi.getClientsByCity(city, companyId)
          : Promise.resolve([]),
      enabled: !!companyId && !!city,
      staleTime: 1000 * 60 * 5,
    });
  };

  const useGetClient = (clientId: string | null) => {
    return useQuery({
      queryKey: [...CLIENTS_QUERY_KEY, "detail", clientId, companyId],
      queryFn: () =>
        companyId && clientId
          ? clientsApi.getClient(clientId, companyId)
          : null,
      enabled: !!companyId && !!clientId,
      staleTime: 1000 * 60 * 5,
    });
  };

  const useCreateClient = () => {
    return useMutation({
      mutationFn: (body: ClientCreateDTO) => clientsApi.createClient(body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: CLIENTS_QUERY_KEY });
      },
    });
  };

  const useUpdateClient = () => {
    return useMutation({
      mutationFn: ({
        clientId,
        body,
      }: {
        clientId: string;
        body: ClientUpdateDTO;
      }) => clientsApi.updateClient(clientId, body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: CLIENTS_QUERY_KEY });
      },
    });
  };

  const useDeleteClient = () => {
    return useMutation({
      mutationFn: ({
        clientId,
        companyId: cid,
      }: {
        clientId: string;
        companyId: string;
      }) => clientsApi.deleteClient(clientId, cid),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: CLIENTS_QUERY_KEY });
      },
    });
  };

  return {
    useGetClients,
    useGetClientsByCity,
    useGetClient,
    useCreateClient,
    useUpdateClient,
    useDeleteClient,
  };
}
