"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as warehousesApi from "@/api/endpoints/warehouses";
import type { WarehouseResponseDTO } from "@/api/endpoints/warehouses";

const WAREHOUSES_QUERY_KEY = ["warehouses"];

export function useWarehouses(companyId: string | null) {
  const queryClient = useQueryClient();

  const useGetAllWarehouses = () => {
    return useQuery({
      queryKey: [...WAREHOUSES_QUERY_KEY, "all", companyId],
      queryFn: () =>
        companyId ? warehousesApi.getAllWarehouses(companyId) : Promise.resolve([]),
      enabled: !!companyId,
      staleTime: 1000 * 60 * 5,
    });
  };

  const useGetWarehouseById = (warehouseId: string | null) => {
    return useQuery({
      queryKey: [...WAREHOUSES_QUERY_KEY, "detail", warehouseId],
      queryFn: () =>
        warehouseId ? warehousesApi.getWarehouseById(warehouseId) : Promise.resolve(null),
      enabled: !!warehouseId,
    });
  };

  const useCreateWarehouse = () => {
    return useMutation({
      mutationFn: (body: { nombre: string; descripcion?: string }) =>
        warehousesApi.createWarehouse(body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: WAREHOUSES_QUERY_KEY });
      },
    });
  };

  const useUpdateWarehouse = () => {
    return useMutation({
      mutationFn: ({
        warehouseId,
        body,
      }: {
        warehouseId: string;
        body: { nombre?: string; descripcion?: string };
      }) => warehousesApi.updateWarehouse(warehouseId, body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: WAREHOUSES_QUERY_KEY });
      },
    });
  };

  const useDeleteWarehouse = () => {
    return useMutation({
      mutationFn: (warehouseId: string) => warehousesApi.deleteWarehouse(warehouseId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: WAREHOUSES_QUERY_KEY });
      },
    });
  };

  return {
    useGetAllWarehouses,
    useGetWarehouseById,
    useCreateWarehouse,
    useUpdateWarehouse,
    useDeleteWarehouse,
  };
}