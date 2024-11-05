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
    .post<ApiResponseType<UserResponse>>("/users/signup", user)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const getUser = async () => {
  return await clientInstance
    .get<ApiResponseType<UserResponse>>("/users")
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const deleteUser = async () => {
  return await clientInstance
    .delete("/users")
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};
