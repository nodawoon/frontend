import { clientInstance } from "@/libs/http-client";

export const createChatbotResponse = async (
  chatbotResponse: { question: string; response: string }[]
) => {
  return await clientInstance
    .post<ApiResponseType<ChatbotResponse>>("/self-survey", chatbotResponse)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};
