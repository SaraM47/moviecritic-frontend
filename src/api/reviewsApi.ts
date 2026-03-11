import { apiFetch } from "./http";
import type { Review } from "../features/reviews/types";

/*
Fetch all reviews for a specific movie by its ID. The movieId is passed as a query parameter. The backend returns an array of review objects associated with the given movie ID.
 */
export async function getReviewsByMovie(movieId: number) {
  return apiFetch<Review[]>(`/api/reviews?movieId=${movieId}`);
}

// Create a new review for a movie. Requires movieId, title, rating, and text. 
export async function createReview(data: {
  movieId: number;
  title: string;
  rating: number;
  text: string;
}) {
  // The backend expects a POST request with the review data in the request body. If successful, it returns the created review object.
  return apiFetch<Review>("/api/reviews", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Fetch all reviews written by the currently logged-in user.
export async function getMyReviews() {
  return apiFetch<Review[]>("/api/reviews/me");
}

// Update an existing review. Only the fields included in the request will be updated.
export async function updateReview(
  id: string,
  data: {
    title?: string;
    rating?: number;
    text?: string;
  }
) {
  return apiFetch<Review>(`/api/reviews/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// Delete a review by its ID. 
// The backend will remove the review from the database and return a success message or an empty response.
export async function deleteReview(id: string) {
  return apiFetch<null>(`/api/reviews/${id}`, {
    method: "DELETE",
  });
}