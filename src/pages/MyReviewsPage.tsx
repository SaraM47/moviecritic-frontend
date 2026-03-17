import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  deleteReviewThunk,
  fetchMyReviewsThunk,
} from "../features/reviews/reviewsSlice";
import { getMoviePoster } from "../api/tmdbApi";
import Button from "../features/ui/Button";

// Page showing all reviews written by the logged-in user
export default function MyReviewsPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Get reviews state from Redux store
  const { reviews, loading } = useAppSelector((state) => state.reviews);

  // Local state storing poster URLs mapped by movieId
  const [posters, setPosters] = useState<Record<number, string>>({});

  // Fetch reviews written by the logged-in user when page loads
  useEffect(() => {
    dispatch(fetchMyReviewsThunk());
  }, [dispatch]);

  // Load posters for movies that appear in the reviews list
  useEffect(() => {
    async function loadPosters() {
      const map: Record<number, string> = {};

      for (const review of reviews) {
        // Avoid fetching the same poster multiple times
        if (!map[review.movieId]) {
          const poster = await getMoviePoster(review.movieId);
          if (poster) map[review.movieId] = poster;
        }
      }

      setPosters(map);
    }

    if (reviews.length) loadPosters();
  }, [reviews]);

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />

      {/* Page content */}
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-16 mt-40">
        <h1 className="mb-16 text-center text-5xl font-bold">My reviews</h1>

        {/* Loading state */}
        {loading ? (
          <div className="text-center text-slate-400">
            Loading your reviews...
          </div>
        ) : /* Empty state if user has not written reviews */
        reviews.length === 0 ? (
          <div className="text-center text-slate-400">
            You have not written any reviews yet.
          </div>
        ) : (
          /* Render review list */
          <div className="space-y-10">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="grid items-start gap-6 border-b border-neutral-800 pb-8 md:grid-cols-[110px_1fr_160px]"
              >
                {/* Movie poster */}
                <div className="h-37.5 w-27.5 overflow-hidden rounded-md bg-neutral-700">
                  {posters[review.movieId] ? (
                    <img
                      src={posters[review.movieId]}
                      alt="Poster"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-neutral-700" />
                  )}
                </div>

                {/* Review content */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold">{review.title}</h3>

                  {/* Short preview of review text */}
                  <p className="text-sm text-slate-300">
                    {review.text.length > 100
                      ? `${review.text.slice(0, 100)}...`
                      : review.text}
                  </p>

                  {/* Navigate to movie page */}
                  <Button
                    onClick={() => navigate(`/movie/${review.movieId}`)}
                    variant="ghost"
                    className="text-sm underline text-slate-400 hover:text-white"
                  >
                    Read more
                  </Button>
                </div>

                {/* Rating, date and actions */}
                <div className="flex flex-col items-end gap-4 text-sm text-slate-300">
                  <div className="text-right">
                    <p>Rating {review.rating}/10</p>
                    <p>{new Date(review.createdAt).toLocaleDateString()}</p>
                  </div>

                  {/* Edit and delete actions */}
                  <div className="flex gap-3">
                    <Button
                      onClick={() =>
                        navigate(`/movie/${review.movieId}?edit=${review._id}`)
                      }
                      variant="secondary"
                      className="rounded-full bg-neutral-200 px-5 py-2 text-black"
                    >
                      Edit
                    </Button>

                    <Button
                      onClick={() => dispatch(deleteReviewThunk(review._id))}
                      variant="danger"
                      className="rounded-full bg-neutral-200 px-5 py-2 text-black"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
