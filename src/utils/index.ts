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
    case "declined":
      return { color: "#c62828", backgroundColor: "#ffebee" }; // dark red
    case "hired":
      return { color: "#2e7d32", backgroundColor: "#e8f5e9" }; // dark green
    case "rejected":
      return { color: "#c62828", backgroundColor: "#ffebee" }; // dark red
    case "active":
      return { color: "#2e7d32", backgroundColor: "#e8f5e9" }; // dark green
    case "inactive":
      return { color: "#c62828", backgroundColor: "#ffebee" }; // dark red
    default:
      return { color: "#1565c0", backgroundColor: "#e3f2fd" }; // dark blue
  }
};

const formatTime = (time: string): string => {
  const [hourStr, minuteStr] = time.trim().split(":");
  let hour = parseInt(hourStr, 10);
  const minute = minuteStr || "00";

  const ampm = hour >= 12 ? "pm" : "am";
  hour = hour % 12 || 12; // converts 0 -> 12, 13 -> 1, etc.

  return `${hour.toString().padStart(2, "0")}:${minute} ${ampm}`;
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

const getElapsedTime = (givenAt: string) => {
  const now = new Date();
  const givenDate = new Date(givenAt);

  const years = now.getFullYear() - givenDate.getFullYear();
  const months = now.getMonth() - givenDate.getMonth();
  const days = now.getDate() - givenDate.getDate();

  if (years > 1 || (years === 1 && (months > 0 || days > 0))) {
    return `${years} years ago`;
  }
  if (years === 1) return "1 year ago";

  const totalMonths =
    (now.getFullYear() - givenDate.getFullYear()) * 12 +
    (now.getMonth() - givenDate.getMonth());
  if (totalMonths >= 1) return `${totalMonths} months ago`;

  const diffInMs = now.getTime() - givenDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  if (diffInDays >= 1) return `${diffInDays} days ago`;

  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  if (diffInHours >= 1) return `${diffInHours} hours ago`;

  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  if (diffInMinutes >= 1) return `${diffInMinutes} minutes ago`;

  return "just now";
};

const handleDownload = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

export {
  requestAPI,
  getStatusColor,
  formatTime,
  formatDate,
  getElapsedTime,
  handleDownload,
};
