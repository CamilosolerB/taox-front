"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  createMovement as createMovementApi, 
  getAllMovements 
} from "@/api/endpoints/movements";
import { ProductMovementCreateDTO, ProductMovementResponseDTO } from "@/interfaces/types";

/**
 * Movimientos: la TAOX API actual no expone endpoints de movimientos.
 * Este hook deja la estructura lista para cuando existan (ej. GET/POST /movements).
 * Mientras tanto las páginas pueden seguir usando data mock (movementsData).
 */
const MOVEMENTS_QUERY_KEY = ["movements"];

export function useMovements(_companyId: string | null) {
  const queryClient = useQueryClient();

  const useGetMovements = () => {
    return useQuery({
      queryKey: [...MOVEMENTS_QUERY_KEY, "list", _companyId],
      queryFn: async () => {
        if (!_companyId) return { data: [] as ProductMovementResponseDTO[], total: 0 };
        const data = await getAllMovements(_companyId);
        return { data, total: data.length };
      },
      enabled: !!_companyId,
      staleTime: 1000 * 60 * 2,
    });
  };

  const useGetMovementsByProduct = (_codigo: string) => {
    return useQuery({
      queryKey: [...MOVEMENTS_QUERY_KEY, "product", _codigo],
      queryFn: async () => [],
      enabled: false,
      staleTime: 1000 * 60 * 2,
    });
  };

  const useGetMovementsByLocation = (_ubicacion: string) => {
    return useQuery({
      queryKey: [...MOVEMENTS_QUERY_KEY, "location", _ubicacion],
      queryFn: async () => [],
      enabled: false,
      staleTime: 1000 * 60 * 2,
    });
  };

  const useCreateMovement = () => {
    return useMutation({
      mutationFn: async (body: ProductMovementCreateDTO) => {
        return await createMovementApi(body);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: MOVEMENTS_QUERY_KEY });
      },
    });
  };

  const useUpdateMovement = () => {
    return useMutation({
      mutationFn: async (_: { id: string; movement: unknown }) => {
        throw new Error("API de movimientos no disponible");
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: MOVEMENTS_QUERY_KEY });
      },
    });
  };

  const useDeleteMovement = () => {
    return useMutation({
      mutationFn: async (_id: string) => {
        throw new Error("API de movimientos no disponible");
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: MOVEMENTS_QUERY_KEY });
      },
    });
  };

  return {
    useGetMovements,
    useGetMovementsByProduct,
    useGetMovementsByLocation,
    useCreateMovement,
    useUpdateMovement,
    useDeleteMovement,
  };
}
