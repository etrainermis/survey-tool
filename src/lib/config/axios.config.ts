import _ from "axios";

const baseUrl = import.meta.env.VITE_BASE_API_URL_DEV

  ? import.meta.env.VITE_BASE_API_URL_PROD

  : import.meta.env.VITE_BASE_API_URL;

console.log({ baseUrl });

const axios = _.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

export const api = _.create({
  baseURL: baseUrl,
});

export const AuthApi = _.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

export default axios;
