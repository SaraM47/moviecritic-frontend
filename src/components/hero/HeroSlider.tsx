import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

// React and Redux imports
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPopularMoviesThunk } from "../../features/movies/moviesSlice";
import HeroSlide from "./HeroSlide";
import Spinner from "../../features/ui/Spinner";

// HeroSlider component Displays a slideshow of popular movies using Swiper. Each slide renders a HeroSlide component.
export default function HeroSlider() {
  const dispatch = useAppDispatch(); // Redux dispatch hook

  // Access movies state from Redux store
  const { popularMovies, loading } = useAppSelector((state) => state.movies);

  // Fetch popular movies when the component loads, but only if they are not already in the store.
  useEffect(() => {
    if (popularMovies.length === 0) {
      dispatch(fetchPopularMoviesThunk());
    }
  }, [dispatch, popularMovies.length]);

  // Select popular movies to only include those with a backdrop image and take the first 5 for the hero slider.
  const heroMovies = popularMovies
    .filter((movie) => movie.backdrop_path)
    .slice(0, 5);

  // Show a loading spinner while movies are loading or if no movies are available yet.
  if (loading || heroMovies.length === 0) {
    return (
      <section className="relative min-h-175 flex items-center justify-center bg-[#000000]">
        <div className="page-container flex justify-center">
          <Spinner size={60} text="Loading movies..." />
        </div>
      </section>
    );
  }

  /* Render the slider with autoplay and fade transition. */
  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      effect="fade"
      autoplay={{ delay: 6000 }}
      loop={heroMovies.length > 1}
      slidesPerView={1}
    >
      {heroMovies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <HeroSlide movie={movie} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
