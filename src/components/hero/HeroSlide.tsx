import { Link } from "react-router-dom";

// Props for HeroSlide component that receives a movie object that contains information such as title, overview, poster and backdrop image.
interface Props {
  movie: any;
}

// Function component that displays a hero slide for a movie, including backdrop, poster, title, overview, and links to view the movie and reviews
export default function HeroSlide({ movie }: Props) {

  // Build the backdrop image URL from TMDB
  const backdrop =
    `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
 
  // Build the poster image URL from TMDB
  const poster =
    `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <section
      className="relative min-h-175 flex items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backdrop})` }}
    >

      <div className="absolute inset-0 bg-black/70"></div>

      <div className="absolute inset-0 bg-linear-to-r from-black via-black/60 to-transparent"></div>

      <div className="relative page-container grid lg:grid-cols-2 gap-10 items-center">

        {/* Movie information */}
        <div className="max-w-xl text-white">

          <h1 className="text-[#E4100F] mb-6">
            {movie.title}
          </h1>

          <p className="text-slate-200 text-lg line-clamp-3">
            {movie.overview || "No description available."}
          </p>

          {/* Navigation buttons */}
          <div className="mt-8 flex gap-4">
            <Link to={`/movie/${movie.id}`} className="btn-primary">
              View Movie
            </Link>

            <Link to={`/movie/${movie.id}`} className="btn-secondary">
              Reviews
            </Link>
          </div>
        </div>

        {/* Poster image (visible on large screens only) */}
        <div className="hidden lg:flex justify-center">
          <img
            src={poster}
            alt={movie.title}
            className="w-[320px] shadow-2xl transition duration-700 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}