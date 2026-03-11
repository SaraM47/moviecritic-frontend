import { Link } from "react-router-dom";
import type { Movie } from "../../features/movies/types";

// Props definition for SearchSuggestions component
interface Props {
  movies: Movie[]; // List of movie results
  closeSuggestions: () => void; // Function to close suggestion dropdown
}

// Component that displays movie search suggestions under the search input
export default function SearchSuggestions({ movies, closeSuggestions }: Props) {
  // If there are no movies, render nothing
  if (movies.length === 0) return null;

  return (
    // Container for dropdown suggestions
    <div className="absolute top-full mt-2 w-full rounded-lg bg-neutral-900 shadow-xl border border-neutral-700 overflow-hidden">
      {/* Display maximum of 5 movie suggestions */}
      {movies.slice(0, 5).map((movie) => (
        <Link
          key={movie.id}
          to={`/movie/${movie.id}`} // Navigate to the movie detail page
          onClick={closeSuggestions} // Close suggestions when a movie is clicked
          className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-800 transition"
        >
          {/* Movie poster thumbnail */}
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
              className="w-10 h-14 object-cover rounded"
            />
          )}

          {/* Movie title */}
          <span className="text-sm text-white">{movie.title}</span>
        </Link>
      ))}
    </div>
  );
}
