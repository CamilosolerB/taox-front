import { waterApi } from "@/api/waterApi";
import type { CompanyDTO, CreateCompanyDTO, UpdateCompanyDTO } from "@/api/types";

/** GET /companies/ */
export async function getCompanies(): Promise<CompanyDTO[]> {
  const { data } = await waterApi.get<CompanyDTO[]>("/companies/");
  return data;
}

/** POST /companies/ */
export async function createCompany(body: CreateCompanyDTO): Promise<CompanyDTO> {
  const { data } = await waterApi.post<CompanyDTO>("/companies/", body);
  return data;
}

/** GET /companies/{company_id} */
export async function getCompanyById(companyId: string): Promise<CompanyDTO> {
  const { data } = await waterApi.get<CompanyDTO>(`/companies/${companyId}`);
  return data;
}

/** PUT /companies/{company_id} */
export async function updateCompany(
  companyId: string,
  body: UpdateCompanyDTO
): Promise<CompanyDTO> {
  const { data } = await waterApi.put<CompanyDTO>(`/companies/${companyId}`, body);
  return data;
}

/** DELETE /companies/{company_id} */
export async function deleteCompany(companyId: string): Promise<void> {
  await waterApi.delete(`/companies/${companyId}`);
}
