import axios from "axios";
import { getToken } from "./auth.js";

// Esta instância será usada para fazer requisições ao backend.
// A URL do backend vem do arquivo .env (VITE_API_URL).
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
