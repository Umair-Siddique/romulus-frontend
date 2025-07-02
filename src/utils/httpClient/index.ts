import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

// Create optimized axios instance
export const httpClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add auth accessToken
httpClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("romulus-auth");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export const createHttpClient = (accessToken?: string | null) => {
  const instance = axios.create({
    baseURL,
  });

  instance.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  return instance;
};
