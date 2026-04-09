import { waterApi } from "@/api/waterApi";
import type {
  LocationDTO,
  LocationCreateDTO,
  LocationUpdateDTO,
} from "@/api/types";

/** GET /locations?company_id= */
export async function getLocations(companyId: string): Promise<LocationDTO[]> {
  const { data } = await waterApi.get<LocationDTO[]>("/locations", {
    params: { company_id: companyId },
  });
  return data;
}

/** POST /locations */
export async function createLocation(body: LocationCreateDTO): Promise<LocationDTO> {
  const { data } = await waterApi.post<LocationDTO>("/locations", body);
  return data;
}

/** GET /locations/{location_id}?company_id= */
export async function getLocation(
  locationId: number,
  companyId: string
): Promise<LocationDTO> {
  const { data } = await waterApi.get<LocationDTO>(`/locations/${locationId}`, {
    params: { company_id: companyId },
  });
  return data;
}

/** PUT /locations/{location_id} */
export async function updateLocation(
  locationId: number,
  body: LocationUpdateDTO
): Promise<LocationDTO> {
  const { data } = await waterApi.put<LocationDTO>(`/locations/${locationId}`, body);
  return data;
}

/** DELETE /locations/{location_id}?company_id= */
export async function deleteLocation(
  locationId: number,
  companyId: string
): Promise<void> {
  await waterApi.delete(`/locations/${locationId}`, {
    params: { company_id: companyId },
  });
}
