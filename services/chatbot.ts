import { clientInstance } from "@/libs/http-client";

export const getAllConversations = async (targetUserId: number, page: number) => {
  return await clientInstance
    .get<ApiResponseType<ChatRoomResponse>>(`/chatbots/${targetUserId}`, {
      params: { page: page },
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const createQuestion = async (targetUserId: number, question: string) => {
  return await clientInstance
    .post<ApiResponseType<ChatbotResponse>>(`/chatbots/${targetUserId}`, { question: question })
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const updateRequest = async (chatbotId: number) => {
  return await clientInstance
    .patch<ApiResponseType<ChatbotResponse>>(`/chatbots/${chatbotId}/request`)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const deleteQuestion = async (chatbotId: number) => {
  return await clientInstance
    .delete(`/chatbots/${chatbotId}/question`)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const updateRequestToWait = async (chatbotId: number) => {
  return await clientInstance
    .patch(`/chatbots/${chatbotId}/wait`)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};
