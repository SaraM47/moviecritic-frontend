import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchPopularMoviesThunk,
  fetchTopRatedMoviesThunk,
} from "../features/movies/moviesSlice";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import MovieGrid from "../components/movies/MovieGrid";
import HeroSlider from "../components/hero/HeroSlider";

// Homepage component displaying featured, trending and top rated movies
export default function HomePage() {
  const dispatch = useAppDispatch();

  // Get movie lists from Redux store
  const { popularMovies, topRatedMovies } = useAppSelector(
    (state) => state.movies
  );

  useEffect(() => {
    // Fetch popular movies only if they are not already loaded

    if (popularMovies.length === 0) {
      dispatch(fetchPopularMoviesThunk());
    }

    // Fetch top rated movies only if they are not already loaded
    if (topRatedMovies.length === 0) {
      dispatch(fetchTopRatedMoviesThunk());
    }
  }, [dispatch, popularMovies.length, topRatedMovies.length]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero section with featured movies */}
      <HeroSlider />

      <div className="space-y-28">
        <section className="page-container mt-16">
          <h2 className="text-[#E4100F] text-md mb-10">Trending Movies</h2>
          <MovieGrid movies={popularMovies.slice(0, 10)} />
        </section>

        {/* Top rated movies section */}
        <section className="page-container mt-28">
          <h2 className="text-[#E4100F] mb-10 mt-24">Top Rated Movies</h2>
          <MovieGrid movies={topRatedMovies.slice(0, 10)} />
        </section>
      </div>

      <Footer />
    </div>
  );
}