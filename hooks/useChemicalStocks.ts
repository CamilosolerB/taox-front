"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as stocksApi from "@/api/endpoints/stocks";
import type {
  ChemicalStockResponseDTO,
  ChemicalStockCreateDTO,
  ChemicalStockUpdateDTO,
} from "@/interfaces/types";

const CHEMICAL_STOCKS_QUERY_KEY = ["chemical-stocks"];

export function useChemicalStocks(companyId: string | null) {
  const queryClient = useQueryClient();

  const useGetAllStocks = () => {
    return useQuery({
      queryKey: [...CHEMICAL_STOCKS_QUERY_KEY, "all", companyId],
      queryFn: () =>
        companyId ? stocksApi.getAllStocks(companyId) : Promise.resolve([]),
      enabled: !!companyId,
      staleTime: 1000 * 60 * 2,
    });
  };

  const useGetCriticalStocks = () => {
    return useQuery({
      queryKey: [...CHEMICAL_STOCKS_QUERY_KEY, "critical", companyId],
      queryFn: () =>
        companyId ? stocksApi.getCriticalStocks(companyId) : Promise.resolve([]),
      enabled: !!companyId,
      staleTime: 1000 * 30, // 30 sec - critical stocks need frequent updates
    });
  };

  const useGetStockById = (stockId: number | null) => {
    return useQuery({
      queryKey: [...CHEMICAL_STOCKS_QUERY_KEY, "detail", stockId, companyId],
      queryFn: () =>
        stockId && companyId
          ? stocksApi.getStockById(stockId, companyId)
          : null,
      enabled: !!stockId && !!companyId,
      staleTime: 1000 * 60 * 5,
    });
  };

  const useCreateStock = () => {
    return useMutation({
      mutationFn: (body: ChemicalStockCreateDTO) =>
        stocksApi.createStock(body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: CHEMICAL_STOCKS_QUERY_KEY });
      },
    });
  };

  const useUpdateStock = () => {
    return useMutation({
      mutationFn: ({
        stockId,
        body,
      }: {
        stockId: number;
        body: ChemicalStockUpdateDTO;
      }) => stocksApi.updateStock(stockId, body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: CHEMICAL_STOCKS_QUERY_KEY });
      },
    });
  };

  const useDeleteStock = () => {
    return useMutation({
      mutationFn: ({ stockId }: { stockId: number }) =>
        companyId
          ? stocksApi.deleteStock(stockId, companyId)
          : Promise.reject(),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: CHEMICAL_STOCKS_QUERY_KEY });
      },
    });
  };

  return {
    useGetAllStocks,
    useGetCriticalStocks,
    useGetStockById,
    useCreateStock,
    useUpdateStock,
    useDeleteStock,
  };
}
