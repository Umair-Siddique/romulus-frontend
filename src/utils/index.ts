import axios, { AxiosRequestConfig, Method } from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

// Create optimized axios instance
const httpClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add auth accessToken
httpClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("romulus-access-token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

const requestAPI = <T = any>(
  method: Method,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) => {
  return httpClient.request<T>({
    method,
    url,
    data,
    ...config,
  });
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "ongoing":
      return { color: "#ef6c00", backgroundColor: "#fff3e0" }; // dark orange
    case "pending":
      return { color: "#f9a825", backgroundColor: "#fff8e1" }; // amber/dark yellow
    case "completed":
      return { color: "#2e7d32", backgroundColor: "#e8f5e9" }; // dark green
    case "cancelled":
    case "rejected":
      return { color: "#c62828", backgroundColor: "#ffebee" }; // dark red
    default:
      return { color: "#1565c0", backgroundColor: "#e3f2fd" }; // dark blue
  }
};

const formatTime = (time: string) => {
  return new Date(`1970-01-01T${time}Z`)
    .toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace("AM", "am")
    .replace("PM", "pm");
};

const formatDate = (dateISO: string) => {
  const date = new Date(dateISO);
  const parts = date
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .split(" ");

  const formattedDate = `${parts[0]} ${parts[1]}, ${parts[2]}`;
  return formattedDate;
};

export { requestAPI, getStatusColor, formatTime, formatDate };
