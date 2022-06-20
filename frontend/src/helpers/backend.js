import axios from "axios";

const axiosApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const rawToken = JSON.parse(localStorage.getItem("user"))?.token;
axiosApi.defaults.headers.common["Authorization"] = rawToken
  ? `Bearer ${rawToken}`
  : "";

const refreshToken = (axios) => {
  const rawToken = JSON.parse(localStorage.getItem("user"))?.token;
  axios.defaults.headers.common["Authorization"] = rawToken
    ? `Bearer ${rawToken}`
    : "";
};

export const post = async (url, body) => {
  refreshToken(axiosApi);
  const response = await axiosApi.post(url, { ...body });
  return response.data.user;
};

export const get = async (url) => {
  refreshToken(axiosApi);
  const response = await axiosApi.get(url);
  return response.data.result;
};
