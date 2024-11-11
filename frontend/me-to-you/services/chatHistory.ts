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

export const getChatHistory = async () => {
  return await clientInstance
    .get<ApiResponseType<chatHistoryProps>>("/self-survey/list")
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};
