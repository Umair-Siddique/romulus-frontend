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

// Request interceptor - add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("romulus-auth");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});