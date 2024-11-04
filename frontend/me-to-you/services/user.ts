import { clientInstance } from "@/libs/http-client";

export const getCheckNickname = async (nickname: string) => {
  return await clientInstance
    .get<ApiResponseType<CheckNicknameResponse>>("/users/check-nickname", {
      params: nickname,
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const createUser = async (user: SignupRequest) => {
  return await clientInstance
    .post<ApiResponseType<SignupResponse>>("/users/signup", user)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};
