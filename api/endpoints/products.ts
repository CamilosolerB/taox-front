import { waterApi } from "@/api/waterApi";
import type { ProductDTO, CreateProductDTO, UpdateProductDTO } from "@/api/types";

/** GET /products/ */
export async function getAllProducts(): Promise<ProductDTO[]> {
  const { data } = await waterApi.get<ProductDTO[]>("/products/");
  return data;
}

/** POST /products/ */
export async function createProduct(body: CreateProductDTO): Promise<ProductDTO> {
  const { data } = await waterApi.post<ProductDTO>("/products/", body);
  return data;
}

/** GET /products/by-id/{product_id} */
export async function getProductById(productId: string): Promise<ProductDTO> {
  const { data } = await waterApi.get<ProductDTO>(`/products/by-id/${productId}`);
  return data;
}

/** GET /products/by-company/{company_id} */
export async function getProductsByCompanyId(companyId: string): Promise<ProductDTO[]> {
  const { data } = await waterApi.get<ProductDTO[]>(`/products/by-company/${companyId}`);
  return data;
}

/** PUT /products/{product_id} */
export async function updateProduct(
  productId: string,
  body: UpdateProductDTO
): Promise<ProductDTO> {
  const { data } = await waterApi.put<ProductDTO>(`/products/${productId}`, body);
  return data;
}

/** DELETE /products/{product_id} */
export async function deleteProduct(productId: string): Promise<void> {
  await waterApi.delete(`/products/${productId}`);
}
