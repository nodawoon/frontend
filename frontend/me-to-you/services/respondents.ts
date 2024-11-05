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
