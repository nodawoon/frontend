import { clientInstance } from "@/libs/http-client";

export const getChatState = async () => {
  return await clientInstance
    .get<ApiResponseType<chatState>>("/self-survey/exists")
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const getChatHistory = async (params: { status: string; page: number }) => {
  return await clientInstance
    .get<ApiResponseType<chatHistoryProps>>("/chatbots", { params: params })
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};
