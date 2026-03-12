// Skeleton loader component displayed while movies are being fetched from the API.
// It renders placeholder movie cards with a pulse animation to mimic loading content.
export default function SkeletonMovieGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {/* Generate 10 skeleton movie cards with placeholer for movie poster and movie title */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-2/3 bg-neutral-800 rounded-md" />

          <div className="mt-3 h-4 bg-neutral-800 rounded w-3/4" />
        </div>
      ))}
    </div>
  );
}
