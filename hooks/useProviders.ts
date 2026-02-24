"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as providersApi from "@/api/endpoints/providers";
import type { ProviderCreateDTO, ProviderUpdateDTO } from "@/api/types";

const PROVIDERS_QUERY_KEY = ["providers"];

export function useProviders(companyId: string | null) {
  const queryClient = useQueryClient();

  const useGetProviders = () => {
    return useQuery({
      queryKey: [...PROVIDERS_QUERY_KEY, companyId],
      queryFn: () =>
        companyId ? providersApi.getProviders(companyId) : Promise.resolve([]),
      enabled: !!companyId,
      staleTime: 1000 * 60 * 5,
    });
  };

  const useGetProvider = (providerId: string | null) => {
    return useQuery({
      queryKey: [...PROVIDERS_QUERY_KEY, "detail", providerId, companyId],
      queryFn: () =>
        companyId && providerId
          ? providersApi.getProvider(providerId, companyId)
          : null,
      enabled: !!companyId && !!providerId,
      staleTime: 1000 * 60 * 5,
    });
  };

  const useCreateProvider = () => {
    return useMutation({
      mutationFn: (body: ProviderCreateDTO) => providersApi.createProvider(body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: PROVIDERS_QUERY_KEY });
      },
    });
  };

  const useUpdateProvider = () => {
    return useMutation({
      mutationFn: ({
        providerId,
        companyId: cid,
        body,
      }: {
        providerId: string;
        companyId: string;
        body: ProviderUpdateDTO;
      }) => providersApi.updateProvider(providerId, cid, body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: PROVIDERS_QUERY_KEY });
      },
    });
  };

  const useDeleteProvider = () => {
    return useMutation({
      mutationFn: ({
        providerId,
        companyId: cid,
      }: {
        providerId: string;
        companyId: string;
      }) => providersApi.deleteProvider(providerId, cid),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: PROVIDERS_QUERY_KEY });
      },
    });
  };

  return {
    useGetProviders,
    useGetProvider,
    useCreateProvider,
    useUpdateProvider,
    useDeleteProvider,
  };
}
