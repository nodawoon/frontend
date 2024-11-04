import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const fetchShareUrl = async () => {
  const responseUrl = await axios.get(`${API_URL}/users/share-url`, {
    withCredentials: true,
  });
  return responseUrl.data.data.shareUrl;
};
