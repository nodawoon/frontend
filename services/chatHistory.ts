import { clientInstance } from "@/libs/http-client";

export const getChatState = async (userId: number) => {
  return await clientInstance
    .get<ApiResponseType<{ exist: boolean }>>(`/self-survey/exists/${userId}`)
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

// 프롬프트 제거
export const updateChatbotsRemove = async (params: { chatBotId: number }) => {
  return await clientInstance
    .patch(`/chatbots/${params.chatBotId}/prompt/remove`)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

// 사용자 응답 추가
export const updateResponse = async (chatBotId: number, param: { answer: string }) => {
  return await clientInstance
    .patch(`/chatbots/${chatBotId}/response`, param)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};
