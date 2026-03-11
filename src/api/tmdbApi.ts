// This file contains functions to interact with the TMDB API. It includes a function to fetch the poster image URL from a movie ID and it applies to My Reviews Page.
// API key for the Movie Database (TMDB) API
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

/*
Fetch the poster image for a specific movie.
1. Calls the TMDB API using the movie ID
2. Extracts the poster path from the response
3. Returns a full image URL if a poster exists
*/
export async function getMoviePoster(movieId: number) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
  );

  if (!res.ok) return null; // If request fails, return null

  const data = await res.json();

  // Construct poster URL if poster exists
  return data.poster_path
    ? `https://image.tmdb.org/t/p/w200${data.poster_path}`
    : null;
}