// Centralized API configuration using Vite env vars

const baseUrl = import.meta.env.VITE_API_BASE_URL?.toString().replace(/\/$/, "") || "";
const basePath = import.meta.env.VITE_API_BASE_PATH?.toString() || "/api";

export const API_BASE_URL = baseUrl;
export const API_BASE_PATH = basePath;
export const API_ORIGIN_AND_PATH = `${API_BASE_URL}${API_BASE_PATH}`;

export function buildApiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_ORIGIN_AND_PATH}${normalizedPath}`;
}

export function buildAbsoluteUrl(path: string): string {
  // For cases when caller already includes /api in the path
  if (path.startsWith("/api")) {
    return `${API_BASE_URL}${path}`;
  }
  return buildApiUrl(path);
}



