import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// API functions for movie data
import {
  getMovieById,
  searchMovies,
  getPopularMovies,
  getTopRatedMovies,
} from "../../api/moviesApi";
import type { MoviesState } from "./types";

// Initial state for movie-related data
const initialState: MoviesState = {
  popularMovies: [],
  topRatedMovies: [],
  searchResults: [],
  selectedMovie: null,
  loading: false,
  error: null,
};

/*
Fetch currently popular movies from the backend.
Used for HeroSlider and Trending Movies section.
*/
export const fetchPopularMoviesThunk = createAsyncThunk(
  "movies/popular",
  async (_, thunkAPI) => {
    try {
      const data = await getPopularMovies();
      return data.results;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch popular movies"
      );
    }
  }
);

/*
Fetch top rated movies from the backend.
Used for the Top Rated Movies section.
*/
export const fetchTopRatedMoviesThunk = createAsyncThunk(
  "movies/topRated",
  async (_, thunkAPI) => {
    try {
      const data = await getTopRatedMovies();
      return data.results;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch top rated movies"
      );
    }
  }
);

/*
Search movies by query string.
Used on the Movies page.
*/
export const searchMoviesThunk = createAsyncThunk(
  "movies/search",
  async (query: string, thunkAPI) => {
    try {
      const data = await searchMovies(query);
      return data.results;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to search movies"
      );
    }
  }
);

/*
Fetch detailed information for one specific movie.
Used on the Movie Detail page.
*/
export const getMovieByIdThunk = createAsyncThunk(
  "movies/getById",
  async (id: string, thunkAPI) => {
    try {
      return await getMovieById(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch movie");
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Popular movies
      .addCase(fetchPopularMoviesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMoviesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.popularMovies = action.payload;
      })
      .addCase(fetchPopularMoviesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Top rated movies
      .addCase(fetchTopRatedMoviesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopRatedMoviesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.topRatedMovies = action.payload;
      })
      .addCase(fetchTopRatedMoviesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Search movies
      .addCase(searchMoviesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMoviesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchMoviesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch movie details
      .addCase(getMovieByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMovieByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(getMovieByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
// Export slice actions and reducer for store configuration
export const { clearSelectedMovie, clearSearchResults } = moviesSlice.actions;
export default moviesSlice.reducer;
