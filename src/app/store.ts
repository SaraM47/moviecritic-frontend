import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import moviesReducer from "../features/movies/moviesSlice";
import reviewsReducer from "../features/reviews/reviewsSlice";

// Configure the Redux store with the auth, movies, and reviews reducers
export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
    reviews: reviewsReducer,
  },
});

// RootState type represents the entire Redux state tree. Used for typing the useSelector hook in components.
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch type represents the dispatch function from the Redux store. Used for typing the useDispatch hook in components, especially when using async thunks.
export type AppDispatch = typeof store.dispatch;