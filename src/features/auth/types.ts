// Represents a user account returned from the backend after successful registration or login. Contains basic user information.
export interface User {
    id: string;
    username: string;
    email: string;
    createdAt?: string;
  }
  
  // Redux state for authentication. Stores the logged-in user and request status.
  export interface AuthState {
    user: User | null; // Currently authenticated user
    loading: boolean; // Indicates if an auth request is in progress
    error: string | null; // Authentication error message
    initialized: boolean; // Indicates if initial auth check has completed
  }