import _ from "axios";

const baseUrl =
  import.meta.env.BASE_API_URL ||
  "https://api-beta.tvetmanagement.rtbdev.online/ETrainerBackend/api/v1";

const axios = _.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const api = _.create({
  baseURL: baseUrl,
});

export const AuthApi = _.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default axios;
