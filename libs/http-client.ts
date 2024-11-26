import axios from "axios";

const createAxiosInstance = (config = {}) => {
  const defaultConfig = {
    baseURL: process.env.NEXT_PUBLIC_REST_API_URL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    withCredentials: true,
  };

  return axios.create({ ...defaultConfig, ...config });
};

const createFileUploadInstance = (config = {}) => {
  const defaultConfig = {
    baseURL: process.env.NEXT_PUBLIC_REST_API_URL,
    timeout: 5000,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  };

  return axios.create({ ...defaultConfig, ...config });
};

export const clientInstance = createAxiosInstance();
export const fileUploadInstance = createFileUploadInstance();
