import { clientInstance } from "@/libs/http-client";

export const getFirstPercent = async () => {
  return await clientInstance
    .get("/survey-results/percent1")
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

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

export const getTimePercent = async () => {
  return await clientInstance
    .get("/survey-results/percent5")
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};
