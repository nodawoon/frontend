import { clientInstance } from "@/libs/http-client";

export const getChatState = async () => {
  return await clientInstance
    .get<ApiResponseType<{ exist: boolean }>>("/self-survey/exists")
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

// 프롬프트 추가
export const updateChatbots = async (params: { chatBotId: number }) => {
  return await clientInstance
    .patch(`/chatbots/${params.chatBotId}/prompt/add`)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

// 사용자 응답 추가
export const updateResponse = async (chatBotId: number, params: { answer: string }) => {
  return await clientInstance
    .patch(`/chatbots/${chatBotId}/response`, { params: params })
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};
