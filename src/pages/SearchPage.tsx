import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import MovieGrid from "../components/movies/MovieGrid";
import SearchSuggestions from "../components/search/SearchSuggestions";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { searchMoviesThunk } from "../features/movies/moviesSlice";
import useDebounce from "../hooks/useDebounce";
import SkeletonMovieGrid from "../features/ui/SkeletonMovieGrid";
import Input from "../features/ui/Input";
import Button from "../features/ui/Button";

// Search page component used to search for movies
export default function SearchPage() {
  const dispatch = useAppDispatch();

  // Get search state from Redux store
  const { searchResults, loading, error } = useAppSelector(
    (state) => state.movies
  );

  // Local state for input field and suggestion visibility
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Debounced query to reduce unnecessary API calls
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    // Start search automatically when user has typed more than 2 characters
    if (debouncedQuery.trim().length > 2) {
      dispatch(searchMoviesThunk(debouncedQuery));
      setShowSuggestions(true);
    }
  }, [debouncedQuery, dispatch]);

  // Handle manual search when button is clicked or Enter is pressed
  const handleSearch = () => {
    if (query.trim().length > 2) {
      dispatch(searchMoviesThunk(query));
    }

    setShowSuggestions(false); // Hide suggestions when search is triggered manually
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main>
        {/* Hero search section */}
        <section className="pt-36 pb-24 mb-12 mt-20">
          <div className="page-container flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold text-[#E4100F] md:text-5xl">
              Search for your favorite movie
            </h1>

            {/* Search input and suggestions */}
            <div className="relative mt-10 flex w-full max-w-2xl gap-3 z-30">
              <label htmlFor="movie-search" className="sr-only">
                Search for a movie
              </label>

              <Input
                id="movie-search"
                type="text"
                placeholder="Search for a movie..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />

              <Button onClick={handleSearch}>Search</Button>

              {/* Dropdown suggestions shown while typing */}
              {showSuggestions &&
                query.trim().length > 2 &&
                searchResults.length > 0 && (
                  <SearchSuggestions
                    movies={searchResults.slice(0, 5)}
                    closeSuggestions={() => setShowSuggestions(false)}
                  />
                )}
            </div>
          </div>
        </section>

        {/* Search results section */}
        <section className="page-container py-12">
          {loading && <SkeletonMovieGrid />}

          {/* Show API error if search fails */}
          {error && <p className="mb-6 text-center text-red-400">{error}</p>}

          {/* Display movie results */}
          {!loading && searchResults.length > 0 && (
            <MovieGrid movies={searchResults} />
          )}

          {/* Empty state when user has not typed anything */}
          {!loading && query.trim().length === 0 && (
            <div className="py-16 text-center text-slate-400">
              Start typing to search for movies.
            </div>
          )}

          {/* Message when query is too short */}
          {!loading && query.trim().length > 0 && query.trim().length <= 2 && (
            <div className="py-16 text-center text-slate-400">
              Type at least 3 characters to search.
            </div>
          )}

          {/* Message when no results are found */}
          {!loading &&
            query.trim().length > 2 &&
            searchResults.length === 0 &&
            !error && (
              <div className="py-16 text-center text-slate-400">
                No movies found for "{query}".
              </div>
            )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
