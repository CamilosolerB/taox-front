"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as stockApi from "@/api/endpoints/stock";
import type {
  StockLocationCreateDTO,
  StockLocationUpdateDTO,
  StockWarehouseCreateDTO,
} from "@/api/types";

const STOCK_QUERY_KEY = ["stock"];

export function useStock(companyId: string | null) {
  const queryClient = useQueryClient();

  const useGetStockLocations = () => {
    return useQuery({
      queryKey: [...STOCK_QUERY_KEY, "locations", companyId],
      queryFn: () =>
        companyId ? stockApi.getStockLocations(companyId) : Promise.resolve([]),
      enabled: !!companyId,
      staleTime: 1000 * 60 * 2,
    });
  };

  const useGetStockWarehouse = () => {
    return useQuery({
      queryKey: [...STOCK_QUERY_KEY, "warehouse", companyId],
      queryFn: () =>
        companyId ? stockApi.getStockWarehouse(companyId) : Promise.resolve([]),
      enabled: !!companyId,
      staleTime: 1000 * 60 * 2,
    });
  };

  const useCreateStockLocation = () => {
    return useMutation({
      mutationFn: (body: StockLocationCreateDTO) =>
        stockApi.createStockLocation(body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: STOCK_QUERY_KEY });
      },
    });
  };

  const useUpdateStockLocation = () => {
    return useMutation({
      mutationFn: ({
        locationId,
        productCode,
        body,
      }: {
        locationId: number;
        productCode: string;
        body: StockLocationUpdateDTO;
      }) =>
        stockApi.updateStockLocation(locationId, productCode, body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: STOCK_QUERY_KEY });
      },
    });
  };

  const useCreateStockWarehouse = () => {
    return useMutation({
      mutationFn: (body: StockWarehouseCreateDTO) =>
        stockApi.createStockWarehouse(body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: STOCK_QUERY_KEY });
      },
    });
  };

  const useIncrementStockWarehouse = () => {
    return useMutation({
      mutationFn: ({
        productCode,
        quantity,
        companyId: cid,
      }: {
        productCode: string;
        quantity: number;
        companyId: string;
      }) => stockApi.incrementStockWarehouse(productCode, quantity, cid),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: STOCK_QUERY_KEY });
      },
    });
  };

  const useDecrementStockWarehouse = () => {
    return useMutation({
      mutationFn: ({
        productCode,
        quantity,
        companyId: cid,
      }: {
        productCode: string;
        quantity: number;
        companyId: string;
      }) => stockApi.decrementStockWarehouse(productCode, quantity, cid),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: STOCK_QUERY_KEY });
      },
    });
  };

  return {
    useGetStockLocations,
    useGetStockWarehouse,
    useCreateStockLocation,
    useUpdateStockLocation,
    useCreateStockWarehouse,
    useIncrementStockWarehouse,
    useDecrementStockWarehouse,
  };
}
