import { fileUploadInstance } from "@/libs/http-client";

interface ImageResponse {
  url: string;
}

export const createImage = async (formData: FormData) => {
  return await fileUploadInstance
    .post<ApiResponseType<ImageResponse>>("/file/image", formData)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};
