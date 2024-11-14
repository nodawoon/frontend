import { clientInstance } from "@/libs/http-client";

export const getMyChatRoom = async (page: number) => {
  return await clientInstance
    .get<ApiResponseType<ChatRoomResponse>>(`/chatbots/chat-room`, { params: { page: page } })
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};