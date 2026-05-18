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

/** GET /products/by-company/{companyId}/export/excel */
export async function exportProductsExcel(companyId: string): Promise<Blob> {
  const { data } = await waterApi.get<Blob>(`/products/by-company/${companyId}/export/excel`, {
    responseType: 'blob'
  });
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

/** GET /products/bulk-template — download blank xlsx template */
export async function downloadBulkTemplate(): Promise<Blob> {
  const { data } = await waterApi.get<Blob>("/products/bulk-template", {
    responseType: "blob",
  });
  return data;
}

/** POST /products/bulk-upload — upload xlsx for mass import */
export interface BulkUploadResult {
  message: string;
  created: number;
  total_rows: number;
  errors: { row: number; error: string }[];
}

export async function bulkUploadProducts(file: File): Promise<BulkUploadResult> {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await waterApi.post<BulkUploadResult>(
    "/products/bulk-upload",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data;
}

