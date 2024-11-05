import { clientInstance } from "@/libs/http-client";

export const getSocialLogin = async (oauthServerType: string, code: string) => {
  return await clientInstance
    .get<ApiResponseType<LoginResponse>>(`/oauth/login/${oauthServerType}`, {
      params: { code: code },
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};
