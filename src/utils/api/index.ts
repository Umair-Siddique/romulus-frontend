import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// Create optimized axios instance
export const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add auth accessToken
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("romulus-auth");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
