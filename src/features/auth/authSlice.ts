import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMe, loginUser, logoutUser, registerUser } from "../../api/authApi";
import type { AuthState } from "./types";

// Initial state for authentication slice and used to know if the app has already checked login status
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  initialized: false,
};

// Fetch currently authenticated user. Used on app startup to check if a user session already exists.
export const fetchMe = createAsyncThunk("auth/fetchMe", async (_, thunkAPI) => {
  try {
    return await getMe();
  } catch (error) {
    return thunkAPI.rejectWithValue("Not authenticated");
  }
});

// Register a new user account. On success, the backend returns the created user object and logs them in.
export const registerThunk = createAsyncThunk(
  "auth/register",
  async (
    data: { username: string; email: string; password: string },
    thunkAPI
  ) => {
    try {
      return await registerUser(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Registration failed");
    }
  }
);

// Login user and then fetch user profile.
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, thunkAPI) => {
    try {
      await loginUser(data);
      return await getMe();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Login failed");
    }
  }
);

// Logout current user and clear session.
export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await logoutUser();
      return null;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Logout failed");
    }
  }
);

// Authentication slice managing user state and authentication flow.
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch logged-in user
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.initialized = true;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.initialized = true;
      })

      // Register user
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Login user
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Logout user
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.error = null;
        state.initialized = true;
      });
  },
});

// Export reducer for store configuration
export default authSlice.reducer;
