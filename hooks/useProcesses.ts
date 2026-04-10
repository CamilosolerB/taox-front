"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as processesApi from "@/api/endpoints/processes";
import type {
  ProcessResponseDTO,
  ProcessCreateDTO,
  ProcessUpdateDTO,
} from "@/interfaces/types";

const PROCESSES_QUERY_KEY = ["processes"];

export function useProcesses(companyId: string | null) {
  const queryClient = useQueryClient();

  const useGetAllProcesses = () => {
    return useQuery({
      queryKey: [...PROCESSES_QUERY_KEY, "all", companyId],
      queryFn: () =>
        companyId ? processesApi.getAllProcesses(companyId) : Promise.resolve([]),
      enabled: !!companyId,
      staleTime: 1000 * 60 * 5,
    });
  };

  const useGetProcessById = (processId: string | null) => {
    return useQuery({
      queryKey: [...PROCESSES_QUERY_KEY, "detail", processId, companyId],
      queryFn: () =>
        processId && companyId
          ? processesApi.getProcessById(processId, companyId)
          : null,
      enabled: !!processId && !!companyId,
      staleTime: 1000 * 60 * 5,
    });
  };

  const useCreateProcess = () => {
    return useMutation({
      mutationFn: (body: ProcessCreateDTO) =>
        processesApi.createProcess(body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: PROCESSES_QUERY_KEY });
      },
    });
  };

  const useUpdateProcess = () => {
    return useMutation({
      mutationFn: ({
        processId,
        body,
      }: {
        processId: string;
        body: ProcessUpdateDTO;
      }) => processesApi.updateProcess(processId, body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: PROCESSES_QUERY_KEY });
      },
    });
  };

  const useDeleteProcess = () => {
    return useMutation({
      mutationFn: ({ processId }: { processId: string }) =>
        companyId
          ? processesApi.deleteProcess(processId, companyId)
          : Promise.reject(),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: PROCESSES_QUERY_KEY });
      },
    });
  };

  return {
    useGetAllProcesses,
    useGetProcessById,
    useCreateProcess,
    useUpdateProcess,
    useDeleteProcess,
  };
}
