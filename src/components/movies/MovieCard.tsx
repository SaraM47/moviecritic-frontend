import { Link } from "react-router-dom";
import filmFrame from "../../assets/film-frame.png";

// Props for MovieCard component that includes movie ID, title, and poster path
interface Props {
  id: number;
  title: string;
  poster: string | null;
}

// MovieCard component that displays a movie poster with a cinematic frame and title
export default function MovieCard({ id, title, poster }: Props) {
  const posterUrl = poster ? `https://image.tmdb.org/t/p/w500${poster}` : null;

  // The component is wrapped in a Link that navigates to the movie details page when clicked
  return (
    <Link to={`/movie/${id}`} className="group block">
      {/* Card */}
      <div className="relative w-full aspect-2/3 flex items-center justify-center transition-all duration-300 group-hover:-translate-y-3">
        {/* Poster */}
        <div className="relative z-10 w-[62%] h-[72%] overflow-hidden">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-neutral-700" />
          )}

          {/* Cinematic gradient */}
          <div
            className="
            absolute inset-0
            bg-linear-to-t
            from-black/70
            via-black/20
            to-transparent
            opacity-0
            group-hover:opacity-100
            transition duration-300
          "
          />
        </div>

        {/* Film frame image */}
        <img
          src={filmFrame}
          alt=""
          className="
            absolute inset-0 z-20 w-full h-full object-fill pointer-events-none
            transition-all duration-300
            group-hover:drop-shadow-[0_0_10px_rgba(228,16,15,0.7)]
          "
        />
      </div>

      {/* Title of the movie */}
      <p className="mt-3 text-sm text-white font-medium transition-colors duration-200 group-hover:text-[#E4100F]">
        {title}
      </p>
    </Link>
  );
}
