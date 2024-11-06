import { clientInstance } from "@/libs/http-client";

export const getRespondentList = async () => {
  return await clientInstance
    .get<ApiResponseType<RespondentState>>("/survey-results/respondent-list")
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const getRespondentQuestionList = async (param: string | string[]) => {
  return await clientInstance
    .get<ApiResponseType<RespondentQuestionState>>("/survey-results/question-id/" + param)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const getRespondentDetail = async (param: string | string[]) => {
  return await clientInstance
    .get<ApiResponseType<RespondentDetailState>>("/survey-results/" + param)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};
