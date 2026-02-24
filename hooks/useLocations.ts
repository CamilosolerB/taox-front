"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as locationsApi from "@/api/endpoints/locations";
import type {
  LocationDTO,
  LocationCreateDTO,
  LocationUpdateDTO,
} from "@/api/types";

const LOCATIONS_QUERY_KEY = ["locations"];

export function useLocations(companyId: string | null) {
  const queryClient = useQueryClient();

  const useGetLocations = () => {
    return useQuery({
      queryKey: [...LOCATIONS_QUERY_KEY, companyId],
      queryFn: () =>
        companyId ? locationsApi.getLocations(companyId) : Promise.resolve([]),
      enabled: !!companyId,
      staleTime: 1000 * 60 * 5,
    });
  };

  const useGetLocation = (locationId: number | null) => {
    return useQuery({
      queryKey: [...LOCATIONS_QUERY_KEY, "detail", locationId, companyId],
      queryFn: () =>
        companyId && locationId != null
          ? locationsApi.getLocation(locationId, companyId)
          : null,
      enabled: !!companyId && locationId != null,
      staleTime: 1000 * 60 * 5,
    });
  };

  const useCreateLocation = () => {
    return useMutation({
      mutationFn: (body: LocationCreateDTO) => locationsApi.createLocation(body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: LOCATIONS_QUERY_KEY });
      },
    });
  };

  const useUpdateLocation = () => {
    return useMutation({
      mutationFn: ({
        locationId,
        body,
      }: {
        locationId: number;
        body: LocationUpdateDTO;
      }) => locationsApi.updateLocation(locationId, body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: LOCATIONS_QUERY_KEY });
      },
    });
  };

  const useDeleteLocation = () => {
    return useMutation({
      mutationFn: ({
        locationId,
        companyId: cid,
      }: {
        locationId: number;
        companyId: string;
      }) => locationsApi.deleteLocation(locationId, cid),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: LOCATIONS_QUERY_KEY });
      },
    });
  };

  return {
    useGetLocations,
    useGetLocation,
    useCreateLocation,
    useUpdateLocation,
    useDeleteLocation,
  };
}
