"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as chemicalStockApi from "@/api/endpoints/chemicalStock";
import type { ChemicalStockCreateDTO, ChemicalStockUpdateDTO } from "@/api/endpoints/chemicalStock";

const CHEMICAL_STOCK_QUERY_KEY = ["chemicalStock"];

export function useChemicalStock(companyId: string | null) {
    const queryClient = useQueryClient();

    const useGetChemicalStocks = () => {
        return useQuery({
            queryKey: [...CHEMICAL_STOCK_QUERY_KEY, companyId],
            queryFn: () =>
                companyId ? chemicalStockApi.getChemicalStocks(companyId) : Promise.resolve([]),
            enabled: !!companyId,
            staleTime: 1000 * 60 * 5,
        });
    };

    const useCreateChemicalStock = () => {
        return useMutation({
            mutationFn: (body: ChemicalStockCreateDTO) => chemicalStockApi.createChemicalStock(body),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: CHEMICAL_STOCK_QUERY_KEY });
            },
        });
    };

    const useUpdateChemicalStock = () => {
        return useMutation({
            mutationFn: ({
                id_stock_quimico,
                body,
            }: {
                id_stock_quimico: number;
                body: ChemicalStockUpdateDTO;
            }) => chemicalStockApi.updateChemicalStock(id_stock_quimico, body),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: CHEMICAL_STOCK_QUERY_KEY });
            },
        });
    };

    const useDeleteChemicalStock = () => {
        return useMutation({
            mutationFn: (id_stock_quimico: number) =>
                companyId ? chemicalStockApi.deleteChemicalStock(id_stock_quimico, companyId) : Promise.resolve(),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: CHEMICAL_STOCK_QUERY_KEY });
            },
        });
    };

    return {
        useGetChemicalStocks,
        useCreateChemicalStock,
        useUpdateChemicalStock,
        useDeleteChemicalStock,
    };
}
