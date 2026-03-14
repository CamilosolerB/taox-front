import { waterApi } from "@/api/waterApi";
import type {
  StockLocationDTO,
  StockLocationCreateDTO,
  StockLocationUpdateDTO,
  StockWarehouseDTO,
  StockWarehouseCreateDTO,
} from "@/api/types";

/** GET /stock-locations?company_id= */
export async function getStockLocations(companyId: string): Promise<StockLocationDTO[]> {
  const { data } = await waterApi.get<StockLocationDTO[]>("/stock-locations", {
    params: { company_id: companyId },
  });
  return data;
}

/** POST /stock-locations */
export async function createStockLocation(
  body: StockLocationCreateDTO
): Promise<StockLocationDTO> {
  const { data } = await waterApi.post<StockLocationDTO>("/stock-locations", body);
  return data;
}

/** GET /stock-locations/{location_id}/{product_code}?company_id= */
export async function getStockByLocationProduct(
  locationId: number,
  productCode: string,
  companyId: string
): Promise<StockLocationDTO> {
  const { data } = await waterApi.get<StockLocationDTO>(
    `/stock-locations/${locationId}/${productCode}`,
    { params: { company_id: companyId } }
  );
  return data;
}

/** PUT /stock-locations/{location_id}/{product_code} */
export async function updateStockLocation(
  locationId: number,
  productCode: string,
  body: StockLocationUpdateDTO
): Promise<StockLocationDTO> {
  const { data } = await waterApi.put<StockLocationDTO>(
    `/stock-locations/${locationId}/${productCode}`,
    body
  );
  return data;
}

/** DELETE /stock-locations/{location_id}/{product_code}?company_id= */
export async function deleteStockLocation(
  locationId: number,
  productCode: string,
  companyId: string
): Promise<void> {
  await waterApi.delete(
    `/stock-locations/${locationId}/${productCode}`,
    { params: { company_id: companyId } }
  );
}

/** GET /stock-warehouse?company_id= */
export async function getStockWarehouse(companyId: string): Promise<StockWarehouseDTO[]> {
  const { data } = await waterApi.get<StockWarehouseDTO[]>("/stock-warehouse", {
    params: { company_id: companyId },
  });
  return data;
}

/** POST /stock-warehouse */
export async function createStockWarehouse(
  body: StockWarehouseCreateDTO
): Promise<StockWarehouseDTO> {
  console.log(body);
  const { data } = await waterApi.post<StockWarehouseDTO>("/stock-warehouse", body);
  return data;
}

/** GET /stock-warehouse/{product_code}?company_id= */
export async function getStockWarehouseProduct(
  productCode: string,
  companyId: string
): Promise<StockWarehouseDTO> {
  const { data } = await waterApi.get<StockWarehouseDTO>(
    `/stock-warehouse/${productCode}`,
    { params: { company_id: companyId } }
  );
  return data;
}

/** POST /stock-warehouse/{product_code}/increment?quantity=&company_id= */
export async function incrementStockWarehouse(
  productCode: string,
  quantity: number,
  companyId: string
): Promise<void> {
  await waterApi.post(
    `/stock-warehouse/${productCode}/increment`,
    null,
    { params: { quantity, company_id: companyId } }
  );
}

/** POST /stock-warehouse/{product_code}/decrement?quantity=&company_id= */
export async function decrementStockWarehouse(
  productCode: string,
  quantity: number,
  companyId: string
): Promise<void> {
  await waterApi.post(
    `/stock-warehouse/${productCode}/decrement`,
    null,
    { params: { quantity, company_id: companyId } }
  );
}

/** DELETE /stock-warehouse/{product_code}?company_id= */
export async function deleteStockWarehouse(
  productCode: string,
  companyId: string
): Promise<void> {
  await waterApi.delete(`/stock-warehouse/${productCode}`, {
    params: { company_id: companyId },
  });
}
