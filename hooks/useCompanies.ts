"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as companiesApi from "@/api/endpoints/companies";
import type { CreateCompanyDTO, UpdateCompanyDTO } from "@/api/types";

const COMPANIES_QUERY_KEY = ["companies"];

export function useCompanies() {
  const queryClient = useQueryClient();

  const useGetCompanies = () => {
    return useQuery({
      queryKey: COMPANIES_QUERY_KEY,
      queryFn: () => companiesApi.getCompanies(),
      staleTime: 1000 * 60 * 5,
    });
  };

  const useGetCompany = (companyId: string | null) => {
    return useQuery({
      queryKey: [...COMPANIES_QUERY_KEY, companyId],
      queryFn: () => (companyId ? companiesApi.getCompanyById(companyId) : null),
      enabled: !!companyId,
      staleTime: 1000 * 60 * 5,
    });
  };

  const useCreateCompany = () => {
    return useMutation({
      mutationFn: (body: CreateCompanyDTO) => companiesApi.createCompany(body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: COMPANIES_QUERY_KEY });
      },
    });
  };

  const useUpdateCompany = () => {
    return useMutation({
      mutationFn: ({
        companyId,
        body,
      }: {
        companyId: string;
        body: UpdateCompanyDTO;
      }) => companiesApi.updateCompany(companyId, body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: COMPANIES_QUERY_KEY });
      },
    });
  };

  const useDeleteCompany = () => {
    return useMutation({
      mutationFn: (companyId: string) => companiesApi.deleteCompany(companyId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: COMPANIES_QUERY_KEY });
      },
    });
  };

  return {
    useGetCompanies,
    useGetCompany,
    useCreateCompany,
    useUpdateCompany,
    useDeleteCompany,
  };
}
