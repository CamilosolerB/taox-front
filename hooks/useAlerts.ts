"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as alertsApi from "@/api/endpoints/alerts";
import type { StockAlertResponseDTO, StockAlertCreateDTO, StockAlertUpdateDTO } from "@/interfaces/types";

const ALERTS_QUERY_KEY = ["alerts"];

export function useAlerts(companyId: string | null) {
  const queryClient = useQueryClient();

  const useGetAllAlerts = () => {
    return useQuery({
      queryKey: [...ALERTS_QUERY_KEY, "all", companyId],
      queryFn: () =>
        companyId ? alertsApi.getAllAlerts(companyId) : Promise.resolve([]),
      enabled: !!companyId,
      staleTime: 1000 * 60 * 1, // 1 min - alerts should be fresh
    });
  };

  const useGetActiveAlerts = () => {
    return useQuery({
      queryKey: [...ALERTS_QUERY_KEY, "active", companyId],
      queryFn: () =>
        companyId ? alertsApi.getActiveAlerts(companyId) : Promise.resolve([]),
      enabled: !!companyId,
      staleTime: 1000 * 30, // 30 sec - more frequent updates for active alerts
    });
  };

  const useGetAlertById = (alertId: number | null) => {
    return useQuery({
      queryKey: [...ALERTS_QUERY_KEY, "detail", alertId, companyId],
      queryFn: () =>
        alertId && companyId
          ? alertsApi.getAlertById(alertId, companyId)
          : null,
      enabled: !!alertId && !!companyId,
      staleTime: 1000 * 60 * 5,
    });
  };

  const useCreateAlert = () => {
    return useMutation({
      mutationFn: (body: StockAlertCreateDTO) => alertsApi.createAlert(body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ALERTS_QUERY_KEY });
      },
    });
  };

  const useUpdateAlert = () => {
    return useMutation({
      mutationFn: ({
        alertId,
        body,
      }: {
        alertId: number;
        body: StockAlertUpdateDTO;
      }) => alertsApi.updateAlert(alertId, body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ALERTS_QUERY_KEY });
      },
    });
  };

  const useResolveAlert = () => {
    return useMutation({
      mutationFn: (alertId: number) => alertsApi.resolveAlert(alertId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ALERTS_QUERY_KEY });
      },
    });
  };

  const useDeleteAlert = () => {
    return useMutation({
      mutationFn: ({ alertId }: { alertId: number }) =>
        companyId ? alertsApi.deleteAlert(alertId, companyId) : Promise.reject(),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ALERTS_QUERY_KEY });
      },
    });
  };

  return {
    useGetAllAlerts,
    useGetActiveAlerts,
    useGetAlertById,
    useCreateAlert,
    useUpdateAlert,
    useResolveAlert,
    useDeleteAlert,
  };
}
