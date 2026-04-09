"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as productsApi from "@/api/endpoints/products";
import type { ProductDTO, CreateProductDTO, UpdateProductDTO } from "@/api/types";

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

const INVENTORY_QUERY_KEY = ["inventory", "products"];

export function useInventory(companyId: string | null) {
  const queryClient = useQueryClient();

  const useGetProducts = () => {
    return useQuery({
      queryKey: [...INVENTORY_QUERY_KEY, companyId],
      queryFn: () =>
        companyId ? productsApi.getProductsByCompanyId(companyId) : Promise.resolve([]),
      enabled: !!companyId,
      staleTime: 1000 * 60 * 5,
    });
  };

  const useGetAllProducts = () => {
    return useQuery({
      queryKey: [...INVENTORY_QUERY_KEY, "all"],
      queryFn: () => productsApi.getAllProducts(),
      staleTime: 1000 * 60 * 5,
    });
  };

  const useGetProduct = (productId: string | null) => {
    return useQuery({
      queryKey: [...INVENTORY_QUERY_KEY, "detail", productId],
      queryFn: () => (productId ? productsApi.getProductById(productId) : null),
      enabled: !!productId,
      staleTime: 1000 * 60 * 5,
    });
  };

  const useCreateProduct = () => {
    return useMutation({
      mutationFn: (body: CreateProductDTO) => productsApi.createProduct(body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: INVENTORY_QUERY_KEY });
      },
    });
  };

  const useUpdateProduct = () => {
    return useMutation({
      mutationFn: ({
        productId,
        body,
      }: {
        productId: string;
        body: UpdateProductDTO;
      }) => productsApi.updateProduct(productId, body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: INVENTORY_QUERY_KEY });
      },
    });
  };

  const useDeleteProduct = () => {
    return useMutation({
      mutationFn: (productId: string) => productsApi.deleteProduct(productId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: INVENTORY_QUERY_KEY });
      },
    });
  };

  const useDownloadProductsExcel = () => {
    return useMutation({
      mutationFn: async () => {
        if (!companyId) throw new Error("No company ID");
        const blob = await productsApi.exportProductsExcel(companyId);
        downloadBlob(blob, `productos_${companyId}.xlsx`);
      },
    });
  };

  return {
    useGetProducts,
    useGetAllProducts,
    useGetProduct,
    useCreateProduct,
    useUpdateProduct,
    useDeleteProduct,
    useDownloadProductsExcel,
  };
}
