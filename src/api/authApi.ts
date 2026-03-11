import { apiFetch } from "./http";
import type { User } from "../features/auth/types";

/*
* Register a new user.
Sends a POST request to the backend with username, email, and password. If successful, the backend returns the created user object.
*/
export async function registerUser(data: {
  username: string;
  email: string;
  password: string;
}) {
  return apiFetch<User>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/*
* Log in an existing user.
Sends email and password to the backend. If authentication succeeds, the server creates a session cookie.
*/
export async function loginUser(data: {
  email: string;
  password: string;
}) {
  return apiFetch<{ message: string }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/*
* Log out the current user.
This endpoint clears the authentication session on the server.
*/
export async function logoutUser() {
  return apiFetch<{ message: string }>("/api/auth/logout", {
    method: "POST",
    body: JSON.stringify({}),
  });
}

/*
* Fetch the currently authenticated user.
Used when the application starts to check if a user session exists.
*/
export async function getMe() {
  return apiFetch<User>("/api/auth/me");
}