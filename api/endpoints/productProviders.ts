import { waterApi } from "@/api/waterApi";
import type {
  ProductProviderDTO,
  ProductProviderCreateDTO,
  ProductProviderUpdateDTO,
} from "@/api/types";

/** GET /product-providers */
export async function getProductProviders(): Promise<ProductProviderDTO[]> {
  const { data } = await waterApi.get<ProductProviderDTO[]>("/product-providers");
  return data;
}

/** POST /product-providers */
export async function createProductProvider(
  body: ProductProviderCreateDTO
): Promise<ProductProviderDTO> {
  const { data } = await waterApi.post<ProductProviderDTO>(
    "/product-providers",
    body
  );
  return data;
}

/** GET /product-providers/by-product/{product_code} */
export async function getProvidersByProduct(
  productCode: string
): Promise<ProductProviderDTO[]> {
  const { data } = await waterApi.get<ProductProviderDTO[]>(
    `/product-providers/by-product/${productCode}`
  );
  return data;
}

/** GET /product-providers/by-provider/{provider_id} */
export async function getProductsByProvider(
  providerId: string
): Promise<ProductProviderDTO[]> {
  const { data } = await waterApi.get<ProductProviderDTO[]>(
    `/product-providers/by-provider/${providerId}`
  );
  return data;
}

/** GET /product-providers/main/{product_code} */
export async function getMainProvider(
  productCode: string
): Promise<ProductProviderDTO> {
  const { data } = await waterApi.get<ProductProviderDTO>(
    `/product-providers/main/${productCode}`
  );
  return data;
}

/** PUT /product-providers/{product_code}/{provider_id} */
export async function updateProductProvider(
  productCode: string,
  providerId: string,
  body: ProductProviderUpdateDTO
): Promise<ProductProviderDTO> {
  const { data } = await waterApi.put<ProductProviderDTO>(
    `/product-providers/${productCode}/${providerId}`,
    body
  );
  return data;
}

/** DELETE /product-providers/{product_code}/{provider_id} */
export async function deleteProductProvider(
  productCode: string,
  providerId: string
): Promise<void> {
  await waterApi.delete(
    `/product-providers/${productCode}/${providerId}`
  );
}

/** POST /product-providers/{product_code}/{provider_id}/set-main */
export async function setMainProvider(
  productCode: string,
  providerId: string
): Promise<void> {
  await waterApi.post(
    `/product-providers/${productCode}/${providerId}/set-main`
  );
}
