import MovieCard from "./MovieCard";

// Component that displays a grid of MovieCard components
export default function MovieGrid({ movies }: any) {
  // The grid layout adjusts based on screen size which is 2 columns on small screens, 4 on medium, and 5 on large screens
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {/* Render one MovieCard for each movie */}
      {movies.map((movie: any) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          poster={movie.poster_path}
        />
      ))}
    </div>
  );
}
