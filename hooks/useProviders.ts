"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as providersApi from "@/api/endpoints/providers";
import * as productProvidersApi from "@/api/endpoints/productProviders";
import type { ProviderCreateDTO, ProviderUpdateDTO, ProductProviderCreateDTO, ProductProviderUpdateDTO } from "@/api/types";

const downloadBlob = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

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

  // Product Provider Hooks
  const useGetProvidersByProduct = (productCode: string | null) => {
    return useQuery({
      queryKey: [...PROVIDERS_QUERY_KEY, "by-product", productCode],
      queryFn: () =>
        productCode ? productProvidersApi.getProvidersByProduct(productCode) : Promise.resolve([]),
      enabled: !!productCode,
      staleTime: 1000 * 60 * 5,
    });
  };

  const useGetProductsByProvider = (providerId: string | null) => {
    return useQuery({
      queryKey: [...PROVIDERS_QUERY_KEY, "by-provider", providerId],
      queryFn: () =>
        providerId ? productProvidersApi.getProductsByProvider(providerId) : Promise.resolve([]),
      enabled: !!providerId,
      staleTime: 1000 * 60 * 5,
    });
  };

  const useGetMainProvider = (productCode: string | null) => {
    return useQuery({
      queryKey: [...PROVIDERS_QUERY_KEY, "main", productCode],
      queryFn: () =>
        productCode ? productProvidersApi.getMainProvider(productCode) : null,
      enabled: !!productCode,
      staleTime: 1000 * 60 * 5,
    });
  };

  const useCreateProductProvider = () => {
    return useMutation({
      mutationFn: (body: ProductProviderCreateDTO) =>
        productProvidersApi.createProductProvider(body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: PROVIDERS_QUERY_KEY });
      },
    });
  };

  const useUpdateProductProvider = () => {
    return useMutation({
      mutationFn: ({
        productCode,
        providerId,
        body,
      }: {
        productCode: string;
        providerId: string;
        body: ProductProviderUpdateDTO;
      }) => productProvidersApi.updateProductProvider(productCode, providerId, body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: PROVIDERS_QUERY_KEY });
      },
    });
  };

  const useDeleteProductProvider = () => {
    return useMutation({
      mutationFn: ({
        productCode,
        providerId,
      }: {
        productCode: string;
        providerId: string;
      }) => productProvidersApi.deleteProductProvider(productCode, providerId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: PROVIDERS_QUERY_KEY });
      },
    });
  };

  const useSetMainProvider = () => {
    return useMutation({
      mutationFn: ({
        productCode,
        providerId,
      }: {
        productCode: string;
        providerId: string;
      }) => productProvidersApi.setMainProvider(productCode, providerId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: PROVIDERS_QUERY_KEY });
      },
    });
  };

  const useDownloadProvidersCsv = () => {
    return useMutation({
      mutationFn: async () => {
        if (!companyId) throw new Error("No company ID");
        const blob = await providersApi.exportProvidersCsv(companyId);
        downloadBlob(blob, `proveedores_${companyId}.csv`);
      },
    });
  };

  return {
    useGetProviders,
    useGetProvider,
    useCreateProvider,
    useUpdateProvider,
    useDeleteProvider,
    useGetProvidersByProduct,
    useGetProductsByProvider,
    useGetMainProvider,
    useCreateProductProvider,
    useUpdateProductProvider,
    useDeleteProductProvider,
    useSetMainProvider,
    useDownloadProvidersCsv,
  };
}
