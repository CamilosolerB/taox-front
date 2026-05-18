import { waterApi } from "@/api/waterApi";

export interface UploadLogoResponse {
  message: string;
  url: string;
}

/** POST /uploads/logo */
export async function uploadLogo(file: File): Promise<UploadLogoResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await waterApi.post<UploadLogoResponse>("/uploads/logo", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}
