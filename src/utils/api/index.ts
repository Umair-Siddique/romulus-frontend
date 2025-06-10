import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// Create optimized axios instance
export const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  withCredentials: true, // Sends cookies automatically
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

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Auto logout on 401
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // window.location.href = "/login";
    }

    // Log errors in development
    if (process.env.NODE_ENV === "development") {
      console.error("API Error:", error.response?.data);
    }

    return Promise.reject(error);
  }
);

/*

  Basic usage
  import apiClient, { apiUtils } from './api/client';

  GET with caching
  const userData = await apiUtils.get('/users/profile', { cache: true });

  POST with automatic retry
  const result = await apiUtils.post('/users', userData);

  File upload with progress
    await apiUtils.upload('/files', formData, (progress) => {
  });

*/
