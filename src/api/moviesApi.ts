import { apiFetch } from "./http";
import type { Movie, MovieDetails } from "../features/movies/types";

// Interface for the response from TMDB's /movie/popular and /movie/top_rated endpoints
interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

/*
Fetch popular movies from the backend.
This endpoint proxies TMDB's /movie/popular endpoint.
*/
export async function getPopularMovies() {
  return apiFetch<MoviesResponse>(`/api/movies/popular`);
}

/*
Fetch top rated movies from the backend.
This endpoint proxies TMDB's /movie/top_rated endpoint.
*/
export async function getTopRatedMovies() {
  return apiFetch<MoviesResponse>(`/api/movies/top-rated`);
}

/*
Search movies by query string.
This endpoint proxies TMDB's /search/movie endpoint.
*/
export async function searchMovies(query: string) {
  return apiFetch<MoviesResponse>(
    `/api/movies/search?query=${encodeURIComponent(query)}`
  );
}

/*
Fetch detailed information about a specific movie.
*/
export async function getMovieById(id: string) {
  return apiFetch<MovieDetails>(`/api/movies/${id}`);
}