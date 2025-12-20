import { io } from "socket.io-client";
import axios, { all, AxiosRequestConfig, Method } from "axios";

const rawBaseURL = import.meta.env.VITE_API_BASE_URL || "";
const baseURL = rawBaseURL.endsWith("/")
  ? `${rawBaseURL}api/v1`
  : `${rawBaseURL}/api/v1`;

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
    // Ongoing / Open
    case "ongoing":
    case "open":
    case "en cours": // French
    case "ouvert": // French
      return { color: "#E65100", backgroundColor: "#FFF3E0" }; // Orange 800 / Orange 50

    // Pending
    case "pending":
    case "en attente": // French
      return { color: "#F9A825", backgroundColor: "#FFFDE7" }; // Amber 800 / Amber 50

    // Completed / Hired / Active / Resolved
    case "completed":
    case "hired":
    case "active":
    case "resolved":
    case "terminé": // French
    case "embauché": // French
    case "actif": // French
    case "résolu": // French
      return { color: "#2E7D32", backgroundColor: "#E8F5E9" }; // Green 800 / Green 50

    // Declined / Rejected / Inactive / Dismissed
    case "declined":
    case "rejected":
    case "inactive":
    case "dismissed":
    case "refusé": // French
    case "rejeté": // French
    case "inactif": // French
    case "licencié": // French
      return { color: "#C62828", backgroundColor: "#FFEBEE" }; // Red 800 / Red 50

    // Default
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

const convertToISO = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString();
};

const formatDateForInput = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const socket = io(SOCKET_URL);

const statusMap: Record<string, string> = {
  All: "Tout",
  Pending: "En attente",
  Ongoing: "En cours",
  Completed: "Terminé",
  Open: "Ouverture",
  Resolved: "Résolue",
  Dismissed: "Dissuade",
  Active: "Actif",
  Inactive: "Inactif",
  all: "Tout",
  pending: "En attente",
  ongoing: "En cours",
  completed: "Terminé",
  open: "Ouverture",
  resolved: "Résolue",
  dismissed: "Dissuade",
  active: "Actif",
  inactive: "Inactif",
};

const translateStatusLabel = (label: string) => {
  const frenchStatus = statusMap[label];
  return frenchStatus;
};

const monthMap: Record<string, string> = {
  January: "Janvier",
  February: "Février",
  March: "Mars",
  April: "Avril",
  May: "Mai",
  June: "Juin",
  July: "Juillet",
  August: "Août",
  September: "Septembre",
  October: "Octobre",
  November: "Novembre",
  December: "Décembre",
};

const translateMonthLabel = (label: string) => {
  const [month, year] = label.split(" ");
  const frenchMonth = monthMap[month] || month;
  return `${frenchMonth} ${year}`;
};

const dateMap: Record<string, string> = {
  Today: "Aujourd'hui",
  "This Week": "Cette semaine",
  "This Month": "Ce mois-ci",
  "All Time": "Tout le temps",
};

const translateDateLabel = (label: string) => {
  return dateMap[label] || label;
};

const progressStepperMap: Record<string, string> = {
  "Profile Setup": "Configuration du profil",
  Identity: "Identité",
  Profession: "Profession",
  "Review & Submit": "Vérifier et soumettre",
};

const translateProgressStepperLabel = (label: string) => {
  return progressStepperMap[label] || label;
};

const pageNameMap: Record<string, string> = {
  Dashboard: "Tableau de bord",
  "Find-educator": "Trouver un enseignant",
  Branches: "Branches",
  Chats: "Discussions",
  "Assign Educator": "Assign Educator",
  "Educator Details": "Détails de l'enseignant",
  Educators: "Enseignants",
  "Find Educator": "Trouver un enseignant",
  "Organization Details": "Détails de l'organisation",
  Organizations: "Organisations",
  Reports: "Rapports",
  "Report Details": "Détails du rapport",
  Settings: "Paramètres",
  Training: "Formation",
  "Create Profile": "Créer un profil",
  "Update Profile": "Mettre à jour le profil",
  "Update Educator": "Mettre à jour l'enseignant",
  "Update Organization": "Mettre à jour l'organisation",
};

const translatePageName = (label: string) => {
  return pageNameMap[label] || label;
};

export {
  baseURL,
  requestAPI,
  getStatusColor,
  formatTime,
  formatDate,
  getElapsedTime,
  handleDownload,
  truncateWithEllipsis,
  convertToISO,
  formatDateForInput,
  translateStatusLabel,
  translateMonthLabel,
  translateDateLabel,
  translateProgressStepperLabel,
  translatePageName,
  socket,
};
