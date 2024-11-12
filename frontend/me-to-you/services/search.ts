import { clientInstance } from "@/libs/http-client";

interface User {
  nickname: string;
}

interface UserId {
  shareUrl: string;
}

export const getUserNickname = async (keyword: string) => {
  return await clientInstance
    .get<ApiResponseType<User[]>>(`/users/search-nickname/${keyword}`)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const getUserId = async (nickname: string) => {
  return await clientInstance
    .get<ApiResponseType<UserId>>(`/users/return-uuid/${nickname}`)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};
