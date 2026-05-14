const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

/**
 * Custom fetch wrapper for API requests.
 */
export async function api(path: string, options?: RequestInit): Promise<Response> {
  const headers = new Headers(options?.headers);

  if (options?.body && !(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(`${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`, {
    credentials: "include",
    ...options,
    headers,
  });
}
