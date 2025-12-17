import axios from "axios";
import useAuthStore from "../store/useAuthStore";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((config) => {
  const { tokens } = useAuthStore.getState();
  if (tokens?.access) {
    config.headers.Authorization = `Bearer ${tokens.access}`;
  }
  return config;
});

export default API;
