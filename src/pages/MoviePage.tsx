import { useEffect, useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getMovieByIdThunk } from "../features/movies/moviesSlice";
import {
  createReviewThunk,
  deleteReviewThunk,
  fetchReviewsThunk,
  updateReviewThunk,
} from "../features/reviews/reviewsSlice";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ReviewCard from "../components/reviews/ReviewCard";
import ReviewForm from "../components/reviews/ReviewForm";
import Spinner from "../features/ui/Spinner";
import Modal from "../features/ui/Modal";
import { Star } from "lucide-react";
import Button from "../features/ui/Button";
import toast from "react-hot-toast";

// Movie detail page showing movie information and user reviews
export default function MoviePage() {
  // Get the movie ID from the URL parameters and search parameters for edit mode
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  // Get edit parameter from URL (used when editing review from profile page)
  const editFromUrl = searchParams.get("edit");

  // Movie state from Redux store
  const {
    selectedMovie,
    loading: movieLoading,
    error: movieError,
  } = useAppSelector((state) => state.movies);

  // Reviews state from Redux store
  const {
    reviews,
    loading: reviewsLoading,
    error: reviewsError,
    actionLoading,
  } = useAppSelector((state) => state.reviews);

  // Authenticated user
  const { user } = useAppSelector((state) => state.auth);

  // New review form state
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(8);
  const [text, setText] = useState("");

  // Editing review state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editRating, setEditRating] = useState(8);
  const [editText, setEditText] = useState("");

  // Modal state for viewing full review
  const [openReview, setOpenReview] = useState<any | null>(null);

  // Fetch movie details and reviews when page loads
  useEffect(() => {
    if (!id) return;

    dispatch(getMovieByIdThunk(id));
    dispatch(fetchReviewsThunk(Number(id)));
  }, [dispatch, id]);

  // Automatically open edit mode if URL contains ?edit=reviewId
  useEffect(() => {
    if (!editFromUrl) return;

    // Find the review that matches the ID from the URL
    const review = reviews.find((r) => r._id === editFromUrl);

    // If review with the given ID exists, populate edit form and enter edit mode
    if (review) {
      setEditingId(review._id);
      setEditTitle(review.title);
      setEditRating(review.rating);
      setEditText(review.text);
    }
  }, [editFromUrl, reviews]);

  // Create a new review for the movie. Validates form fields and shows appropriate toast messages based on success or failure of the review creation action.
  const handleCreateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    if (!title.trim() || !text.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    // Dispatch the create review thunk and wait for the result to show appropriate toast message
    try {
      const resultAction = await dispatch(
        createReviewThunk({
          movieId: Number(id),
          title,
          rating,
          text,
        })
      );

      // If review creation succeeds, show success message and clear form fields otherwise show error message
      if (createReviewThunk.fulfilled.match(resultAction)) {
        toast.success("Review submitted");
        setTitle("");
        setText("");
        setRating(8);
      } else {
        toast.error("Failed to submit review");
      }
    } catch {
      toast.error("Failed to submit review");
    }
  };

  // Start editing a review by populating the edit form with the review's current data and setting the editing ID
  const handleStartEdit = (review: any) => {
    setEditingId(review._id);
    setEditTitle(review.title);
    setEditRating(review.rating);
    setEditText(review.text);
  };

  // Update an existing review after validating the form fields. Shows appropriate toast messages based on success or failure of the review update action.
  const handleUpdateReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingId) return;

    if (!editTitle.trim() || !editText.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    // Dispatch the update review thunk and wait for the result to show appropriate toast message
    try {
      const resultAction = await dispatch(
        updateReviewThunk({
          id: editingId,
          title: editTitle,
          rating: editRating,
          text: editText,
        })
      );

      if (updateReviewThunk.fulfilled.match(resultAction)) {
        toast.success("Review updated");
        setEditingId(null);
        setEditTitle("");
        setEditText("");
      } else {
        toast.error("Failed to update review");
      }
    } catch {
      toast.error("Failed to update review");
    }
  };

  // Delete review
  const handleDeleteReview = async (reviewId: string) => {
    try {
      const resultAction = await dispatch(deleteReviewThunk(reviewId));

      if (deleteReviewThunk.fulfilled.match(resultAction)) {
        toast.success("Review deleted");
      } else {
        toast.error("Failed to delete review");
      }
    } catch {
      toast.error("Failed to delete review");
    }
  };

  // Poster and backdrop URLs
  const posterUrl = selectedMovie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
    : null;

  const backdropUrl = selectedMovie?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`
    : null;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section
        className="relative min-h-180 pt-40 pb-20"
        style={
          backdropUrl
            ? {
                backgroundImage: `url(${backdropUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-black/30" />

        <div className="relative page-container">
          {movieLoading && (
            <div className="flex min-h-100 items-center justify-center">
              <Spinner size={60} text="Loading movie..." />
            </div>
          )}

          {movieError && (
            <p className="text-center text-red-400">{movieError}</p>
          )}

          {selectedMovie && (
            <div className="grid items-center gap-10 lg:grid-cols-[320px_1fr]">
              <div className="mx-auto w-full max-w-[320px]">
                {posterUrl ? (
                  <img
                    src={posterUrl}
                    alt={selectedMovie.title}
                    className="w-full rounded-xl object-cover shadow-2xl"
                  />
                ) : (
                  <div className="flex h-120 items-center justify-center rounded-xl bg-neutral-800 text-slate-400">
                    No image
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <h1 className="text-[#E4100F]">{selectedMovie.title}</h1>

                <p className="max-w-3xl text-lg leading-relaxed text-slate-200">
                  {selectedMovie.overview ||
                    "No description available for this movie."}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Reviews */}
      <main className="page-container space-y-10 py-16">
        <section className="space-y-6">
          <h2 className="text-[#E4100F]">Reviews</h2>

          {reviewsLoading && (
            <div className="flex justify-center py-8">
              <Spinner size={40} text="Loading reviews..." />
            </div>
          )}

          {reviewsError && <p className="text-red-400">{reviewsError}</p>}

          {/* Review carousels */}
          <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory">
            {reviews.map((review) => (
              <ReviewCard
                key={review._id}
                review={review}
                user={user}
                editingId={editingId}
                editTitle={editTitle}
                editRating={editRating}
                editText={editText}
                setEditTitle={setEditTitle}
                setEditRating={setEditRating}
                setEditText={setEditText}
                actionLoading={actionLoading}
                onStartEdit={handleStartEdit}
                onUpdate={handleUpdateReview}
                onDelete={handleDeleteReview}
                onOpen={setOpenReview}
              />
            ))}
          </div>

          {user && (
            <ReviewForm
              title={title}
              rating={rating}
              text={text}
              setTitle={setTitle}
              setRating={setRating}
              setText={setText}
              loading={actionLoading}
              onSubmit={handleCreateReview}
            />
          )}

          {!user && (
            <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border border-white/10 bg-neutral-900 p-6 text-slate-300">
              You need to be logged in to write a review.
              <Link to={`/login?redirect=/movie/${id}`}>
                <Button>Login</Button>
              </Link>
            </div>
          )}
        </section>
      </main>

      <Modal isOpen={!!openReview} onClose={() => setOpenReview(null)}>
        {openReview && (
          <div className="space-y-5 mt-6 md:mt-10">
            <div className="flex items-center justify-between gap-4">
              <p className="font-semibold text-white text-sm md:text-base">
                {openReview.userId?.username}
              </p>

              <span className="flex items-center gap-1 text-yellow-400 text-sm md:text-base">
                <Star size={18} fill="currentColor" strokeWidth={0} />
                {openReview.rating}/10
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold leading-tight">
              {openReview.title}
            </h3>

            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              {openReview.text}
            </p>

            <p className="text-xs md:text-sm text-slate-500">
              {new Date(openReview.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </Modal>

      <Footer />
    </div>
  );
}
