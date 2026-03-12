// Basic movie information returned from TMDB movie lists and used for popular movies, top rated movies and search results.
export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path?: string | null;
    release_date: string;
    vote_average: number;
    genre_ids?: number[]; // Genre IDs used in movie lists
  }
  
  // Detailed movie information returned when fetching a specific movie which includes additional metadata such as runtime and genre names.
  export interface MovieDetails {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path?: string | null;
    release_date: string;
    vote_average: number;
    runtime?: number; // Movie duration in minutes
    genres?: { id: number; name: string }[]; // Full genre objects
  }
  
  // Redux state used to manage movie-related data.
  export interface MoviesState {
    popularMovies: Movie[]; // Movies used for hero slider and trending sections
    topRatedMovies: Movie[]; // Top rated movie list
    searchResults: Movie[]; // Movies returned from search
    selectedMovie: MovieDetails | null; // Currently viewed movie details
    loading: boolean; // Indicates if movie data is loading
    error: string | null;  // Error message if API request fails
  }