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
  switch (status.toLowerCase()) {
    case "ongoing":
    case "open":
      return { color: "#E65100", backgroundColor: "#FFF3E0" }; // Orange 800 / Orange 50
    case "pending":
      return { color: "#F9A825", backgroundColor: "#FFFDE7" }; // Amber 800 / Amber 50
    case "completed":
    case "hired":
    case "active":
    case "resolved":
      return { color: "#2E7D32", backgroundColor: "#E8F5E9" }; // Green 800 / Green 50
    case "declined":
    case "rejected":
    case "inactive":
    case "dismissed":
      return { color: "#C62828", backgroundColor: "#FFEBEE" }; // Red 800 / Red 50
    default:
      return { color: "#1565C0", backgroundColor: "#E3F2FD" }; // Blue 800 / Blue 50
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

const truncateWithEllipsis = (text: string, limit = 20) => {
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
};

export {
  requestAPI,
  getStatusColor,
  formatTime,
  formatDate,
  getElapsedTime,
  handleDownload,
  truncateWithEllipsis,
};
