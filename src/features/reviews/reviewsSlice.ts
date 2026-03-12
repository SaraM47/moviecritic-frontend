// Redux Toolkit utilities
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createReview,
  deleteReview,
  getReviewsByMovie,
  getMyReviews,
  updateReview,
} from "../../api/reviewsApi";
import type { ReviewsState } from "./types";

// Initial reviews state. actionLoading is used for create/update/delete actions.
const initialState: ReviewsState = {
  reviews: [],
  loading: false,
  error: null,
  actionLoading: false,
};

/*
Fetch reviews for a specific movie
*/
export const fetchReviewsThunk = createAsyncThunk(
  "reviews/fetchByMovie",
  async (movieId: number, thunkAPI) => {
    try {
      return await getReviewsByMovie(movieId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch reviews"
      );
    }
  }
);

/*
Fetch reviews written by the logged-in user
*/
export const fetchMyReviewsThunk = createAsyncThunk(
  "reviews/fetchMine",
  async (_, thunkAPI) => {
    try {
      return await getMyReviews();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch my reviews"
      );
    }
  }
);

// Create a new review
export const createReviewThunk = createAsyncThunk(
  "reviews/create",
  async (
    data: { movieId: number; title: string; rating: number; text: string },
    thunkAPI
  ) => {
    try {
      return await createReview(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to create review"
      );
    }
  }
);

// Update a existing review
export const updateReviewThunk = createAsyncThunk(
  "reviews/update",
  async (
    data: { id: string; title?: string; rating?: number; text?: string },
    thunkAPI
  ) => {
    try {
      return await updateReview(data.id, {
        title: data.title,
        rating: data.rating,
        text: data.text,
      });
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to update review"
      );
    }
  }
);

// Delete a review by ID
export const deleteReviewThunk = createAsyncThunk(
  "reviews/delete",
  async (id: string, thunkAPI) => {
    try {
      await deleteReview(id);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to delete review"
      );
    }
  }
);

// Reviews slice managing review list and CRUD actions.
const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch reviews for movie
      .addCase(fetchReviewsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch user reviews
      .addCase(fetchMyReviewsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyReviewsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchMyReviewsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create review
      .addCase(createReviewThunk.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(createReviewThunk.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.reviews.unshift(action.payload);
      })
      .addCase(createReviewThunk.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      })

      // Update review
      .addCase(updateReviewThunk.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(updateReviewThunk.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.reviews = state.reviews.map((review) =>
          review._id === action.payload._id ? action.payload : review
        );
      })
      .addCase(updateReviewThunk.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      })

      // Delete review
      .addCase(deleteReviewThunk.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(deleteReviewThunk.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.reviews = state.reviews.filter(
          (review) => review._id !== action.payload
        );
      })
      .addCase(deleteReviewThunk.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default reviewsSlice.reducer;