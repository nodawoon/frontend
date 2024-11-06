import { clientInstance } from "@/libs/http-client";

export const getKeywordCount = async () => {
  return await clientInstance
    .get("/survey-results/count")
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};
