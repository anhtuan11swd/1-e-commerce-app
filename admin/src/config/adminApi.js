import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const adminApi = axios.create({
  baseURL: `${backendURL}/api/v1`,
});

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.token = token;
  }
  return config;
});

export { backendURL };
export default adminApi;
