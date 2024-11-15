import { clientInstance } from "@/libs/http-client";

export const getMyChatRoom = async (page: number) => {
  return await clientInstance
    .get<ApiResponseType<MyChatResponse>>(`/chatbots/chat-room`, { params: { page: page } })
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const patchIsNewStatus = async (chatBotId: number) => {
  return await clientInstance
    .patch(`/chatbots/${chatBotId}/status`)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};
