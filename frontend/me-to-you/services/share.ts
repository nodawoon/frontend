import { clientInstance } from "@/libs/http-client";
import { ShareUrl } from "@/types/common";

export const getShareUrl = async () => {
  return await clientInstance
    .get<ApiResponseType<ShareUrl>>("/users/share-url")
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
};

export const createSurveyResponse = async (surveyResponse: SurveyResponseState) => {
  return await clientInstance
    .post<ApiResponseType<SurveyResponseState>>("/survey-responses", surveyResponse)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};
