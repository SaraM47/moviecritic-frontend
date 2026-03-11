// Base URL for API requests, set via environment variable
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/*
Generic helper function for making API requests.
This function will add JSON headers when a body is present, it will include it cookies for authentication, handles errors returned by the server and therefore response Parses JSON automatically
*/
export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  // Create headers object from options or empty object
  const headers = new Headers(options.headers || {});

  // If request has a body, set content type to JSON
  if (options.body) {
    headers.set("Content-Type", "application/json");
  }

  // Send request to backend with credentials included cookie for authentication
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers,
  });

  // Check if the response contains JSON
  const isJson = res.headers.get("content-type")?.includes("application/json");

  // If response is not ok, try to parse error message from JSON and throw an error
  if (!res.ok) {
    const data = isJson ? await res.json() : null;
    throw new Error(data?.message || `Request failed: ${res.status}`);
  }

  // If response is ok and contains JSON, parse and return it, otherwise return null
  return isJson ? res.json() : (null as T);
}